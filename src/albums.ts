import type { HttpClient } from './http.js';
import type {
  Album,
  AlbumMedia,
  AttachedMedia,
  CreateAlbumInput,
  DeletedAlbum,
  ListInput,
  PaginatedResult,
  RemovedMedia,
  UpdateAlbumInput,
} from './types.js';

export class AlbumsResource {
  constructor(private readonly http: HttpClient) {}

  async create(input: CreateAlbumInput): Promise<Album> {
    const { data } = await this.http.request<Album>('/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    return data;
  }

  async list(input: ListInput = {}): Promise<PaginatedResult<Album>> {
    const { data, pagination } = await this.http.request<Album[]>(
      `/albums${buildQuery(input)}`,
    );

    return {
      items: data,
      pagination: pagination ?? { nextCursor: null, hasMore: false },
    };
  }

  async get(albumId: string): Promise<Album> {
    const { data } = await this.http.request<Album>(`/albums/${encodeURIComponent(albumId)}`);
    return data;
  }

  async update(albumId: string, input: UpdateAlbumInput): Promise<Album> {
    const { data } = await this.http.request<Album>(`/albums/${encodeURIComponent(albumId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    return data;
  }

  async delete(albumId: string): Promise<DeletedAlbum> {
    const { data } = await this.http.request<DeletedAlbum>(
      `/albums/${encodeURIComponent(albumId)}`,
      { method: 'DELETE' },
    );

    return data;
  }

  async listMedia(albumId: string, input: ListInput = {}): Promise<PaginatedResult<AlbumMedia>> {
    const { data, pagination } = await this.http.request<AlbumMedia[]>(
      `/albums/${encodeURIComponent(albumId)}/media${buildQuery(input)}`,
    );

    return {
      items: data,
      pagination: pagination ?? { nextCursor: null, hasMore: false },
    };
  }

  async attachMedia(albumId: string, mediaId: string): Promise<AttachedMedia> {
    const { data } = await this.http.request<AttachedMedia>(
      `/albums/${encodeURIComponent(albumId)}/media/${encodeURIComponent(mediaId)}`,
      { method: 'PUT' },
    );

    return data;
  }

  async removeMedia(albumId: string, mediaId: string): Promise<RemovedMedia> {
    const { data } = await this.http.request<RemovedMedia>(
      `/albums/${encodeURIComponent(albumId)}/media/${encodeURIComponent(mediaId)}`,
      { method: 'DELETE' },
    );

    return data;
  }
}

function buildQuery(input: ListInput): string {
  const params = new URLSearchParams();

  if (input.limit !== undefined) {
    params.set('limit', String(input.limit));
  }

  if (input.cursor !== undefined) {
    params.set('cursor', input.cursor);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}
