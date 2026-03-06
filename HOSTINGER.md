# Hostinger Node.js Panel Deployment

This repo is prepared to run as a single Node.js app on Hostinger's Node.js deployment panel.

## What runs in production

- Frontend: built Vite files from `dist/`
- Backend: AdminJS + Express + public API
- Admin: `/admin`
- API: `/api`
- Uploads: `/uploads`

The same Node process serves all of them.

## Hostinger panel settings

- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`

## Environment variables

Set these in the Hostinger Node.js app panel:

```env
PORT=3001
PUBLIC_ORIGIN=https://your-domain.com
ADMINJS_ROOT_PATH=/admin
SESSION_SECRET=put-a-long-random-secret-here
SESSION_COOKIE_NAME=adminjs
SESSION_COOKIE_MAX_AGE_MS=604800000
SESSION_TABLE_NAME=admin_sessions

ADMINJS_EMAIL=your-admin-email
ADMINJS_PASSWORD=your-admin-password

DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=city_focus_hub_admin
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password

UPLOADS_DIR=/home/your-hostinger-user/app-storage/uploads
UPLOADS_PUBLIC_PATH=/uploads

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mahmutmese.uk@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=mahmutmese.uk@gmail.com
ADMIN_NOTIFICATION_EMAIL=mahmutmese.uk@gmail.com
```

## Database

Create a MySQL database in Hostinger and use those credentials in the environment variables above.

The backend bootstraps required tables automatically on startup, including the persistent admin session table.

## Important notes

- `VITE_API_URL` is not required in production anymore.
- The frontend uses same-origin `/api` in production.
- Uploaded images are served from `/uploads`.
- Set `UPLOADS_DIR` to a writable folder outside the deployed app bundle so uploads survive deploys and restarts.
- Admin sessions are stored in MySQL table `admin_sessions`, so admin logins persist across Node restarts.

## URLs

- Website: `https://your-domain.com`
- Admin: `https://your-domain.com/admin`
