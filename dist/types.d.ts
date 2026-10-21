export type Visibility = 'PUBLIC' | 'UNLISTED' | 'PRIVATE';
export interface Pagination {
    nextCursor: string | null;
    hasMore: boolean;
}
export interface PaginatedResult<T> {
    items: T[];
    pagination: Pagination;
}
export interface Album {
    id: string;
    title: string;
    description: string | null;
    visibility: Visibility;
    coverPostId: string | null;
    itemCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface AlbumMedia {
    id: string;
    title: string | null;
    description: string | null;
    mimeType: string;
    mediaKind: string;
    size: number;
    visibility: Visibility;
    status: string;
    width: number | null;
    height: number | null;
    createdAt: string;
    addedAt: string;
    position: number;
    isStarred: boolean;
}
export interface UploadedMedia {
    id: string;
    url: string;
    mimeType: string;
    size: number;
    createdAt: string;
    albumId?: string;
}
export interface CreateAlbumInput {
    title: string;
    description?: string | null;
    visibility?: Visibility;
}
export interface UpdateAlbumInput {
    title?: string;
    description?: string | null;
    visibility?: Visibility;
    coverPostId?: string | null;
}
export interface ListInput {
    limit?: number;
    cursor?: string;
}
export interface UploadMediaInput {
    file: string | Blob | Uint8Array | ArrayBuffer;
    fileName?: string;
    title?: string;
    description?: string;
    visibility?: Visibility;
    albumId?: string;
}
export interface DeletedAlbum {
    id: string;
    deleted: true;
}
export interface AttachedMedia {
    albumId: string;
    mediaId: string;
    attached: true;
}
export interface RemovedMedia {
    albumId: string;
    mediaId: string;
    removed: true;
}
//# sourceMappingURL=types.d.ts.map