var jimp = require('jimp');

// '/Volumes/GSPOT/jht-g/DICE-archived/2020-06-03-freedom-fighters/frederick-douglass/lib-of-con/56175u-3x4.png';
const dir =
  '/Volumes/GSPOT/jht-g/DICE-archived/2020-06-03-freedom-fighters/frederick-douglass/lib-of-con/';
var infile = dir + '56175u-3x4.png';
var outfile = dir + '56175u-3x4-poster/fd';

function app() {
  jimp.read(infile, function (err, img) {
    if (err) throw err;
    var width = img.bitmap.width;
    var height = img.bitmap.height;
    console.log(infile + ' img width=' + width + ' height=' + height);
    var scale = 4;
    var srcw = Math.round(width / scale);
    var srch = Math.round(height / scale);
    var srcx = 0;
    var srcy = 0;
    var x = 0;
    var y = 0;
    var imgout = new jimp(srcw, srch);
    var flipout = new jimp(srcw, srch);
    var index = 0;
    for (; ; index++) {
      imgout.blit(img, x, y, srcx, srcy, srcw, srch);
      flipout.blit(img, x, y, srcx, srcy, srcw, srch);
      var file = outfile + '-' + pad(index * 10, 3) + '.png';
      imgout.write(file, function (err) {
        if (err) console.log(err);
      });
      console.log('open ' + file);
      flipout.flip(true, false);
      var file2 = outfile + '-' + pad(index * 10 + 1, 3) + '.png';
      flipout.write(file2, function (err) {
        if (err) console.log(err);
      });
      srcx += srcw;
      if (srcx >= width) {
        srcx = 0;
        srcy += srch;
        if (srcy >= height) break;
      }
    }
  });
}

app();

// image.blit( src, x, y[, srcx, srcy, srcw, srch] );
// var image = new jimp(256, 256)

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
