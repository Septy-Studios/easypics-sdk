export class EasyPicsError extends Error {
    code;
    status;
    retryAfter;
    constructor(message, options) {
        super(message, { cause: options.cause });
        this.name = 'EasyPicsError';
        this.code = options.code;
        this.status = options.status;
        if (options.retryAfter !== undefined) {
            this.retryAfter = options.retryAfter;
        }
    }
}
//# sourceMappingURL=errors.js.map