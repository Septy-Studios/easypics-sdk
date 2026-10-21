import type { HttpClient } from './http.js';
import type { UploadedMedia, UploadMediaInput } from './types.js';
export declare class MediaResource {
    private readonly http;
    constructor(http: HttpClient);
    upload(input: UploadMediaInput): Promise<UploadedMedia>;
}
//# sourceMappingURL=media.d.ts.map