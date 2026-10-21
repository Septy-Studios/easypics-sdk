import { EasyPicsError } from './errors.js';
export class HttpClient {
    apiKey;
    baseUrl;
    timeoutMs;
    fetchImpl;
    constructor(options) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl.replace(/\/+$/, '');
        this.timeoutMs = options.timeoutMs;
        this.fetchImpl = options.fetchImpl;
    }
    async request(path, init = {}) {
        const headers = new Headers(init.headers);
        headers.set('Authorization', `Bearer ${this.apiKey}`);
        headers.set('Accept', 'application/json');
        const timeoutSignal = AbortSignal.timeout(this.timeoutMs);
        const signal = init.signal
            ? AbortSignal.any([init.signal, timeoutSignal])
            : timeoutSignal;
        let response;
        try {
            response = await this.fetchImpl(`${this.baseUrl}${path}`, {
                ...init,
                headers,
                signal,
            });
        }
        catch (error) {
            if (timeoutSignal.aborted) {
                throw new EasyPicsError(`EasyPics request timed out after ${this.timeoutMs}ms.`, {
                    code: 'REQUEST_TIMEOUT',
                    status: 0,
                    cause: error,
                });
            }
            throw new EasyPicsError('Could not reach the EasyPics API.', {
                code: 'NETWORK_ERROR',
                status: 0,
                cause: error,
            });
        }
        const body = await parseJson(response);
        if (!response.ok) {
            const errorBody = body;
            const retryAfter = parseRetryAfter(response.headers.get('retry-after'));
            const code = errorBody?.error?.code ?? `HTTP_${response.status}`;
            const message = errorBody?.error?.message ?? `EasyPics API returned HTTP ${response.status}.`;
            throw new EasyPicsError(message, {
                code,
                status: response.status,
                ...(retryAfter === undefined ? {} : { retryAfter }),
            });
        }
        const successBody = body;
        if (!successBody || successBody.success !== true || !('data' in successBody)) {
            throw new EasyPicsError('EasyPics returned an unexpected response.', {
                code: 'INVALID_RESPONSE',
                status: response.status,
            });
        }
        return {
            data: successBody.data,
            ...(successBody.pagination ? { pagination: successBody.pagination } : {}),
        };
    }
}
async function parseJson(response) {
    const text = await response.text();
    if (!text) {
        return null;
    }
    try {
        return JSON.parse(text);
    }
    catch (error) {
        throw new EasyPicsError('EasyPics returned a non-JSON response.', {
            code: 'INVALID_RESPONSE',
            status: response.status,
            cause: error,
        });
    }
}
function parseRetryAfter(value) {
    if (!value) {
        return undefined;
    }
    const seconds = Number.parseInt(value, 10);
    return Number.isFinite(seconds) ? seconds : undefined;
}
//# sourceMappingURL=http.js.map