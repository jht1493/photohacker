//
const fs = require('fs-extra');
const path = require('path');
var jimp = require('jimp');

const in_dir = '/Volumes/GSPOT/jht-g/projects/webdb/img/';
const ou_dir = '/Volumes/GSPOT/jht-g/projects/webdb/img-num/';
let a_font;

function phack_run() {
  jimp.loadFont(jimp.FONT_SANS_64_BLACK).then((result) => {
    a_font = result;
    phack_next(0);
  });
}

function phack_next(index) {
  if (index >= files.length) {
    return;
  }
  const num = files[index];
  const in_path = path.resolve(in_dir, num);
  console.log('in_path', in_path);
  jimp
    .read(in_path)
    .then((img) => {
      phack_img(img, num, index);
    })
    .catch((err) => {
      console.log('err', err);
    });
}

// Draw one band based on color in center of photo
function phack_img(img, num, index) {
  // console.log('phack_write img', img);
  console.log('phack_img num, index', num, index);
  var width = img.bitmap.width;
  var height = img.bitmap.height;

  var cwidth = 120; // Width of print box
  var cheight = 64; // Height of print box
  var cimg = new jimp(cwidth, cheight, 0xffffffff); // White background
  var cx = 0;
  var cy = 0;
  const msg = path.parse(num).name;
  cimg.print(a_font, cx, cy, msg);

  let cap_x = (width - cwidth) / 2;
  let cap_y = height - cheight;
  img.blit(cimg, cap_x, cap_y);

  phack_write(img, num, index);
}

function phack_write(img, num, index) {
  console.log('phack_write num, index', num, index);
  const ou_path = path.resolve(ou_dir, num);
  img
    .writeAsync(ou_path)
    .then((result) => {
      console.log('phack_write done ');
      console.log('open ' + ou_path);
      // console.log('img.image result', result);
    })
    .catch((err) => {
      console.log('err', err);
    });
  phack_next(index + 1);
}

// var files = fs.readdirSync(in_dir).filter((item) => !exclude(item));
const files = ['149.jpg'];
// console.log('files', files);
console.log('files length', files.length);

phack_run();

// console.log('files.length', files.length, 'fcount', fcount);

function exclude(fname) {
  if (fname.substr(0, 1) == '.') return 1;
  if (fname === 'system') return 1;
  return 0;
}
