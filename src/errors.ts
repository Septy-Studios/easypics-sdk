export interface EasyPicsErrorOptions {
  code: string;
  status: number;
  retryAfter?: number;
  cause?: unknown;
}

export class EasyPicsError extends Error {
  readonly code: string;
  readonly status: number;
  readonly retryAfter?: number;

  constructor(message: string, options: EasyPicsErrorOptions) {
    super(message, { cause: options.cause });
    this.name = 'EasyPicsError';
    this.code = options.code;
    this.status = options.status;

    if (options.retryAfter !== undefined) {
      this.retryAfter = options.retryAfter;
    }
  }
}
