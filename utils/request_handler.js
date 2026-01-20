export class RequestHandler {
    constructor(requestContext) {
        this.request = requestContext;
    }

    async get(url, options = {}) {
        this._logRequest('GET', url, options);
        const response = await this.request.get(url, options);
        await this._logResponse(response);
        return response;
    }

    async post(url, options = {}) {
        this._logRequest('POST', url, options);
        const response = await this.request.post(url, options);
        await this._logResponse(response);
        return response;
    }

    async put(url, options = {}) {
        this._logRequest('PUT', url, options);
        const response = await this.request.put(url, options);
        await this._logResponse(response);
        return response;
    }

    async patch(url, options = {}) {
        this._logRequest('PATCH', url, options);
        const response = await this.request.patch(url, options);
        await this._logResponse(response);
        return response;
    }

    async delete(url, options = {}) {
        this._logRequest('DELETE', url, options);
        const response = await this.request.delete(url, options);
        await this._logResponse(response);
        return response;
    }

    _logRequest(method, url, options) {
        console.log(`\n[API REQUEST] ${method} ${url}`);
        if (options.headers) {
            console.log('[HEADERS]:', JSON.stringify(options.headers, null, 2));
        }
        if (options.data) {
            console.log('[PAYLOAD]:', JSON.stringify(options.data, null, 2));
        }
        if (options.params) {
            console.log('[PARAMS]:', JSON.stringify(options.params, null, 2));
        }
    }

    async _logResponse(response) {
        const status = response.status();
        console.log(`[API RESPONSE] Status: ${status} ${response.statusText()}`);

        try {
            const body = await response.json();
            console.log('[RESPONSE BODY]:', JSON.stringify(body, null, 2));
        } catch (e) {
            // Internal API might return non-JSON response or empty body
            try {
                const text = await response.text();
                if (text) {
                    console.log('[RESPONSE BODY (Text)]:', text);
                }
            } catch (err) {
                console.log('[RESPONSE BODY]: (Could not read response body)');
            }
        }
        console.log('--------------------------------------------------\n');
    }
}
