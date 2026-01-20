import payloadResolver from './payloadResolver.js';
import idStore from './idStore.js';
import { getApisResponseAndCompare } from './ApiComparator.js';

// Utility: Convert underscore_case to PascalCase (e.g., grade_division -> GradeDivision)
function toPascalCase(str) {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate possible finder function names dynamically by scanning the API instance
function generateFunctionNames(apiInstance, key, suffix = 'IdByName') {
  const base = toPascalCase(key);
  const methodNames = new Set([
    ...Object.keys(apiInstance || {}),
  ]);
  let proto = Object.getPrototypeOf(apiInstance);
  while (proto && proto !== Object.prototype) {
    for (const n of Object.getOwnPropertyNames(proto)) methodNames.add(n);
    proto = Object.getPrototypeOf(proto);
  }
  const candidates = [];
  const re = new RegExp(`^find.*${base}.*${suffix}$`);
  for (const name of methodNames) {
    if (typeof apiInstance[name] !== 'function') continue;
    if (re.test(name)) candidates.push(name);
  }
  // Fallback to a few conventional patterns if none discovered
  if (candidates.length === 0) {
    // Derive prefixes dynamically from existing finder methods on the API instance
    const dynamicPrefixes = new Set();
    for (const name of methodNames) {
      if (typeof apiInstance[name] !== 'function') continue;
      if (!name.startsWith('find') || !name.endsWith(suffix)) continue;
      const core = name.slice('find'.length, -suffix.length); // between 'find' and suffix
      if (!core) continue;
      const tokens = core.match(/[A-Z][a-z0-9]*/g) || [];
      // Collect cumulative prefixes excluding the full core (to avoid duplicating other entity names)
      for (let i = 1; i <= Math.max(1, tokens.length - 1); i++) {
        const pref = tokens.slice(0, i).join('');
        if (pref) dynamicPrefixes.add(pref);
      }
    }
    // Always include no-prefix as last resort
    const conventional = new Set([`find${base}${suffix}`]);
    for (const p of dynamicPrefixes) conventional.add(`find${p}${base}${suffix}`);
    return Array.from(conventional);
  }
  return Array.from(new Set(candidates));
}
function generateListFunctionNames(apiInstance, key) {
  const base = toPascalCase(key);
  const plural = base.endsWith('s') ? base : `${base}s`;
  const wanted = new Set([base, plural]);

  // Collect candidate method names from instance and its prototype chain
  const methodNames = new Set([
    ...Object.keys(apiInstance || {}),
  ]);
  let proto = Object.getPrototypeOf(apiInstance);
  while (proto && proto !== Object.prototype) {
    for (const n of Object.getOwnPropertyNames(proto)) methodNames.add(n);
    proto = Object.getPrototypeOf(proto);
  }

  // Filter to functions that look like list getters and contain the base or plural key
  const candidates = [];
  for (const name of methodNames) {
    if (!/^get[A-Z]/.test(name)) continue;
    if (typeof apiInstance[name] !== 'function') continue;
    for (const w of wanted) {
      if (name.includes(w)) { candidates.push(name); break; }
    }
  }

  // Deduplicate while preserving order
  return Array.from(new Set(candidates));
}

// Try to find an ID using multiple finder function patterns
async function tryFindId(apiInstance, token, key, candidate) {
  const finderNames = generateFunctionNames(apiInstance, key);

  for (const finderName of finderNames) {
    if (typeof apiInstance[finderName] === 'function') {
      const found = await apiInstance[finderName](token, candidate);
      if (found) return { id: found, method: finderName };
    }
  }

  // Fallback to list matcher
  if (typeof apiInstance.findIdFromList === 'function') {
    const listFnNames = generateListFunctionNames(apiInstance, key);
    for (const listFnName of listFnNames) {
      if (typeof apiInstance[listFnName] === 'function') {
        const found = await apiInstance.findIdFromList(token, listFnName, candidate, { storeKey: key });
        if (found) return { id: found, method: `list:${listFnName}` };
      }
    }
  }

  return null;
}

export async function cacheCreatedEntityId(ctx, registryEntry) {
  try {
    const { prodApi, devApi, prodToken, devToken, prodPayload, devPayload } = ctx;
    const targetEnv = process.env.API_TARGET_ENV || 'PIHR_PROD';
    const compareResult = ctx && ctx.compareResult ? ctx.compareResult : null;
    if (registryEntry && typeof registryEntry.resolveId === 'function') {
      try {
        if (compareResult) {
          const candidates = [];
          if (compareResult.prodJson) candidates.push(compareResult.prodJson);
          if (compareResult.devJson) candidates.push(compareResult.devJson);
          candidates.push(compareResult);
          for (const obj of candidates) {
            if (!obj || typeof obj !== 'object') continue;
            // First pass: top-level id-like keys
            for (const k of Object.keys(obj)) {
              if (/(_id|Id)$/.test(k) || k.toLowerCase() === 'id') {
                const parsed = Number(obj[k]);
                if (!Number.isNaN(parsed)) {
                  const envToSet = targetEnv === 'PIHR_PROD' ? 'PIHR_PROD' : 'PIHR_DEV';
                  registryEntry.setId(envToSet, parsed, null);
                  console.log(`cacheCreatedEntityId: cached id ${parsed} for ${envToSet} (from response key ${k})`);
                  return;
                }
              }
            }
            // Second pass: common nested shapes like { data: { id } } or { result: { id } }
            const nestedCandidates = ['data', 'result', 'created', 'payload', 'item'];
            for (const nc of nestedCandidates) {
              if (Object.prototype.hasOwnProperty.call(obj, nc) && obj[nc] && typeof obj[nc] === 'object') {
                const sub = obj[nc];
                for (const k of Object.keys(sub)) {
                  if (/(_id|Id)$/.test(k) || k.toLowerCase() === 'id') {
                    const parsed = Number(sub[k]);
                    if (!Number.isNaN(parsed)) {
                      const envToSet = targetEnv === 'PIHR_PROD' ? 'PIHR_PROD' : 'PIHR_DEV';
                      registryEntry.setId(envToSet, parsed, null);
                      console.log(`cacheCreatedEntityId: cached id ${parsed} for ${envToSet} (from nested ${nc}.${k})`);
                      return;
                    }
                  }
                }
              }
            }
          }
        }
      } catch (e) {
      }
      if (targetEnv === 'PIHR_PROD') {
        try {
          const seeds = registryEntry.seedMapper(prodPayload);
          if (seeds) {
            const id = await registryEntry.resolveId(prodToken, seeds, prodApi);
            if (id) {
              const idKey = registryEntry.idKey ?? (typeof registryEntry.idKeyMapper === 'function' ? registryEntry.idKeyMapper(seeds) : null);
              registryEntry.setId('PIHR_PROD', id, idKey || null);
            }
          }
        } catch (e) { /* ignore per-env */ }
      } else if (targetEnv === 'PIHR_DEV') {
        try {
          const seeds = registryEntry.seedMapper(devPayload);
          if (seeds) {
            const id = await registryEntry.resolveId(devToken, seeds, devApi);
            if (id) {
              const idKey = registryEntry.idKey ?? (typeof registryEntry.idKeyMapper === 'function' ? registryEntry.idKeyMapper(seeds) : null);
              registryEntry.setId('PIHR_DEV', id, idKey || null);
            }
          }
        } catch (e) { /* ignore per-env */ }
      }
    }
  } catch (err) {
    console.warn('cacheCreatedEntityId: unexpected error', err && err.message ? err.message : err);
  }
}
export async function compareApisByEnvWithHandlers(request, ApiClass, functionName, method, prodToken, devToken, payload = null, handlers = {}) {
  const prodApi = new ApiClass(request, 'PIHR_PROD');
  const devApi = new ApiClass(request, 'PIHR_DEV');
  try {
    const firstProdUrl = prodApi && prodApi.apiMap ? Object.values(prodApi.apiMap)?.[0]?.url : undefined;
    const firstDevUrl = devApi && devApi.apiMap ? Object.values(devApi.apiMap)?.[0]?.url : undefined;
    const prodOrigin = firstProdUrl ? new URL(firstProdUrl).origin : '';
    const devOrigin = firstDevUrl ? new URL(firstDevUrl).origin : '';
    const signature = JSON.stringify({ prodOrigin, devOrigin });
    try { idStore.checkAndClearIfSignatureChanged(signature); } catch (e) { /* ignore */ }
  } catch (e) { /* ignore signature logic on environments without URL support */ }
  if (!payload && /ByID$|ById$/i.test(functionName)) {
    // Prefer to detect the underlying apiMap entry to determine which id is required (e.g., '{branch_id}').
    let storeKey = null;
    try {
      const apiKeys = Object.keys(prodApi.apiMap || {});
      for (const k of apiKeys) {
        if (functionName.toLowerCase().includes(k.toLowerCase())) {
          const url = prodApi.apiMap[k]?.url || '';
          const m = url.match(/\{([^}]+)\}/);
          if (m) {
            // normalize 'branch_id' -> 'branch'
            storeKey = String(m[1]).replace(/(_id|Id)$/i, '').toLowerCase();
            break;
          }
        }
      }
    } catch (e) { /* ignore */ }
    if (!storeKey) {
      const deriveEntityKey = (fn) => fn.replace(/^(get|find|delete|create|update)/i, '').replace(/By.*$/i, '')
        .replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
      storeKey = deriveEntityKey(functionName).replace(/_s$/, '');
    }

    const listFns = generateListFunctionNames(prodApi, storeKey);
    if (listFns && listFns.length > 0) {
      function extractIdFromItem(item, key) {
        if (!item || typeof item !== 'object') return null;
        const parts = String(key).split('_').filter(Boolean);
        const last = parts.length ? parts[parts.length - 1] : key;
        const candidates = [
          `${key}_id`, `${key}Id`,
          `${last}_id`, `${last}Id`,
          'id', 'value'
        ];
        for (const c of candidates) if (Object.prototype.hasOwnProperty.call(item, c)) return item[c];
        const lowered = Object.keys(item).reduce((acc, k) => { acc[k.toLowerCase()] = k; return acc; }, {});
        for (const c of candidates) {
          const lc = c.toLowerCase();
          if (lc in lowered) return item[lowered[lc]];
        }
        for (const k of Object.keys(item)) {
          if (k.toLowerCase().includes('id')) return item[k];
        }
        return null;
      }

      let prodPayloadId = undefined;
      let devPayloadId = undefined;
      for (const fn of listFns) {
        try {
          if (!prodPayloadId && typeof prodApi[fn] === 'function') {
            const resp = await prodApi[fn](prodToken);
            const json = await (typeof resp.json === 'function' ? resp.json() : Promise.resolve(resp));
            const first = Array.isArray(json) ? json[0] : (json && (json.data || json.results || json.items) ? (json.data?.[0] || json.results?.[0] || json.items?.[0]) : null);
            const id = extractIdFromItem(first, storeKey);
            if (id) prodPayloadId = id;
          }
        } catch (e) {}
        try {
          if (!devPayloadId && typeof devApi[fn] === 'function') {
            const resp = await devApi[fn](devToken);
            const json = await (typeof resp.json === 'function' ? resp.json() : Promise.resolve(resp));
            const first = Array.isArray(json) ? json[0] : (json && (json.data || json.results || json.items) ? (json.data?.[0] || json.results?.[0] || json.items?.[0]) : null);
            const id2 = extractIdFromItem(first, storeKey);
            if (id2) devPayloadId = id2;
          }
        } catch (e) {}
        if (prodPayloadId && devPayloadId) break;
      }
      if (prodPayloadId || devPayloadId) {
        payload = async () => ({ prodPayload: prodPayloadId, devPayload: devPayloadId });
      }
    }
  }
  // payload resolution (same semantics as before)
  let prodPayload = undefined;
  let devPayload = undefined;
  if (typeof payload === 'function') {
    const resolved = await payload(prodApi, devApi);
    prodPayload = resolved?.prodPayload;
    devPayload = resolved?.devPayload;
  } else {
    prodPayload = payload;
    devPayload = payload;
  }

  try {
    if (prodPayload && typeof prodPayload === 'object') prodPayload = payloadResolver.resolvePayloadTemplate(prodPayload, 'PIHR_PROD');
    if (devPayload && typeof devPayload === 'object') devPayload = payloadResolver.resolvePayloadTemplate(devPayload, 'PIHR_DEV');
  } catch (e) {
    console.warn('compareApisByEnvWithHandlers: payload resolution failed', e && e.message ? e.message : e);
  }
  // run-id suffixing for POST/PUT to avoid collisions, but do not modify code-like fields (caller should control)
  const runId = process.env.TEST_RUN_ID || String(Date.now());
  if (!process.env.TEST_RUN_ID) process.env.TEST_RUN_ID = runId;
  const appendRunId = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
      return obj.map(item => appendRunId(item)); // Recursively process array items
    }
    const out = { ...obj };
    const isNameLikeKey = (k) => {
      if (!k) return false;
      const lower = String(k).toLowerCase();
      // exclude obvious id/code keys
      if (lower.endsWith('_id') || lower === 'id' || lower.includes('uuid')) return false;
      if (lower.endsWith('_code') || lower === 'code') return false;
      // include common name-like keys
      return (
        lower === 'name' ||
        lower === 'title' ||
        lower === 'label' ||
        lower.endsWith('_name') ||
        /Name$/.test(k)
      );
    };
    for (const [k, v] of Object.entries(out)) {
      if (typeof v === 'string' && isNameLikeKey(k)) {
        if (!v.includes(`[run:${runId}]`)) out[k] = `${v} [run:${runId}]`;
      }
    }
    return out;
  };
  const methodUpper = (method || '').toUpperCase();
  if (methodUpper === 'POST' || methodUpper === 'PUT') {
    prodPayload = appendRunId(prodPayload);
    devPayload = appendRunId(devPayload);
  }

  const prodFn = (pl) => prodApi[functionName](prodToken, pl);
  const devFn = (pl) => devApi[functionName](devToken, pl);

  const targetEnv = process.env.API_TARGET_ENV || 'PIHR_PROD';
  async function preResolvePlaceholdersForEnv(apiInstance, token, payload, envName) {
    if (!payload) return;
    // collect placeholders of form {{key}}
    const placeholders = new Set();
    function scan(obj) {
      if (!obj) return;
      if (typeof obj === 'string') {
        const re = /{{\s*([^}]+)\s*}}/g;
        let m;
        while ((m = re.exec(obj))) placeholders.add(m[1].trim());
        return;
      }
      if (Array.isArray(obj)) return obj.forEach(scan);
      if (typeof obj === 'object') return Object.values(obj).forEach(scan);
    }
    scan(payload);

    for (const key of Array.from(placeholders)) {
      // if id already in store, skip
      if (idStore.getId(key, envName)) continue;
      // Normalize keys that refer to ids like 'designation_id' -> 'designation'
      const baseKey = String(key).replace(/(_id|Id)$/i, '');
      // try to derive a candidate human-readable name from the payload
      const candidateFields = [
        `${baseKey}_name`, `${baseKey}Name`, `${baseKey}_code`, `${baseKey}Code`, 'name', 'code', 'title'
      ];
      let candidate = null;
      if (typeof payload === 'object') {
        for (const f of candidateFields) {
          if (Object.prototype.hasOwnProperty.call(payload, f) && payload[f]) { candidate = payload[f]; break; }
        }
      }
      // If we couldn't derive a candidate name/code from the payload, or the
      // name-based lookup failed, try a conservative list-based fallback: call
      // common list endpoints for the entity and use the first item's id.
      let resolved = null;
      try {
        if (candidate) {
          const result = await tryFindId(apiInstance, token, baseKey, candidate);
          if (result) {
            idStore.setId(key, envName, result.id);
            console.log(`preResolvePlaceholders: resolved ${key}=${result.id} for env ${envName} using ${result.method}`);
            resolved = result.id;
          }
        }
      } catch (e) { /* ignore lookup errors */ }

      if (!resolved) {
        // no candidate or lookup failed: attempt list-based fallback
        try {
          const listFns = generateListFunctionNames(apiInstance, baseKey);
          for (const listFn of listFns) {
            if (typeof apiInstance[listFn] !== 'function') continue;
            try {
              const resp = await apiInstance[listFn](token);
              const json = await (typeof resp.json === 'function' ? resp.json() : Promise.resolve(resp));
              const first = Array.isArray(json) ? json[0] : (json && (json.data || json.results || json.items) ? (json.data?.[0] || json.results?.[0] || json.items?.[0]) : null);
              if (!first || typeof first !== 'object') continue;
              // Try common id field patterns
              const candidates = [
                `${baseKey}_id`, `${baseKey}Id`,
                `${baseKey.split('_').pop()}_id`, `${baseKey.split('_').pop()}Id`,
                'id', 'value'
              ];
              let found = null;
              for (const c of candidates) {
                if (Object.prototype.hasOwnProperty.call(first, c) && first[c] != null) {
                  const parsed = Number(first[c]);
                  if (!Number.isNaN(parsed)) { found = parsed; break; }
                }
              }
              if (found) {
                idStore.setId(key, envName, found);
                console.log(`preResolvePlaceholders: resolved ${key}=${found} for env ${envName} using list:${listFn}`);
                resolved = found;
                break;
              }
            } catch (e) { /* ignore per-list errors */ }
          }
        } catch (e) { /* ignore overall fallback errors */ }
      }
    }
  }

  // try pre-resolve for both envs so payload placeholders get substituted
  try {
    await preResolvePlaceholdersForEnv(prodApi, prodToken, prodPayload, 'PIHR_PROD');
    await preResolvePlaceholdersForEnv(devApi, devToken, devPayload, 'PIHR_DEV');
    // re-run template resolution so placeholders are replaced if ids were found
    if (prodPayload && typeof prodPayload === 'object') prodPayload = payloadResolver.resolvePayloadTemplate(prodPayload, 'PIHR_PROD');
    if (devPayload && typeof devPayload === 'object') devPayload = payloadResolver.resolvePayloadTemplate(devPayload, 'PIHR_DEV');
  } catch (e) {
    console.warn('preResolvePlaceholders: unexpected error', e && e.message ? e.message : e);
  }

  // Determine the payload to use AFTER resolution (so placeholders are substituted)
  const optionsPayload = targetEnv === 'PIHR_PROD' ? prodPayload : devPayload;

  // Execute comparison via existing comparator
  const compareResult = await getApisResponseAndCompare(prodFn, devFn, { method, payload: optionsPayload });

  // call any handler (e.g., cacheCreatedEntityId)
  if (handlers && typeof handlers[functionName] === 'function') {
    try {
      const ctx = { prodApi, devApi, prodToken, devToken, prodPayload, devPayload, functionName, method, compareResult };
      await handlers[functionName](ctx);
    } catch (e) {
      console.warn(`compareApisByEnvWithHandlers: handler for ${functionName} threw`, e && e.message ? e.message : e);
    }
  }

  return compareResult;
}
export async function resolveDeletePayload(request, ApiClass, functionName, prodToken, devToken, templates = {}) {

  let key = null;
    // Robustly derive entity key: strip leading 'delete' and any trailing 'By...' suffix.
    if (/^delete/.test(functionName)) {
      const entity = functionName.replace(/^delete/, '').replace(/By.*$/, '');
      if (entity) {
        key = entity.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
  // Normalize plural -> singular. Prefer removing 'es' (e.g., 'statuses' -> 'status')
  if (key.endsWith('es')) key = key.slice(0, -2);
  else if (key.endsWith('s')) key = key.slice(0, -1);
      }
    }
  if (!key) return null;
  const toPascalCase = (str) => str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  const storeKeyCandidates = [key];
  if (key.includes('_')) {
    const parts = key.split('_');
    if (parts.length >= 2) {
      storeKeyCandidates.push(parts.slice(1).join('_'));
    }
  }

  const prodApi = new ApiClass(request, 'PIHR_PROD');
  const devApi = new ApiClass(request, 'PIHR_DEV');
  let storeKey = key;
  let prodPayload = undefined;
  let devPayload = undefined;

  for (const candidate of storeKeyCandidates) {
    prodPayload = idStore.getId(candidate, 'PIHR_PROD') || undefined;
    devPayload = idStore.getId(candidate, 'PIHR_DEV') || undefined;
    if (prodPayload || devPayload) {
      storeKey = candidate;
      break;
    }
  }

  if (!prodPayload && !devPayload) {
    console.log(`resolveDeletePayload: no stored id for delete key '${storeKey}', attempting list lookup`);
    function collectCandidates(entityKey, templatesObj) {
      const out = [];
      if (!templatesObj || typeof templatesObj !== 'object') return out;
      for (const tplName of Object.keys(templatesObj)) {
        const tpl = templatesObj[tplName];
        if (!tpl || typeof tpl !== 'object') continue;
        const tryFields = [
          `${entityKey}_name`, `${entityKey}Name`,
          `${entityKey}_code`, `${entityKey}Code`,
          `${entityKey}_id`, `${entityKey}Id`,
          'name', 'code', 'id'
        ];
        for (const f of tryFields) {
          if (Object.prototype.hasOwnProperty.call(tpl, f) && tpl[f] != null) out.push(tpl[f]);
        }
      }
      // Also consider top-level properties on the templates object itself
      for (const f of ['name', 'code', 'id']) {
        if (Object.prototype.hasOwnProperty.call(templatesObj, f) && templatesObj[f] != null) out.push(templatesObj[f]);
      }
      // de-duplicate while preserving order
      return Array.from(new Set(out)).filter(Boolean);
    }

    let candidates = collectCandidates(storeKey, templates);
    if (process.env.TEST_RUN_ID) {
      const rid = process.env.TEST_RUN_ID;
      candidates = candidates.flatMap(c => ([`${c} [run:${rid}]`, c]));
    }

    for (const c of candidates) {
      try {
        if (!prodPayload) {
          const result = await tryFindId(prodApi, prodToken, storeKey, c);
          if (result) {
            prodPayload = result.id;
            idStore.setId(storeKey, 'PIHR_PROD', result.id);
          }
        }
      } catch (e) { }
      try {
        if (!devPayload) {
          const result = await tryFindId(devApi, devToken, storeKey, c);
          if (result) {
            devPayload = result.id;
            idStore.setId(storeKey, 'PIHR_DEV', result.id);
          }
        }
      } catch (e) { }
      if (prodPayload && devPayload) break;
    }
    if (!prodPayload && !devPayload) {
      console.log(`resolveDeletePayload: list lookup did not resolve ids for delete key '${storeKey}'`);
      const listFns = generateListFunctionNames(prodApi, storeKey);
      if (listFns && listFns.length > 0) {
        function extractIdFromItem(item, key) {
          if (!item || typeof item !== 'object') return null;
          const parts = String(key).split('_').filter(Boolean);
          const last = parts.length ? parts[parts.length - 1] : key;
          const candidates = [
            `${key}_id`, `${key}Id`,
            `${last}_id`, `${last}Id`,
            'id', 'value'
          ];
          // try direct candidates first (case-sensitive)
          for (const c of candidates) if (Object.prototype.hasOwnProperty.call(item, c)) return item[c];
          // try case-insensitive match
          const lowered = Object.keys(item).reduce((acc, k) => { acc[k.toLowerCase()] = k; return acc; }, {});
          for (const c of candidates) {
            const lc = c.toLowerCase();
            if (lc in lowered) return item[lowered[lc]];
          }
          // fallback: any property name containing 'id'
          for (const k of Object.keys(item)) {
            if (k.toLowerCase().includes('id')) return item[k];
          }
          return null;
        }

        async function tryResolveFromLists(apiInstance, token, envName) {
          for (const fn of listFns) {
            try {
              if (typeof apiInstance[fn] !== 'function') continue;
              const resp = await apiInstance[fn](token);
              const json = await (typeof resp.json === 'function' ? resp.json() : Promise.resolve(resp));
              const first = Array.isArray(json) ? json[0] : (json && (json.data || json.results || json.items) ? (json.data?.[0] || json.results?.[0] || json.items?.[0]) : null);
              const id = extractIdFromItem(first, storeKey);
              if (id) {
                idStore.setId(storeKey, envName, id);
                console.log(`resolveDeletePayload: fallback resolved ${envName} ${storeKey}=${id} using ${fn}`);
                return id;
              }
            } catch (e) {
              /* ignore and try next list fn */
            }
          }
          return null;
        }

        try {
          if (!prodPayload) {
            const id = await tryResolveFromLists(prodApi, prodToken, 'PIHR_PROD');
            if (id) prodPayload = id;
          }
        } catch (e) {}
        try {
          if (!devPayload) {
            const id2 = await tryResolveFromLists(devApi, devToken, 'PIHR_DEV');
            if (id2) devPayload = id2;
          }
        } catch (e) {}

        if (prodPayload || devPayload) {
          return { prodPayload, devPayload };
        }
      }
    }
  } else {
    console.log(`resolveDeletePayload: using stored id for delete key '${storeKey}': PROD=${prodPayload}, DEV=${devPayload}`);
  }

  return { prodPayload, devPayload };
}
