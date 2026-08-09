# Portfolio platform setup

## Run locally

From the repository root:

```powershell
npm install
npm --prefix Port-folio install
npm run setup:local-secrets
npm run dev
```

Open `http://127.0.0.1:5173/`. The launcher runs Vite on port 5173 and the
private API on port 8787. Local data is written under `.data/` and is ignored by
Git.

## Server-only environment variables

Keep secrets in `Port-folio/.env.local` for development and in the hosting
provider's encrypted environment-variable store for production. Never add a
`VITE_` prefix to a secret: Vite exposes those values to browsers.

- `OPENAI_API_KEY`: powers the grounded profile assistant.
- `OPENAI_MODEL`: defaults to `gpt-5.6-luna`.
- `AI_GLOBAL_DAILY_LIMIT`: global AI request ceiling; defaults to 250/day.
- `RATE_LIMIT_SALT`: one-way request-fingerprint salt.
- `DATABASE_URL`: required in production for durable chat, analytics, limits,
  and recommendations. A managed Postgres connection string is supported.
- `ATTESTATION_SIGNING_SECRET`: signs private recommendation invitations.
- `ADMIN_API_TOKEN`: protects the recommendation-admin HTTP endpoint.
- `PUBLIC_SITE_URL`: the deployed site URL used in invitations.

`npm run setup:local-secrets` creates the three local security secrets when
they are missing and never prints their values.

## Discord-backed direct chat

1. Create a Discord application and bot, then add it to a private server that
   only you control.
2. Create a webhook for the channel where portfolio messages should arrive.
3. Add these server-only values: `DISCORD_WEBHOOK_URL`, `DISCORD_APP_ID`,
   `DISCORD_BOT_TOKEN`, `DISCORD_PUBLIC_KEY`, `DISCORD_GUILD_ID`, and
   `DISCORD_OWNER_USER_ID`.
4. After deploying, set the Discord application's Interactions Endpoint URL to
   `https://YOUR_DOMAIN/api/discord`.
5. Run `npm run register:discord` once to register the private `/reply` command.

Each webhook message includes its conversation ID. Reply from Discord with:

```text
/reply conversation:<conversation-id> message:<your response>
```

The server verifies Discord's request signature and accepts replies only from
`DISCORD_OWNER_USER_ID`. Visitors receive the reply through the website's
polling chat panel.

## Genuine recommendations

Create a private, expiring invitation optionally tied to a work email:

```powershell
npm run attestations:invite -- --email colleague@company.com --days 14
```

Review submissions without displaying private email addresses:

```powershell
npm run attestations:review -- list
npm run attestations:review -- approve <id> --method "LinkedIn identity reviewed"
npm run attestations:review -- reject <id>
```

Only approved recommendations are public. Each public card shows the author's
LinkedIn identity, professional relationship, verification method, consent,
and verification date. Work email is retained privately and never returned by
the public API.

## Verification

```powershell
npm test
npm --prefix Port-folio run lint
npm run build
npm audit
npm --prefix Port-folio audit
```
