import idStore from './idStore.js';
export function getState(key, env, idKey) {
  const storeKey = idKey ? `${key}:${idKey}` : key;
  return idStore.getId(storeKey, env);
}

export function setState(key, env, id, idKey) {
  const storeKey = idKey ? `${key}:${idKey}` : key;
  return idStore.setId(storeKey, env, id);
}

export async function resolveEntityId(token, seeds, api, options = {}) {
  if (!seeds) return null;
  const { listFn, nameResolverFn, idFields = [], codeFields = [], extraParams } = options;

  // If seeds explicitly include an id (or any *_id), prefer that and return immediately
  try {
    // check explicit idFields first
    for (const idf of (idFields || [])) {
      if (Object.prototype.hasOwnProperty.call(seeds, idf) && seeds[idf] != null) {
        const parsed = Number(seeds[idf]);
        if (!Number.isNaN(parsed)) return parsed;
      }
    }
    // generic fallback: any property in seeds that ends with '_id' or 'Id'
    for (const k of Object.keys(seeds)) {
      if (/(_id|Id)$/.test(String(k)) && seeds[k] != null) {
        const parsed = Number(seeds[k]);
        if (!Number.isNaN(parsed)) return parsed;
      }
    }
  } catch (e) {
    // ignore and continue to lookup
  }

  // Prepare params to pass to list functions. Prefer explicit extraParams (may reference seeds),
  // otherwise use seeds directly when the list endpoint accepts a payload.
  const paramsToUse = (typeof extraParams !== 'undefined') ? extraParams : seeds;

  // Prefer name-based resolution if a name exists and resolver function provided
  if (seeds.name && nameResolverFn && typeof api[nameResolverFn] === 'function') {
    try {
      const id = await api[nameResolverFn](token, seeds.name);
      if (id) return id;
    } catch (e) {
      // ignore and fall back
    }
  }

  // If code-based resolution requested, list and search for a matching code value.
  // Dynamically detect any *_code fields on the seeds object, prefer explicit codeFields
  const detectedCodeFields = (codeFields && codeFields.length > 0)
    ? codeFields.slice()
    : Object.keys(seeds).filter(k => k && String(k).toLowerCase().endsWith('_code'));

  // Also allow a generic 'code' field
  if (detectedCodeFields.length === 0 && Object.prototype.hasOwnProperty.call(seeds, 'code')) {
    detectedCodeFields.push('code');
  }

  // Find the first non-null code value from detected fields
  let codeToMatch = undefined;
  for (const f of detectedCodeFields) {
    if (Object.prototype.hasOwnProperty.call(seeds, f) && seeds[f] != null) { codeToMatch = seeds[f]; break; }
  }

  if (typeof codeToMatch !== 'undefined' && listFn && typeof api[listFn] === 'function') {
      try {
        // pass params (e.g., employee_id) to list function when available
        const res = paramsToUse ? await api[listFn](token, paramsToUse) : await api[listFn](token);
        let body;
        try { body = await res.json(); } catch (e) { return null; }
        const list = Array.isArray(body) ? body : (Array.isArray(body?.data) ? body.data : []);
        // Infer candidate code and id fields if not explicitly provided
        const inferCodeFields = (arr) => {
          const out = [];
          const seen = new Set();
          const add = (k) => { if (k && !seen.has(k)) { out.push(k); seen.add(k); } };
          add('code'); // common
          const sample = arr.slice(0, 50);
          for (const it of sample) {
            if (!it || typeof it !== 'object') continue;
            for (const k of Object.keys(it)) {
              const lower = String(k).toLowerCase();
              if (lower === 'code' || lower.endsWith('_code') || /Code$/.test(k) || lower.includes('code')) add(k);
            }
          }
          return out;
        };
        const inferIdFields = (arr) => {
          const out = [];
          const seen = new Set();
          const add = (k) => { if (k && !seen.has(k)) { out.push(k); seen.add(k); } };
          add('id'); add('value');
          const sample = arr.slice(0, 50);
          for (const it of sample) {
            if (!it || typeof it !== 'object') continue;
            for (const k of Object.keys(it)) {
              const lower = String(k).toLowerCase();
              const looksId = (lower === 'id' || lower.endsWith('_id') || /Id$/.test(k));
              if (!looksId) continue;
              const v = it[k];
              const n = Number(v);
              if (v != null && !Number.isNaN(n)) add(k);
            }
          }
          return out;
        };
        const codeFieldCandidates = (detectedCodeFields && detectedCodeFields.length) ? detectedCodeFields : (codeFields.length ? codeFields : inferCodeFields(list));
        const idFieldCandidates = idFields.length ? idFields : inferIdFields(list);
        for (const item of list) {
          if (!item || typeof item !== 'object') continue;
          for (const cf of codeFieldCandidates) {
            if (Object.prototype.hasOwnProperty.call(item, cf) && item[cf] != null) {
              if (String(item[cf]) === String(codeToMatch)) {
                // find id field
                for (const idf of idFieldCandidates) {
                  if (Object.prototype.hasOwnProperty.call(item, idf) && item[idf] != null) {
                    const parsed = Number(item[idf]);
                    if (!Number.isNaN(parsed)) return parsed;
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        return null;
      }
    }

  // As a last resort, if a list function was provided we can try a generic name match
  if (seeds.name && listFn && typeof api[listFn] === 'function') {
    try {
      const res = paramsToUse ? await api[listFn](token, paramsToUse) : await api[listFn](token);
      let body;
      try { body = await res.json(); } catch (e) { return null; }
      const list = Array.isArray(body) ? body : (Array.isArray(body?.data) ? body.data : []);
      // Infer candidate name/id fields dynamically
      const inferNameFields = (arr) => {
        const out = [];
        const seen = new Set();
        const add = (k) => { if (k && !seen.has(k)) { out.push(k); seen.add(k); } };
        // Seed common label keys
        ['text','name','title','label'].forEach(add);
        const sample = arr.slice(0, 50);
        for (const it of sample) {
          if (!it || typeof it !== 'object') continue;
          for (const k of Object.keys(it)) {
            const lower = String(k).toLowerCase();
            const excluded = (lower === 'id' || lower.endsWith('_id') || lower === 'code' || lower.endsWith('_code') || lower.includes('uuid'));
            const isNameLike = (!excluded && (lower === 'text' || lower === 'name' || lower === 'title' || lower === 'label' || lower.endsWith('_name') || /Name$/.test(k)));
            if (!isNameLike) continue;
            const v = it[k];
            if (v != null && typeof v === 'string') add(k);
          }
        }
        return out;
      };
      const inferIdFields = (arr) => {
        const out = [];
        const seen = new Set();
        const add = (k) => { if (k && !seen.has(k)) { out.push(k); seen.add(k); } };
        add('id'); add('value');
        const sample = arr.slice(0, 50);
        for (const it of sample) {
          if (!it || typeof it !== 'object') continue;
          for (const k of Object.keys(it)) {
            const lower = String(k).toLowerCase();
            const looksId = (lower === 'id' || lower.endsWith('_id') || /Id$/.test(k));
            if (!looksId) continue;
            const v = it[k];
            const n = Number(v);
            if (v != null && !Number.isNaN(n)) add(k);
          }
        }
        return out;
      };
      const nameFields = inferNameFields(list);
      const idFieldCandidates = inferIdFields(list);
      for (const item of list) {
        if (!item || typeof item !== 'object') continue;
        let label = null;
        for (const nf of nameFields) {
          if (Object.prototype.hasOwnProperty.call(item, nf) && item[nf] != null) { label = item[nf]; break; }
        }
        if (!label) continue;
        if (String(label).trim().toLowerCase() === String(seeds.name).trim().toLowerCase()) {
          for (const idf of idFieldCandidates) {
            if (Object.prototype.hasOwnProperty.call(item, idf) && item[idf] != null) {
              const parsed = Number(item[idf]);
              if (!Number.isNaN(parsed)) return parsed;
            }
          }
        }
      }
    } catch (e) {
      return null;
    }
  }

  return null;
}

export default { getState, setState, resolveEntityId };
