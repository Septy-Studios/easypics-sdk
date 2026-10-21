export interface EasyPicsErrorOptions {
    code: string;
    status: number;
    retryAfter?: number;
    cause?: unknown;
}
export declare class EasyPicsError extends Error {
    readonly code: string;
    readonly status: number;
    readonly retryAfter?: number;
    constructor(message: string, options: EasyPicsErrorOptions);
}
//# sourceMappingURL=errors.d.ts.map