# GFL 2026 Public Launch Checklist

## Before deployment
- [ ] Create a strong `SESSION_SECRET` (32+ random characters).
- [ ] Set the real `ADMIN_PASSWORD` in hosting secrets.
- [ ] Set Gmail SMTP App Password variables.
- [ ] Configure persistent storage for `DATA_DIR`.
- [ ] Do not upload `.env` to GitHub.
- [ ] Run `npm install` and `npm run check`.
- [ ] Run `npm audit` and resolve any remaining issues before launch.

## Test locally
- [ ] Team registration creates a registration number.
- [ ] Admin sees the application.
- [ ] Approval creates the team login.
- [ ] Team can log in using registered Gmail + its chosen password.
- [ ] Player registration accepts optional photo and document; verify that supplied files are visible in team/admin profiles and the approved ID card.
- [ ] Invalid/oversized files are rejected.
- [ ] Admin can view private documents only after admin login.
- [ ] Team can view only its own player documents.
- [ ] Correction Required shows a reason.
- [ ] Team can edit/resubmit a corrected player.
- [ ] Admin can approve/reject/edit players.
- [ ] Fixtures and results update the standings.
- [ ] Live link works.
- [ ] Social links work.
- [ ] ID card QR verification works.
- [ ] Restart the server and confirm data/files remain.

## After deployment
- [ ] Open `/health` and confirm `ok: true`.
- [ ] Confirm HTTPS is active.
- [ ] Test registration from a phone on mobile data.
- [ ] Test team login from another device.
- [ ] Test player photo + document upload from another device.
- [ ] Test admin correction/approval.
- [ ] Create a database backup from the admin panel.
- [ ] Keep a separate backup copy of the persistent `uploads` and `private` directories.
