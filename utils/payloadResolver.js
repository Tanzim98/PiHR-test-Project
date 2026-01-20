import idStore from './idStore.js';
function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function replacePlaceholdersInString(s, env) {
  if (typeof s !== 'string') return s;
  let out = s;
  const patterns = [/{{\s*([^}]+)\s*}}/g, /\$\{\s*([^}]+)\s*\}/g];
  for (const pat of patterns) {
    out = out.replace(pat, (_, key) => {
      const k = String(key).trim();
      const v = idStore.getId(k, env);
      if (v == null) {
        // if not found, keep placeholder to make debugging easier
        console.warn(`payloadResolver: no id for key "${k}" in env ${env}`);
        return `{{${k}}}`;
      }
      return String(v);
    });
  }
  return out;
}

export function resolvePayloadTemplate(payloadTemplate, env = 'PIHR_PROD') {
  if (payloadTemplate == null) return payloadTemplate;
  // primitives
  if (typeof payloadTemplate === 'string') return replacePlaceholdersInString(payloadTemplate, env);
  if (typeof payloadTemplate !== 'object') return payloadTemplate;

  // arrays
  if (Array.isArray(payloadTemplate)) {
    return payloadTemplate.map((it) => resolvePayloadTemplate(it, env));
  }

  // object
  const out = {};
  for (const [k, v] of Object.entries(payloadTemplate)) {
    if (typeof v === 'string') {
      out[k] = replacePlaceholdersInString(v, env);
    } else if (Array.isArray(v)) {
      out[k] = v.map((it) => resolvePayloadTemplate(it, env));
    } else if (isObject(v)) {
      out[k] = resolvePayloadTemplate(v, env);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export default { resolvePayloadTemplate };
