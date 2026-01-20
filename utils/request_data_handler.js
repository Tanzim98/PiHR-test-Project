const fs = require('fs').promises;
const path = require('path');

/**
 * API Request Data Handler
 * 
 * This class is responsible for loading request data from saved JSON files.
 * All JSON data files are assumed to be in the "request_data" folder under "resources" folder.
 * 
 * @class APIRequestDataHandler
 */
class APIRequestDataHandler {
    /**
     * Creates an instance of APIRequestDataHandler.
     * 
     * @param {string} datafile - The name of the JSON data file (excluding extension)
     * @param {string} [requestDataFolder] - Optional custom path to request data folder
     * @throws {Error} If the JSON file cannot be read or parsed
     */
    constructor(datafile = '', requestDataFolder = null) {
        this.datafile = datafile;
        this.requestData = null;
        this.requestDataFolder = requestDataFolder || this._getDefaultRequestDataFolder();
    }

    /**
     * Gets the default request data folder path
     * 
     * @private
     * @returns {string} Path to the request data folder
     */
    _getDefaultRequestDataFolder() {
        const projectRoot = path.resolve(__dirname, '..');
        return path.join(projectRoot, 'resources', 'request_data');
    }

    /**
     * Initializes the handler by loading the JSON file
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If the file cannot be read or parsed
     */
    async initialize() {
        if (!this.datafile) {
            throw new Error('Datafile is required to load request data');
        }

        const filePath = path.join(this.requestDataFolder, `${this.datafile}.json`);

        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            this.requestData = JSON.parse(fileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`Request data file not found: ${filePath}`);
            }
            if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON in file: ${filePath}. ${error.message}`);
            }
            throw new Error(`Failed to load request data: ${error.message}`);
        }
    }

    /**
     * Static factory method to create and initialize the handler
     * 
     * @static
     * @async
     * @param {string} datatype - The name of the JSON data file (excluding extension)
     * @param {string} [requestDataFolder] - Optional custom path to request data folder
     * @returns {Promise<APIRequestDataHandler>} Initialized handler instance
     */
    static async create(datatype, requestDataFolder = null) {
        const handler = new APIRequestDataHandler(datatype, requestDataFolder);
        await handler.initialize();
        return handler;
    }

    /**
     * Returns the payload as a JSON object
     * 
     * @param {string} [name='payload'] - The key name for the payload in the request data
     * @returns {Object|Array} The payload object or array
     * @throws {Error} If the payload key doesn't exist
     */
    getPayload(name = 'payload') {
        this._ensureInitialized();

        if (!(name in this.requestData)) {
            throw new Error(`Payload key "${name}" not found in request data`);
        }

        return this._deepClone(this.requestData[name]);
    }

    /**
     * Returns the headers as a JSON object
     * 
     * @returns {Object} The headers object
     * @throws {Error} If headers don't exist
     */
    getHeaders() {
        this._ensureInitialized();

        if (!('headers' in this.requestData)) {
            throw new Error('Headers not found in request data');
        }

        return this._deepClone(this.requestData.headers);
    }

    /**
     * Returns the params as a JSON object
     * 
     * @returns {Object} The params object
     * @throws {Error} If params don't exist
     */
    getParams() {
        this._ensureInitialized();

        if (!('params' in this.requestData)) {
            throw new Error('Params not found in request data');
        }

        return this._deepClone(this.requestData.params);
    }

    /**
     * Returns the payload after modifying attributes according to the provided updates
     * 
     * Supports nested updates using dot notation (e.g., 'user.name' => 'John')
     * If the payload is a list, you can provide an index to modify a specific object,
     * otherwise all objects in the list will be updated.
     * 
     * @param {string} [name='payload'] - The key name for the payload
     * @param {Object} updates - Object containing key-value pairs to update
     * @param {number} [index] - Optional index for array payloads
     * @returns {Object|Array} Modified payload
     */
    getModifiedPayload(name = 'payload', updates = {}, index = null) {
        const payload = this.getPayload(name);

        if (Array.isArray(payload)) {
            if (index !== null && index !== undefined) {
                if (index < 0 || index >= payload.length) {
                    throw new Error(`Index ${index} is out of bounds for payload array`);
                }
                this._updateObject(payload[index], updates);
            } else {
                payload.forEach(item => {
                    this._updateObject(item, updates);
                });
            }
        } else {
            this._updateObject(payload, updates);
        }

        return payload;
    }

    /**
     * Returns the headers after modifying attributes
     * 
     * @param {Object} updates - Object containing key-value pairs to update
     * @returns {Object} Modified headers
     */
    getModifiedHeaders(updates = {}) {
        const headers = this.getHeaders();
        this._updateObject(headers, updates);
        return headers;
    }

    /**
     * Returns the params after modifying attributes
     * 
     * @param {Object} updates - Object containing key-value pairs to update
     * @returns {Object} Modified params
     */
    getModifiedParams(updates = {}) {
        const params = this.getParams();
        this._updateObject(params, updates);
        return params;
    }

    /**
     * Updates a JSON object with the provided key-value pairs
     * Supports nested updates using dot notation
     * 
     * @private
     * @param {Object} jsonObject - The JSON object to update
     * @param {Object} updates - Object containing key-value pairs
     */
    _updateObject(jsonObject, updates) {
        for (const [key, value] of Object.entries(updates)) {
            if (key === 'index') continue; // Skip index key

            if (key.includes('.')) {
                // Handle nested updates using dot notation
                this._setNestedValue(jsonObject, key, value);
            } else {
                jsonObject[key] = value;
            }
        }
    }

    /**
     * Sets a nested value in an object using dot notation
     * 
     * @private
     * @param {Object} obj - The object to update
     * @param {string} path - Dot-separated path (e.g., 'user.profile.name')
     * @param {*} value - The value to set
     */
    _setNestedValue(obj, path, value) {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
                current[key] = {};
            }
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;
    }

    /**
     * Performs a deep clone of an object or array
     * 
     * @private
     * @param {*} obj - The object to clone
     * @returns {*} Deep cloned object
     */
    _deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Ensures the handler has been initialized
     * 
     * @private
     * @throws {Error} If not initialized
     */
    _ensureInitialized() {
        if (this.requestData === null) {
            throw new Error('Handler not initialized. Call initialize() or use create() method first.');
        }
    }

    /**
     * Gets the raw request data object
     * 
     * @returns {Object} The complete request data object
     */
    getRawData() {
        this._ensureInitialized();
        return this._deepClone(this.requestData);
    }

    /**
     * Checks if a specific key exists in the request data
     * 
     * @param {string} key - The key to check
     * @returns {boolean} True if the key exists
     */
    hasKey(key) {
        this._ensureInitialized();
        return key in this.requestData;
    }
}

module.exports = APIRequestDataHandler;

