import fs from 'fs';
import path from 'path';

const STORE_DIR = path.resolve(process.cwd(), 'test-results', 'tmp');
const STORE_FILE = path.join(STORE_DIR, 'ids.json');

function ensureStore() {
  if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
  if (!fs.existsSync(STORE_FILE)) fs.writeFileSync(STORE_FILE, JSON.stringify({}), 'utf8');
}

function readStore() {
  ensureStore();
  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    return {};
  }
}

function writeStore(obj) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(obj, null, 2), 'utf8');
}

export const idStore = {
  // set id for a key and env (e.g., key='department', env='PIHR_PROD')
  setId(key, env, id) {
    const store = readStore();
    if (!store[key]) store[key] = {};
    store[key][env] = id;
    writeStore(store);
  },
  // get id for key and env. If env omitted, returns object with env->id
  getId(key, env) {
    const store = readStore();
    if (!store[key]) return null;
    if (env) return store[key][env] || null;
    return store[key];
  },
  // clear store (for tests)
  clear() {
    writeStore({});
  }
  ,
  // Check a signature (string). If it differs from stored signature, clear the id store
  // and store the new signature under __meta.signature. Returns true if cleared.
  checkAndClearIfSignatureChanged(signature) {
    try {
      const store = readStore();
      const meta = store.__meta || {};
      if (meta.signature !== signature) {
        // wipe all keys but persist new meta
        const newStore = { __meta: { signature } };
        writeStore(newStore);
        return true;
      }
      return false;
    } catch (e) {
      // if anything goes wrong, defensively clear store and write signature
      writeStore({ __meta: { signature } });
      return true;
    }
  },
  // Helper to get stored signature
  getStoredSignature() {
    try {
      const store = readStore();
      return store.__meta ? store.__meta.signature : undefined;
    } catch (e) { return undefined; }
  }
};

export default idStore;
