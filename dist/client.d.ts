import { AlbumsResource } from './albums.js';
import { MediaResource } from './media.js';
export interface EasyPicsOptions {
    apiKey: string;
    baseUrl?: string;
    timeoutMs?: number;
    fetch?: typeof fetch;
}
export declare class EasyPics {
    readonly albums: AlbumsResource;
    readonly media: MediaResource;
    constructor(options: EasyPicsOptions);
}
//# sourceMappingURL=client.d.ts.map