//
const fs = require('fs-extra');
const path = require('path');

const wpath = '/Volumes/GSPOT/jht-g/PEACH/webdb/-images';
const opath = '/Volumes/GSPOT/jht-g/projects/webdb/img';
let fcount = 0;
const start_index = 531;

var files = fs.readdirSync(wpath);

let index = 0;
for (const fname of files) {
  index += 1;
  if (exclude(fname)) continue;
  if (index < start_index) continue;
  console.log('fname', fname);
  fcount++;
  const src = path.resolve(wpath, fname, 'full.jpg');
  const nfame = fname + '.jpg';
  const dest = path.resolve(opath, nfame);
  fs.copyFileSync(src, dest);
}

console.log('files.length', files.length, 'fcount', fcount);

function exclude(fname) {
  if (fname.substr(0, 1) == '.') return 1;
  if (fname === 'system') return 1;
  return 0;
}
