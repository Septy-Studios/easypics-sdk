import { AlbumsResource } from './albums.js';
import { EasyPicsError } from './errors.js';
import { HttpClient } from './http.js';
import { MediaResource } from './media.js';

export interface EasyPicsOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
}

export class EasyPics {
  readonly albums: AlbumsResource;
  readonly media: MediaResource;

  constructor(options: EasyPicsOptions) {
    if (!options.apiKey?.trim()) {
      throw new EasyPicsError('apiKey is required.', {
        code: 'INVALID_CONFIGURATION',
        status: 0,
      });
    }

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      throw new EasyPicsError(
        'The EasyPics SDK is server-side only. Never expose an EasyPics API key in browser code.',
        {
          code: 'BROWSER_UNSUPPORTED',
          status: 0,
        },
      );
    }

    const timeoutMs = options.timeoutMs ?? 30_000;

    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      throw new EasyPicsError('timeoutMs must be a positive number.', {
        code: 'INVALID_CONFIGURATION',
        status: 0,
      });
    }

    const http = new HttpClient({
      apiKey: options.apiKey,
      baseUrl: options.baseUrl ?? 'https://easypics.lol/api/v1',
      timeoutMs,
      fetchImpl: options.fetch ?? globalThis.fetch,
    });

    this.albums = new AlbumsResource(http);
    this.media = new MediaResource(http);
  }
}
