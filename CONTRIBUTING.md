# Contributing

Small, focused pull requests are preferred.

Before opening a PR:

```bash
npm install
npm run typecheck
npm test
```

For API behavior changes, link the relevant EasyPics API documentation or issue and add a test for the new behavior. Do not include API keys, uploaded private media, or other credentials in fixtures, logs, issues, or pull requests.

Bug reports should include the SDK version, Node.js version, the method being called, and the EasyPics error code when one is available.
