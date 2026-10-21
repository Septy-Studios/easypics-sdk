import type { HttpClient } from './http.js';
import type { Album, AlbumMedia, AttachedMedia, CreateAlbumInput, DeletedAlbum, ListInput, PaginatedResult, RemovedMedia, UpdateAlbumInput } from './types.js';
export declare class AlbumsResource {
    private readonly http;
    constructor(http: HttpClient);
    create(input: CreateAlbumInput): Promise<Album>;
    list(input?: ListInput): Promise<PaginatedResult<Album>>;
    get(albumId: string): Promise<Album>;
    update(albumId: string, input: UpdateAlbumInput): Promise<Album>;
    delete(albumId: string): Promise<DeletedAlbum>;
    listMedia(albumId: string, input?: ListInput): Promise<PaginatedResult<AlbumMedia>>;
    attachMedia(albumId: string, mediaId: string): Promise<AttachedMedia>;
    removeMedia(albumId: string, mediaId: string): Promise<RemovedMedia>;
}
//# sourceMappingURL=albums.d.ts.map