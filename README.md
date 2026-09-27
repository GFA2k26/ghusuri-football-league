# GFL 2026 Production Build V12

This is the production-ready Ghusuri Football League 2026 full-stack build.

## Architecture

Browser -> Node.js/Express API -> SQLite database + persistent file storage

- SQLite stores teams, applications, players, approvals, fixtures, standings, settings, announcements, stats and sessions.
- Public files (logos/player photos) live in `DATA_DIR/uploads`.
- Private documents live in `DATA_DIR/private` and are NOT exposed by `/uploads`.
- Database backups are written to `DATA_DIR/backups`.
- Sessions use SQLite instead of Express's in-memory MemoryStore.
- HTTPS is expected at the hosting/reverse-proxy layer in production.

## Required production environment

Set:

- `NODE_ENV=production`
- `SESSION_SECRET` to a random secret of at least 32 characters.
- `ADMIN_PASSWORD` to the real GFL admin password.
- `DATA_DIR` to persistent storage.
- Gmail SMTP variables if status/registration emails are required.

The existing admin ID remains `Gflofficial`.

## Local test

1. Extract the project.
2. Copy `.env.example` to `.env`.
3. Set `NODE_ENV=development` for local testing, or use a strong production secret/password.
4. Run `npm install`.
5. Run `npm start`.
6. Open `http://localhost:3000`.
7. Health check: `http://localhost:3000/health`.

## Public hosting

The app needs persistent storage because the SQLite database and uploaded files must survive restarts/deploys. The included `render.yaml` uses a persistent disk mounted at `/var/data`.

For any provider, configure its equivalent persistent volume and map:

- `DATA_DIR` -> persistent directory
- `PUBLIC_UPLOADS_DIR` -> `<persistent>/uploads`
- `PRIVATE_UPLOADS_DIR` -> `<persistent>/private`
- `BACKUP_DIR` -> `<persistent>/backups`

Do not use an ephemeral-only filesystem for production data.

## Email

Create a Gmail App Password for the GFL sending account and set:

- `GFL_EMAIL_USER`
- `GFL_EMAIL_APP_PASSWORD`
- `GFL_EMAIL_FROM`

The website sends registration received, approval, correction and rejection messages when SMTP is configured.

## Player uploads

Player photo: JPG/JPEG, maximum 1 MB.
Player document: JPG/JPEG/PDF, maximum 1 MB.
Both are optional for new player registration. If a file is supplied, it is validated and stored in SQLite as well as on the persistent filesystem.

Player documents are private and are accessible only to the owning team session or GFL admin.

## Admin controls retained

- Team approval/correction/rejection
- Team edit/remove/password change
- Registration on/off
- Team/player editing
- Player photo/document replacement
- Player approve/reject/correction-required
- Player statistics
- Fixtures/results/live links
- Seasons, announcements and social/live settings
- Database backup

## Security hardening included

- Helmet security headers
- Compression
- Secure production cookies
- SQLite-backed sessions
- Login rate limiting
- Request size limits
- Upload size/type/signature checks
- Private player documents
- No public API exposure of player document filenames
- Graceful shutdown
- Health endpoint
- Production environment checks

## Important

A public deployment still needs a real domain/HTTPS and persistent storage. Hosting alone does not make the local database/files persistent; the provider must be configured with a persistent volume or external database/file storage.


### Player document policy (V13)
- Player photo: optional; JPG/JPEG up to 1 MB when provided.
- Player document: optional; JPG/JPEG/PDF up to 1 MB when provided.
- Document Number: optional text field. A player submission must provide either a document number or a document file.
- Admin and team correction/edit flows can update the document number and optionally replace/remove uploaded files.
