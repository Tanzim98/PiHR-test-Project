import { findIdInApiList, extractFirstIdFromResponse, prepareDeletePayloadsUsingList, prepareUpdatePayloadsUsingList } from "../utils/listMatcher.js";
import { compareApisByEnvWithHandlers, cacheCreatedEntityId, resolveDeletePayload } from "../utils/apiCompare.js";
import { getApisResponseAndCompare } from "../utils/ApiComparator.js";
import { resolvePayloadTemplate } from "../utils/payloadResolver.js";
export default class BasePage {
  constructor(request, env) {
    this.request = request;
    this.env = env;
  }
  // Generic: find id from a list-returning method on the class instance.
  async findIdFromList(token, listFnName, nameOrParams, options = {}) {
    try {
      const isNumericPrimitive = typeof nameOrParams === 'number' || (typeof nameOrParams === 'string' && /^\d+$/.test(nameOrParams));
      const wantsFirstId = isNumericPrimitive || (nameOrParams == null && (options.params || options.extraParams));

      if (wantsFirstId) {
        if (!this[listFnName] || typeof this[listFnName] !== 'function') {
          throw new Error(`List function ${listFnName} not found on api instance`);
        }
        const paramsArg = options.params || nameOrParams || options.extraParams;
        const res = paramsArg ? await this[listFnName](token, paramsArg) : await this[listFnName](token);
        const idCandidates = options.idCandidates || (options.storeKey ? [`${options.storeKey}_id`, 'id', 'value'] : ['id', 'value']);
        const id = await extractFirstIdFromResponse(res, idCandidates);
        return id != null ? Number(id) : null;
      }

      return await findIdInApiList(this, token, listFnName, nameOrParams, options);
    } catch (e) {
      console.log(`findIdFromList: error calling ${listFnName}`, e && e.message ? e.message : e);
      return null;
    }
  }

  // Proxy helpers so pages/tests can call these from the API class instead of importing utils directly.
  static async prepareDeletePayloadsUsingList(prodApi, devApi, prodToken, devToken, getParams, listGetterName, options = {}) {
    return prepareDeletePayloadsUsingList(prodApi, devApi, prodToken, devToken, getParams, listGetterName, options);
  }

  static async prepareUpdatePayloadsUsingList(prodApi, devApi, prodToken, devToken, baseUpdatePayload, getParams, listGetterName, options = {}) {
    return prepareUpdatePayloadsUsingList(prodApi, devApi, prodToken, devToken, baseUpdatePayload, getParams, listGetterName, options);
  }
  // Convenience: resolve a payload template (replace {{keys}} using idStore) for a given env
  static resolvePayloadTemplate(payloadTemplate, env = 'PIHR_PROD') {
    return resolvePayloadTemplate(payloadTemplate, env);
  }

  // Helper: perform a DELETE against a url template containing {param} placeholders.
  async deleteByPath(urlTemplate, token, payload, paramNames = []) {
    const toCamel = (s) => s.replace(/_([a-z])/g, (_, ch) => ch.toUpperCase());
    const normalizeCandidates = (name) => {
      const candidates = [];
      candidates.push(name);
      if (name.endsWith('_id')) candidates.push(name.replace(/_id$/, 'Id'));
      if (name.endsWith('_id')) candidates.push(name.replace(/_id$/, ''));
      candidates.push(toCamel(name));
      const parts = name.split('_');
      if (parts.length > 1) candidates.push(parts[parts.length - 1]);
      return Array.from(new Set(candidates));
    };

    const values = {};
    for (const pname of paramNames) {
      let val = undefined;
      const keys = normalizeCandidates(pname);
      if (payload && typeof payload === 'object') {
        for (const k of keys) {
          if (Object.prototype.hasOwnProperty.call(payload, k) && payload[k] != null) {
            val = payload[k];
            break;
          }
        }
      } else if (paramNames.length === 1) {
        // allow scalar payload when only one param is expected
        val = payload;
      }
      if (val == null) throw new Error(`deleteByPath: missing required path param '${pname}'`);
      values[pname] = val;
    }

    let url = urlTemplate;
    for (const [k, v] of Object.entries(values)) url = url.replace(`{${k}}`, String(v));

    return this.request.delete(url, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  }

  // Centralized PUT helper with optional payload/response logging controlled by
  // SHOW_API_PAYLOADS=1 or by passing { log: true } in options.
  async apiPut(url, token, payload, options = {}) {
    const shouldLog = process.env.SHOW_API_PAYLOADS === '1' || !!options.log;
    if (shouldLog) {
      try { console.log('[API] PUT', url, '- outgoing payload:', JSON.stringify(payload)); } catch (e) { console.log('[API] PUT', url, '- outgoing payload (unserializable)'); }
    }
    const res = await this.request.put(url, {
      data: payload,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    if (shouldLog) {
      try {
        const body = await (typeof res.json === 'function' ? res.json() : Promise.resolve(null));
        console.log('[API] PUT', url, '- response status:', res.status, 'body:', body);
      } catch (e) {
        console.log('[API] PUT', url, '- response parsing error:', e && e.message ? e.message : e);
      }
    }
    return res;
  }
  // Generic comparison runner that can be reused by any ApiClass (pages/ classes).
  // Helper: resolve payload factory/value for DELETE and PUT methods when payload is not provided.
  static async resolvePayloadForMethod(request, ApiClass, functionName, method, prodToken, devToken, payload = null) {
    // If this is DELETE with no explicit payload, prefer a per-entity prepareDelete wrapper
    if (method && method.toUpperCase() === 'DELETE' && (payload == null)) {
      const suffix = functionName.startsWith('delete') ? functionName.slice('delete'.length) : functionName;
      const prepName = `prepareDelete${suffix}Payloads`;
      if (typeof ApiClass[prepName] === 'function') {
        return (prodApi, devApi) => ApiClass[prepName](prodApi, devApi, prodToken, devToken);
      }
      const resolved = await resolveDeletePayload(request, ApiClass, functionName, prodToken, devToken);
      if (resolved) return async () => resolved;
      return payload;
    }

    // If this is PUT with no explicit payload, prefer a per-entity prepareUpdate wrapper
    if ((method || '').toUpperCase() === 'PUT' && (payload == null)) {
      const suffix = functionName.startsWith('update') ? functionName.slice('update'.length) : functionName;
      const prepName = `prepareUpdate${suffix}Payloads`;
      if (typeof ApiClass[prepName] === 'function') {
        return (prodApi, devApi) => ApiClass[prepName](prodApi, devApi, prodToken, devToken);
      }
      return asFactory(functionName);
    }

    return payload;
  }
  static async compareProdVsDev(request, ApiClass, functionName, method, prodToken, devToken, payload = null) {
    const registryEntry = ApiClass.entityRegistry?.[functionName];
    const handlers = registryEntry ? { [functionName]: (ctx) => cacheCreatedEntityId(ctx, registryEntry) } : {};

    // Resolve payload factory for DELETE/PUT when payload not provided.
    payload = await this.resolvePayloadForMethod(request, ApiClass, functionName, method, prodToken, devToken, payload);

    return compareApisByEnvWithHandlers(
      request,
      ApiClass,
      functionName,
      method,
      prodToken,
      devToken,
      payload,
      handlers,
    );
  }
}
export const asFactory = (methodName) => (prodApi, devApi) => prodApi[methodName](prodApi, devApi);

export async function compareApiInstances({
  prodApi,
  devApi,
  functionName,
  method,
  prodToken,
  devToken,
  payload = null,
  options = {},
}) {
  const className = prodApi?.constructor?.name || "ApiClass";
  if (typeof prodApi?.[functionName] !== "function" || typeof devApi?.[functionName] !== "function") {
    throw new Error(`Function ${functionName} does not exist in ${className}`);
  }
  const prodFn = (pl) => prodApi[functionName](prodToken, pl);
  const devFn = (pl) => devApi[functionName](devToken, pl);
  await getApisResponseAndCompare(prodFn, devFn, { method, payload, ...(options || {}) });
}

export async function compareApisByEnv(
  request,
  ApiClass,
  functionName,
  method,
  prodToken,
  devToken,
  payload = null,
  options = {},
) {
  const prodApi = new ApiClass(request, "PIHR_PROD");
  const devApi = new ApiClass(request, "PIHR_DEV");
  await compareApiInstances({
    prodApi,
    devApi,
    functionName,
    method,
    prodToken,
    devToken,
    payload,
    options,
  });
  return { prodApi, devApi };
}
