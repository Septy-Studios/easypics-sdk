export class AlbumsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    async create(input) {
        const { data } = await this.http.request('/albums', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
        return data;
    }
    async list(input = {}) {
        const { data, pagination } = await this.http.request(`/albums${buildQuery(input)}`);
        return {
            items: data,
            pagination: pagination ?? { nextCursor: null, hasMore: false },
        };
    }
    async get(albumId) {
        const { data } = await this.http.request(`/albums/${encodeURIComponent(albumId)}`);
        return data;
    }
    async update(albumId, input) {
        const { data } = await this.http.request(`/albums/${encodeURIComponent(albumId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
        return data;
    }
    async delete(albumId) {
        const { data } = await this.http.request(`/albums/${encodeURIComponent(albumId)}`, { method: 'DELETE' });
        return data;
    }
    async listMedia(albumId, input = {}) {
        const { data, pagination } = await this.http.request(`/albums/${encodeURIComponent(albumId)}/media${buildQuery(input)}`);
        return {
            items: data,
            pagination: pagination ?? { nextCursor: null, hasMore: false },
        };
    }
    async attachMedia(albumId, mediaId) {
        const { data } = await this.http.request(`/albums/${encodeURIComponent(albumId)}/media/${encodeURIComponent(mediaId)}`, { method: 'PUT' });
        return data;
    }
    async removeMedia(albumId, mediaId) {
        const { data } = await this.http.request(`/albums/${encodeURIComponent(albumId)}/media/${encodeURIComponent(mediaId)}`, { method: 'DELETE' });
        return data;
    }
}
function buildQuery(input) {
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
//# sourceMappingURL=albums.js.map