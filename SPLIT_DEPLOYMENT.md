# Split Deployment

This setup deploys the frontend and backend separately:

- Frontend: static Vite build on one host
- Backend: AdminJS + API + uploads on a Node host

## Frontend host

Build the frontend with the backend origin:

```bash
VITE_API_URL=https://your-backend-domain.com npm run build:frontend
```

Upload the generated `dist/` contents to your static host.

The frontend reads published CMS snapshots from `/cms/*.json` on the frontend host in production.
It still sends form submissions and resolves uploaded images against the backend host.

The frontend will call:

- `https://your-backend-domain.com/api/...`
- `https://your-backend-domain.com/uploads/...`

## Backend host

Run only the backend app. Required environment variables:

```env
PORT=3001
PUBLIC_ORIGIN=https://your-backend-domain.com
ADMINJS_ROOT_PATH=/admin
SESSION_SECRET=put-a-long-random-secret-here
SESSION_COOKIE_NAME=adminjs
SESSION_COOKIE_MAX_AGE_MS=604800000
SESSION_TABLE_NAME=admin_sessions

ADMINJS_EMAIL=your-admin-email
ADMINJS_PASSWORD=your-admin-password

DATABASE_HOST=your-db-host
DATABASE_PORT=3306
DATABASE_NAME=your-db-name
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password

FRONTEND_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com

UPLOADS_DIR=/absolute/path/to/uploads
UPLOADS_PUBLIC_PATH=/uploads
STATIC_SNAPSHOT_DIR=/absolute/path/to/frontend-public/cms

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mahmutmese.uk@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=mahmutmese.uk@gmail.com
ADMIN_NOTIFICATION_EMAIL=mahmutmese.uk@gmail.com
```

`FRONTEND_ORIGINS` is required for cross-origin form submissions from the static frontend.

`STATIC_SNAPSHOT_DIR` must point at the frontend host's public `cms` directory so AdminJS publish writes directly into the static site.

## Hostinger split example

Frontend on Hostinger static hosting:

- build locally:

```bash
VITE_API_URL=https://cms.example.com npm run build:frontend
```

- upload the contents of `dist/` to `public_html`
- make sure `public_html/cms` exists and is writable by the backend export path you configure

Backend on a separate Node host:

- set `PUBLIC_ORIGIN=https://cms.example.com`
- set `FRONTEND_ORIGINS=https://example.com,https://www.example.com`
- set `STATIC_SNAPSHOT_DIR=/home/your-user/domains/example.com/public_html/cms`
- run the Node app normally

Initial export after backend deploy:

```bash
npm run export:cms --prefix adminjs
```

## Verification

After deploy:

1. Open `https://your-frontend-domain.com/cms/homepage.json`.
2. Open the frontend site and check homepage content loads.
3. Open a secondary route like `/pricing`.
4. Open backend admin at `https://your-backend-domain.com/admin`.
5. Change content in admin and publish.
6. Verify the matching `/cms/*.json` file updates and the frontend reflects it.
7. Upload an image in admin and verify it renders on the frontend.
