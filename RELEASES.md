# Releases

Releases follow semantic versioning. The SDK is currently in early development, so breaking changes may occur before `1.0.0`.

## Publishing

1. Update `CHANGELOG.md`.
2. Bump the package version.
3. Run `npm run typecheck` and `npm test`.
4. Check the package with `npm pack --dry-run`.
5. Create the Git tag and GitHub release.
6. Publish to npm.
