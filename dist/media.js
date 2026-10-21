import { readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { EasyPicsError } from './errors.js';
export class MediaResource {
    http;
    constructor(http) {
        this.http = http;
    }
    async upload(input) {
        const { blob, fileName } = await normalizeFile(input.file, input.fileName);
        const form = new FormData();
        form.append('file', blob, fileName);
        appendIfDefined(form, 'title', input.title);
        appendIfDefined(form, 'description', input.description);
        appendIfDefined(form, 'visibility', input.visibility);
        appendIfDefined(form, 'albumId', input.albumId);
        const { data } = await this.http.request('/media', {
            method: 'POST',
            body: form,
        });
        return data;
    }
}
async function normalizeFile(input, fileName) {
    if (typeof input === 'string') {
        const resolvedName = fileName ?? basename(input);
        const bytes = await readFile(input);
        return {
            blob: new Blob([new Uint8Array(bytes)], {
                type: getMimeType(resolvedName),
            }),
            fileName: resolvedName,
        };
    }
    if (input instanceof Blob) {
        const detectedName = typeof File !== 'undefined' && input instanceof File
            ? input.name
            : undefined;
        const resolvedName = fileName ?? detectedName;
        if (!resolvedName) {
            throw new EasyPicsError('fileName is required when uploading a Blob without a filename.', {
                code: 'INVALID_FILE_INPUT',
                status: 0,
            });
        }
        return { blob: input, fileName: resolvedName };
    }
    if (input instanceof Uint8Array) {
        if (!fileName) {
            throw new EasyPicsError('fileName is required when uploading bytes.', {
                code: 'INVALID_FILE_INPUT',
                status: 0,
            });
        }
        const copy = new Uint8Array(input.byteLength);
        copy.set(input);
        return {
            blob: new Blob([copy], {
                type: getMimeType(fileName),
            }),
            fileName,
        };
    }
    if (!fileName) {
        throw new EasyPicsError('fileName is required when uploading an ArrayBuffer.', {
            code: 'INVALID_FILE_INPUT',
            status: 0,
        });
    }
    return {
        blob: new Blob([input], {
            type: getMimeType(fileName),
        }),
        fileName,
    };
}
function getMimeType(fileName) {
    switch (extname(fileName).toLowerCase()) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        case '.mp4':
            return 'video/mp4';
        case '.webm':
            return 'video/webm';
        default:
            return 'application/octet-stream';
    }
}
function appendIfDefined(form, key, value) {
    if (value !== undefined) {
        form.append(key, value);
    }
}
//# sourceMappingURL=media.js.map