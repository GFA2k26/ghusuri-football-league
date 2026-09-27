/*
  Optional one-time migration from the V11 folder layout.
  Run from the V12 folder with the old V11 folder beside it:
    node migrate-v11.js "../GFL_2026_FINAL_FIXED_V11"
*/
require('dotenv').config();
const fs=require('fs');
const path=require('path');
const Database=require('better-sqlite3');
const target=__dirname;
const old=path.resolve(process.argv[2]||'../GFL_2026_FINAL_FIXED_V11');
if(!fs.existsSync(old)) throw new Error('Old V11 folder not found: '+old);
const oldDb=path.join(old,'data','gfl.sqlite');
const oldUploads=path.join(old,'uploads');
if(!fs.existsSync(oldDb)) throw new Error('Old V11 database not found: '+oldDb);
const targetData=path.join(target,'data');
fs.mkdirSync(path.join(targetData,'uploads'),{recursive:true});
fs.mkdirSync(path.join(targetData,'private'),{recursive:true});
const source=new Database(oldDb,{readonly:true});
source.backup(path.join(targetData,'gfl.sqlite'));
source.close();
const dest=new Database(path.join(targetData,'gfl.sqlite'));
const privateNames=new Set();
for(const row of dest.prepare('SELECT document FROM players WHERE document IS NOT NULL').all()) privateNames.add(row.document);
for(const row of dest.prepare('SELECT document FROM team_applications WHERE document IS NOT NULL').all()) privateNames.add(row.document);
if(fs.existsSync(oldUploads)){
  for(const name of fs.readdirSync(oldUploads)){
    const from=path.join(oldUploads,name);
    if(!fs.statSync(from).isFile()) continue;
    const to=path.join(targetData,privateNames.has(name)?'private':'uploads',path.basename(name));
    fs.copyFileSync(from,to);
  }
}
console.log('Migration complete. Review data/ and uploads before going public.');
dest.close();
