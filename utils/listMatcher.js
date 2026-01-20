import idStore from './idStore.js';

// Helper to infer a conventional id field name from a list/getter name or storeKey
function inferFieldFromListName(listName, storeKey) {
  if (storeKey) return `${storeKey}_id`;
  if (!listName) return 'id';
  let s = listName.replace(/^get/, '');
  s = s.replace(/By.*$/, '');
  const snake = s.replace(/([A-Z])/g, '_$1').replace(/^_/, '').toLowerCase();
  if (!snake) return 'id';
  const parts = snake.split('_');
  const prefix = parts[0];
  const defaultPrefixes = ['user', 'person'];
  const envPrefixes = (process.env.LIST_MATCHER_PREFIXES || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  const commonPrefixes = new Set([...defaultPrefixes, ...envPrefixes]);
  if (parts.length > 1 && (prefix === storeKey || commonPrefixes.has(prefix))) {
    return `${parts.slice(1).join('_')}_id`;
  }
  return `${snake}_id`;
}

export function findMatchingId(list, name, idFields = ['value','id'], nameFields = ['text','name'], storeKey, env) {
  if (!Array.isArray(list)) return null;
  if (name == null) return null;
  const wanted = String(name).trim().toLowerCase();
  
  // Get current run ID for matching items created in this test run
  const runId = process.env.TEST_RUN_ID;
  const wantedWithRunId = runId ? `${wanted} [run:${runId}]` : null;

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;

    // find a label on the item
    let label = null;
    for (const nf of nameFields) {
      if (Object.prototype.hasOwnProperty.call(item, nf) && item[nf] != null) {
        label = item[nf];
        break;
      }
    }
    if (!label) continue;
    const labelLower = String(label).trim().toLowerCase();
    
    // Match exact name OR name with current run ID suffix
    const isExactMatch = labelLower === wanted;
    const isRunIdMatch = wantedWithRunId && labelLower === wantedWithRunId;
    if (!isExactMatch && !isRunIdMatch) continue;

    // find id from candidate id fields
    for (const idf of idFields) {
      if (Object.prototype.hasOwnProperty.call(item, idf) && item[idf] != null) {
        const parsed = Number(item[idf]);
        if (!Number.isNaN(parsed)) {
          if (storeKey && env) {
            try { idStore.setId(storeKey, env, parsed); } catch (e) { /* ignore */ }
          }
          return parsed;
        }
      }
    }
  }

  return null;
}
export async function findIdInApiList(api, token, listFnName, name, options = {}) {
  if (!api || typeof api[listFnName] !== 'function') {
    throw new Error(`List function ${listFnName} not found on api instance`);
  }
  if (name && typeof name === 'object') {
    // look for explicit id fields in the provided object
    for (const k of Object.keys(name)) {
      if (/(_id|Id)$/.test(k) && name[k] != null) {
        const parsed = Number(name[k]);
        if (!Number.isNaN(parsed)) return parsed;
      }
    }
  }

  const paramsArg = options.params || options.extraParams;
  const res = paramsArg ? await api[listFnName](token, paramsArg) : await api[listFnName](token);
  let json;
  try {
    json = await res.json();
  } catch (e) {
    // failed to parse
    return null;
  }

  // normalize paginated/list shapes
  if (!Array.isArray(json)) {
    if (json && Array.isArray(json.data)) json = json.data;
    else if (json && Array.isArray(json.items)) json = json.items;
    else if (json && Array.isArray(json.list)) json = json.list;
    else return null;
  }

  // Dynamically infer id/name candidate fields when not explicitly provided
  function inferIdFields(list, storeKey) {
    const out = [];
    const seen = new Set();
    const add = (k) => { if (k && !seen.has(k)) { out.push(k); seen.add(k); } };
    // Always prefer these first
    add('id');
    add('value');
    const tokens = String(storeKey || '')
      .split('_')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);
    const consider = (key) => {
      const lower = String(key).toLowerCase();
      if (lower === 'id' || lower.endsWith('_id')) return true;
      if (/Id$/.test(key)) return true; // camelCase Id
      if (tokens.some(t => lower.includes(`${t}_id`) || lower.includes(`${t}id`))) return true;
      return false;
    };
    const sample = list.slice(0, 50);
    for (const item of sample) {
      if (!item || typeof item !== 'object') continue;
      for (const k of Object.keys(item)) {
        if (!consider(k)) continue;
        const v = item[k];
        const n = Number(v);
        if (v != null && !Number.isNaN(n)) add(k);
      }
    }
    return out;
  }
  function inferNameFields(list, storeKey) {
    const out = [];
    const seen = new Set();
    const add = (k) => { if (k && !seen.has(k)) { out.push(k); seen.add(k); } };
    // Seed with common label keys
    ['text','name','title','label'].forEach(add);
    const tokens = String(storeKey || '')
      .split('_')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);
    const isExcluded = (lower) => (
      lower === 'id' || lower.endsWith('_id') ||
      lower === 'code' || lower.endsWith('_code') ||
      lower.includes('uuid')
    );
    const isNameLike = (key) => {
      const lower = String(key).toLowerCase();
      if (isExcluded(lower)) return false;
      if (lower === 'text' || lower === 'name' || lower === 'title' || lower === 'label') return true;
      if (lower.endsWith('_name') || /Name$/.test(key)) return true;
      if (tokens.length && tokens.some(t => lower.includes(t))) return true;
      return false;
    };
    const sample = list.slice(0, 50);
    for (const item of sample) {
      if (!item || typeof item !== 'object') continue;
      for (const k of Object.keys(item)) {
        if (!isNameLike(k)) continue;
        const v = item[k];
        if (v != null && typeof v === 'string') add(k);
      }
    }
    return out;
  }

  const idFields = options.idFields || inferIdFields(json, options.storeKey);
  const nameFields = options.nameFields || inferNameFields(json, options.storeKey);

  return findMatchingId(json, name, idFields, nameFields, options.storeKey, api.env);
}

export async function extractFirstIdFromResponse(response, idCandidates = ['id','value']) {
  if (!response) return null;
  const body = await (typeof response.json === 'function' ? response.json() : Promise.resolve(response));
  const extract = (b) => {
    if (!b) return null;
    if (Array.isArray(b) && b.length) {
      const it = b[0];
      for (const c of idCandidates) if (it && Object.prototype.hasOwnProperty.call(it, c) && it[c] != null) return it[c];
      return null;
    }
    const arr = Array.isArray(b.data) ? b.data : (Array.isArray(b.results) ? b.results : (Array.isArray(b.items) ? b.items : null));
    if (Array.isArray(arr) && arr.length) {
      const it = arr[0];
      for (const c of idCandidates) if (it && Object.prototype.hasOwnProperty.call(it, c) && it[c] != null) return it[c];
      return null;
    }
    for (const c of idCandidates) if (Object.prototype.hasOwnProperty.call(b, c) && b[c] != null) return b[c];
    return null;
  };
  return extract(body);
}

export async function prepareUpdatePayloadsUsingList(prodApi, devApi, prodToken, devToken, baseUpdatePayload, getParams, listGetterName, options = {}) {
  // options: { idFieldName, idCandidates, storeKey }
  const storeKey = options && options.storeKey;
  const inferredIdField = options && options.idFieldName ? options.idFieldName : inferFieldFromListName(listGetterName, storeKey);
  const fetchOpts = { ...options, idCandidates: options.idCandidates || (storeKey ? [`${storeKey}_id`, 'id', 'value'] : ['id', 'value']) };
  const { prodId, devId, prodIdKey, devIdKey } = await fetchIdsFromList(prodApi, devApi, prodToken, devToken, getParams, listGetterName, fetchOpts);
  const prodPayload = { ...baseUpdatePayload, [inferredIdField]: prodId };
  const devPayload = { ...baseUpdatePayload, [inferredIdField]: devId };
  // also include the actual id key if different (helps delete/update functions that expect a specific key)
  if (prodIdKey && prodIdKey !== inferredIdField) prodPayload[prodIdKey] = prodId;
  if (devIdKey && devIdKey !== inferredIdField) devPayload[devIdKey] = devId;
  return { prodPayload, devPayload };
}

export async function prepareDeletePayloadsUsingList(prodApi, devApi, prodToken, devToken, getParams, listGetterName, options = {}) {
  // options: { idFieldName, employeeFieldName, idCandidates, storeKey }
  const storeKey = options && options.storeKey;
  const inferredIdField = options && options.idFieldName ? options.idFieldName : inferFieldFromListName(listGetterName, storeKey);
  // infer entity field name (was 'employeeField') from options or from getParams
  let inferredEntityField = options && options.entityFieldName ? options.entityFieldName : undefined;
  if (!inferredEntityField && getParams && typeof getParams === 'object') {
    // prefer fields in getParams that look like *_id, but allow callers to pass preferred prefixes via options.entityTokens
    const preferredTokens = (options && options.entityTokens) || [storeKey].filter(Boolean);
    const candidates = Object.keys(getParams).filter(k => /(_id|Id)$/i.test(k) && getParams[k] != null);
    // pick candidate that matches a preferred token first
    let picked = null;
    if (preferredTokens.length) {
      for (const t of preferredTokens) {
        if (!t) continue;
        const tl = String(t).toLowerCase();
        picked = candidates.find(k => String(k).toLowerCase().includes(tl));
        if (picked) break;
      }
    }
    if (!picked) picked = candidates[0];
    inferredEntityField = picked || undefined;
  }
  const fetchOpts = { ...options, idCandidates: options.idCandidates || (storeKey ? [`${storeKey}_id`, 'id', 'value'] : ['id', 'value']) };
  const { prodId, devId, prodEntityId, devEntityId, prodIdKey, devIdKey } = await fetchIdsFromList(prodApi, devApi, prodToken, devToken, getParams, listGetterName, fetchOpts);
  const prodPayload = inferredEntityField ? { [inferredIdField]: prodId, [inferredEntityField]: prodEntityId } : { [inferredIdField]: prodId };
  const devPayload = inferredEntityField ? { [inferredIdField]: devId, [inferredEntityField]: devEntityId } : { [inferredIdField]: devId };
  if (prodIdKey && prodIdKey !== inferredIdField) prodPayload[prodIdKey] = prodId;
  if (devIdKey && devIdKey !== inferredIdField) devPayload[devIdKey] = devId;
  return { prodPayload, devPayload };
}

// Generic helper: fetch ids (and optional employee values) from a list-returning method on both prod/dev APIs.
export async function fetchIdsFromList(prodApi, devApi, prodToken, devToken, getParams, listGetterName, options = {}) {
  // If listGetterName not provided, try to infer a sensible getter from the API instance and options/getParams
  if (!listGetterName) {
    const tokens = [];
    if (options && options.storeKey) tokens.push(options.storeKey);
    if (getParams && typeof getParams === 'object') {
      for (const k of Object.keys(getParams)) {
        const t = String(k).replace(/(_id|Id)$/i, '').replace(/^_/, '').toLowerCase();
        if (t) tokens.push(t);
      }
    }
    // collect method names from prodApi
    const methodNames = new Set([...Object.keys(prodApi || {})]);
    let proto = Object.getPrototypeOf(prodApi);
    while (proto && proto !== Object.prototype) {
      for (const n of Object.getOwnPropertyNames(proto)) methodNames.add(n);
      proto = Object.getPrototypeOf(proto);
    }
    const candidateGetters = Array.from(methodNames).filter(n => typeof prodApi[n] === 'function' && n.startsWith('get'));
    const preferredTokens = (options && Array.isArray(options.preferredTokens) && options.preferredTokens.length)
      ? options.preferredTokens
      : (tokens.length ? tokens : []);
    const scores = new Map();
    for (const n of candidateGetters) scores.set(n, 0);
    for (const n of candidateGetters) {
      const nl = n.toLowerCase();
      // boosts for preferred tokens
      for (const pt of preferredTokens) {
        if (!pt) continue;
        if (nl.includes(String(pt).toLowerCase())) scores.set(n, scores.get(n) + 10);
      }
      for (const tok of tokens) {
        const lt = String(tok).toLowerCase();
        if (!lt) continue;
        if (nl.includes(lt)) scores.set(n, scores.get(n) + 1);
      }
    }
    // pick highest score
    let found = null;
    let best = -1;
    for (const [n, sc] of scores.entries()) {
      if (sc > best) { best = sc; found = n; }
    }
    if (!found) found = candidateGetters[0] || null;
    listGetterName = found;
  }
  if (!listGetterName) throw new Error('fetchIdsFromList requires a list getter function name (could not infer)');
  const storeKey = options && options.storeKey;
  const idCandidates = options.idCandidates || (storeKey ? [`${storeKey}_id`, 'id', 'value'] : ['id', 'value']);
  const entityFieldName = (options && (options.entityFieldName || options.entityField));

  // no debug logging here - keep function behavior deterministic

  const rawProdResp = await prodApi[listGetterName](prodToken, getParams);
  const rawDevResp = await devApi[listGetterName](devToken, getParams);
  // parse bodies once so we can inspect/try multiple candidate sets without re-consuming streams
  const prodBody = await (typeof rawProdResp.json === 'function' ? rawProdResp.json() : Promise.resolve(rawProdResp));
  const devBody = await (typeof rawDevResp.json === 'function' ? rawDevResp.json() : Promise.resolve(rawDevResp));
  let prodId = await extractFirstIdFromResponse(prodBody, idCandidates);
  let devId = await extractFirstIdFromResponse(devBody, idCandidates);

  // If we didn't find an id with the provided candidates, try to infer any *_id or Id fields from the first item
  const inferCandidatesFromParsed = (body) => {
    try {
      const sample = Array.isArray(body) ? body[0] : (Array.isArray(body?.data) ? body.data[0] : (Array.isArray(body?.results) ? body.results[0] : (Array.isArray(body?.items) ? body.items[0] : body)));
      if (!sample || typeof sample !== 'object') return null;
      const picks = [];
      for (const k of Object.keys(sample)) {
        if (/(_id|Id)$/.test(k) && sample[k] != null) picks.push(k);
      }
      // always include conventional fallbacks
      if (!picks.includes('id')) picks.push('id');
      if (!picks.includes('value')) picks.push('value');
      return picks;
    } catch (e) {
      return null;
    }
  };

  if (prodId == null) {
    const fallback = inferCandidatesFromParsed(prodBody);
    if (fallback && fallback.length) prodId = await extractFirstIdFromResponse(prodBody, fallback);
  }
  if (devId == null) {
    const fallback = inferCandidatesFromParsed(devBody);
    if (fallback && fallback.length) devId = await extractFirstIdFromResponse(devBody, fallback);
  }

  // determine which key actually contained the id value in the sampled response
  const findKeyForValue = (body, value) => {
    try {
      const sample = Array.isArray(body) ? body[0] : (Array.isArray(body?.data) ? body.data[0] : (Array.isArray(body?.results) ? body.results[0] : (Array.isArray(body?.items) ? body.items[0] : body)));
      if (!sample || typeof sample !== 'object') return null;
      for (const k of Object.keys(sample)) {
        if (sample[k] != null && sample[k] == value) return k;
      }
    } catch (e) { /* ignore */ }
    return null;
  };
  const prodIdKey = prodId != null ? findKeyForValue(prodBody, prodId) : null;
  const devIdKey = devId != null ? findKeyForValue(devBody, devId) : null;

  const resolveEntityVal = (params) => {
    if (!params || typeof params !== 'object') return undefined;
    if (entityFieldName && Object.prototype.hasOwnProperty.call(params, entityFieldName)) return params[entityFieldName];
    for (const k of Object.keys(params)) {
      if (/(_id|Id)$/.test(k) && params[k] != null) return params[k];
    }
    return undefined;
  };

  const prodEntityId = resolveEntityVal(getParams);
  const devEntityId = resolveEntityVal(getParams);

  return { prodId, devId, prodResp: rawProdResp, devResp: rawDevResp, prodEntityId, devEntityId, prodIdKey, devIdKey };
}