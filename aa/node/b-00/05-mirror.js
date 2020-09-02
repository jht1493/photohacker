
var jimp = require("jimp");

var infile = '../img/JHT-CU.png';
var outfile = '../z-out/05-mirror.png';

function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' img width='+width+' height='+height);
	var offset = 100;
	var fillpix = img.getPixelColor(0, 0);
	for (var y = 0; y < height; y++) {
		var mid = Math.floor(width/2) - offset/2 ;
		for (var x = 0; x < mid; x++) {
			var pix = img.getPixelColor(x, y);
			img.setPixelColor(pix, width - x - offset, y);
		}
		for (var x2 = width - 0 - offset; x2 < width; x2++) {
			img.setPixelColor(fillpix, x2, y); // Fill right remainder with fillpix
		}
	}

	phack_write(img);
	console.log('open '+outfile);
}

function phack_run() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		phack_img(img);
	});
}
function phack_write(img) {
	img.write(outfile, function (err) { if (err) throw err; });
}
phack_run();

// image.getPixelColor(x, y);      // returns the colour of that pixel e.g. 0xFFFFFFFF
// image.setPixelColor(hex, x, y); // sets the colour of that pixel
