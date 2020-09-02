
var jimp = require("jimp");

var infile = '../img/JHT-CU.png';
var infile2 = '../img/06-pix-jht.png';
var outfile = '../z-out/08-combo.jpg';

// Combine two photos
function phack_img(img, img2) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);
	console.log(infile2+' width='+img2.bitmap.width+' height='+img2.bitmap.height);

	var offset = 50;
	var x = Math.floor(width/2) - offset;
	var y = 0;
	var srcx = x;
	var srcy = 0;
	var srcw = width - srcx;
	var srch = height;
	img.blit( img2, x, y, srcx, srcy, srcw, srch);

	phack_write( img );
	console.log('open '+outfile);
}

function phack_run() {
	var p1 = jimp.read(infile);
	var p2 = jimp.read(infile2);
	Promise.all([p1, p2]).then(function (result) {
		phack_img(result[0], result[1])
	}).catch(function (err) {
		console.log(err);
	});
}
function phack_write(img) {
	img.write(outfile, function (err) { if (err) throw err; });
}
phack_run();

// image.blit( src, x, y[, srcx, srcy, srcw, srch] );
// // blit the image with another Jimp image at x, y, optionally cropped.
