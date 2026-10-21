# EasyPics SDK

Official TypeScript SDK for the [EasyPics Developer API](https://easypics.lol/developers).

Current status: early development (`0.0.x`). The public API may still change between releases.

The SDK is intentionally server-side only. EasyPics API keys are secrets and must not be shipped in browser bundles.

## Install

```bash
npm install @easypics/sdk
```

Node.js 22 or newer is required.

## Quick start

```ts
import { EasyPics } from '@easypics/sdk';

const easypics = new EasyPics({
  apiKey: process.env.EASYPICS_API_KEY!,
});

const media = await easypics.media.upload({
  file: './capture.png',
  visibility: 'UNLISTED',
});

console.log(media.url);
```

API access is request-only. See the [Developer API page](https://easypics.lol/developers) for access requirements and current limits.

## Albums

```ts
const album = await easypics.albums.create({
  title: 'Project Screenshots',
  visibility: 'UNLISTED',
});

await easypics.media.upload({
  file: './build.png',
  albumId: album.id,
});
```

Available album methods:

```ts
await easypics.albums.create(input);
await easypics.albums.list({ limit: 20, cursor });
await easypics.albums.get(albumId);
await easypics.albums.update(albumId, input);
await easypics.albums.delete(albumId);
await easypics.albums.listMedia(albumId, { limit: 20, cursor });
await easypics.albums.attachMedia(albumId, mediaId);
await easypics.albums.removeMedia(albumId, mediaId);
```

## Upload inputs

`media.upload()` accepts a filesystem path, `Blob`, `Uint8Array`, or `ArrayBuffer`.

```ts
await easypics.media.upload({
  file: bytes,
  fileName: 'avatar.png',
  title: 'Avatar',
  description: 'Generated during account setup',
  visibility: 'PRIVATE',
});
```

When uploading raw bytes or a nameless `Blob`, pass `fileName` explicitly.

## Errors

API and transport failures throw `EasyPicsError`.

```ts
import { EasyPicsError } from '@easypics/sdk';

try {
  await easypics.albums.list();
} catch (error) {
  if (error instanceof EasyPicsError) {
    console.error(error.code, error.status);

    if (error.retryAfter) {
      console.error(`Retry after ${error.retryAfter}s`);
    }
  }
}
```

The SDK does not automatically retry requests. Some EasyPics operations create resources, so retry policy is left to the application instead of risking duplicate work.

## Configuration

```ts
const easypics = new EasyPics({
  apiKey: process.env.EASYPICS_API_KEY!,
  timeoutMs: 30_000,
});
```

`baseUrl` and `fetch` can be overridden for testing and development.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
```

The package has no runtime dependencies.

## Release policy

The project starts at `0.0.1`. During the early development phase, each published update increments the patch version (`0.0.2`, `0.0.3`, and so on). See [RELEASES.md](./RELEASES.md) for the stability and release policy.

## Safety

The SDK is not a security boundary. API keys, authorization, rate limits, file validation, ownership checks, and quotas are enforced by the EasyPics API. The client intentionally does not retry write requests automatically.

See [SECURITY.md](./SECURITY.md) for credential handling and vulnerability reporting.

## License

MIT
