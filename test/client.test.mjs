import assert from 'node:assert/strict';
import test from 'node:test';

import { EasyPics, EasyPicsError } from '../dist/index.js';

test('requires an API key', () => {
  assert.throws(
    () => new EasyPics({ apiKey: '' }),
    (error) => error instanceof EasyPicsError && error.code === 'INVALID_CONFIGURATION',
  );
});

test('lists albums with authentication and pagination', async () => {
  let request;

  const client = new EasyPics({
    apiKey: 'test_key',
    baseUrl: 'https://example.test/api/v1',
    fetch: async (url, init) => {
      request = { url: String(url), init };
      return Response.json({
        success: true,
        data: [
          {
            id: 'album_1',
            title: 'Screenshots',
            description: null,
            visibility: 'UNLISTED',
            coverPostId: null,
            itemCount: 0,
            createdAt: '2026-10-21T12:00:00.000Z',
            updatedAt: '2026-10-21T12:00:00.000Z',
          },
        ],
        pagination: { nextCursor: 'next', hasMore: true },
      });
    },
  });

  const result = await client.albums.list({ limit: 25, cursor: 'abc def' });

  assert.equal(request.url, 'https://example.test/api/v1/albums?limit=25&cursor=abc+def');
  assert.equal(new Headers(request.init.headers).get('Authorization'), 'Bearer test_key');
  assert.equal(result.items[0].id, 'album_1');
  assert.deepEqual(result.pagination, { nextCursor: 'next', hasMore: true });
});

test('uploads bytes as multipart data', async () => {
  let body;

  const client = new EasyPics({
    apiKey: 'test_key',
    baseUrl: 'https://example.test/api/v1',
    fetch: async (_url, init) => {
      body = init.body;
      return Response.json(
        {
          success: true,
          data: {
            id: 'media_1',
            url: 'https://easypics.lol/i/media_1',
            mimeType: 'image/png',
            size: 4,
            createdAt: '2026-10-21T12:00:00.000Z',
          },
        },
        { status: 201 },
      );
    },
  });

  const media = await client.media.upload({
    file: new Uint8Array([1, 2, 3, 4]),
    fileName: 'capture.png',
    visibility: 'UNLISTED',
  });

  assert.ok(body instanceof FormData);
  assert.equal(body.get('visibility'), 'UNLISTED');
  assert.equal(media.id, 'media_1');
});

test('exposes API error code and Retry-After', async () => {
  const client = new EasyPics({
    apiKey: 'test_key',
    baseUrl: 'https://example.test/api/v1',
    fetch: async () =>
      Response.json(
        {
          success: false,
          error: { code: 'RATE_LIMITED', message: 'Slow down.' },
        },
        {
          status: 429,
          headers: { 'Retry-After': '12' },
        },
      ),
  });

  await assert.rejects(
    () => client.albums.list(),
    (error) =>
      error instanceof EasyPicsError &&
      error.code === 'RATE_LIMITED' &&
      error.status === 429 &&
      error.retryAfter === 12,
  );
});
