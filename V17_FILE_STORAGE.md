# GFL V17 – Permanent Player File Storage

V17 stores uploaded player photo/document bytes inside SQLite in addition to writing a disk copy. This removes the dependency on a web server serving the upload folder correctly.

## Important when upgrading from V16
1. Extract V17 into a new folder.
2. Copy your existing V16 `data` folder into the V17 folder, replacing V17's empty `data` folder.
3. Run `npm install` and `npm start`.
4. V17 automatically adds the new BLOB columns.
5. New uploads are stored in the database and on disk.

If an old V16 database points to a file that is no longer present on disk, the old file cannot be recovered; upload that player's photo/document again once in V17.

## File access
- Team/Admin photo: authenticated `/api/private/player/:id/photo`
- Team/Admin document: authenticated `/api/private/player/:id/document`
- Approved public player photo: `/api/public/player/:id/photo`
- ID card reads the stored photo bytes directly.

Documents remain private; they are not exposed through `/uploads`.
