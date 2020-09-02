//
const fs = require('fs-extra');
const path = require('path');

const wpath = '/Volumes/GSPOT/jht-g/PEACH/webdb/-images';
const opath = '/Volumes/GSPOT/jht-g/projects/webdb/img';
let fcount = 0;

// visit_files_at_path(opath);

var files = fs.readdirSync(wpath);

for (const fname of files) {
  console.log('fname', fname);
  if (exclude(fname)) continue;
  fcount++;
  const src = path.resolve(wpath, fname, 'full.jpg');
  const nfame = fname + '.jpg';
  const dest = path.resolve(opath, nfame);
  fs.copyFileSync(src, dest);
}

console.log('files.length', files.length, 'fcount', fcount);

function visit_files_at_path(rpath) {
  var filenames = fs.readdirSync(rpath);
  for (var filename of filenames) {
    if (exclude(filename)) continue;
    var fullpath = rpath + '/' + filename;
    var stat = fs.statSync(fullpath);
    if (stat.isDirectory()) {
      var dir_filenames = fs.readdirSync(fullpath);
      for (var dname of dir_filenames) {
        if (exclude(dname)) continue;
        filenames.push(filename + '/' + dname);
      }
    } else {
      if (fullpath.endsWith('.md')) {
        console.log(filename);
        visit_file(fullpath);
        fcount++;
      }
      // func({ path: fullpath, filename: filename });
    }
  }
}

function visit_file(inpath) {
  console.log('visit_file', inpath);
}

function exclude(fname) {
  if (fname.substr(0, 1) == '.') return 1;
  if (fname === 'system') return 1;
  return 0;
}
