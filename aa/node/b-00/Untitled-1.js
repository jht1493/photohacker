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
