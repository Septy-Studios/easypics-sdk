import type { Pagination } from './types.js';
export interface RequestResult<T> {
    data: T;
    pagination?: Pagination;
}
export interface HttpClientOptions {
    apiKey: string;
    baseUrl: string;
    timeoutMs: number;
    fetchImpl: typeof fetch;
}
export declare class HttpClient {
    private readonly apiKey;
    private readonly baseUrl;
    private readonly timeoutMs;
    private readonly fetchImpl;
    constructor(options: HttpClientOptions);
    request<T>(path: string, init?: RequestInit): Promise<RequestResult<T>>;
}
//# sourceMappingURL=http.d.ts.map