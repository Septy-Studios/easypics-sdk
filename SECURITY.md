# Security

## API keys

EasyPics API keys are server-side credentials. Do not expose them in browser code, public repositories, logs, mobile applications, or client-side environment variables.

If a key is exposed, revoke it immediately and create a replacement.

## Reporting a security issue

Please do not open a public GitHub issue for vulnerabilities or exposed credentials.

Report security issues privately through the support contact listed on the EasyPics website.

## Scope

This repository contains only the EasyPics client SDK.

Authentication, authorization, rate limiting, file validation, ownership checks, quotas, and storage controls are enforced by the EasyPics API. The SDK must never be treated as a security boundary.