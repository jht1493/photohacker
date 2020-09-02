
var jimp = require("jimp");

var infile = '../img/JHT-CU.png';
var outfile = '../z-out/09-check.jpg';

// Pixel checker pattern
function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);

	var ngrid = 32;
	var xstep = Math.floor(width / ngrid);
	//var ystep = Math.floor(height / ngrid);
	var ystep = xstep;
	var side = 0;
	//console.log(' xstep='+xstep+' ystep='+ystep);

	for (var gy = 0; gy < height; gy += ystep, side ^= 1) {
		for (var gx = 0, count = 0; gx < width; gx += xstep, count++) {
			if ((count&1) == side){
				var pix = img.getPixelColor(gx, gy);		// Pickup color
				var pimg = new jimp(xstep, ystep, pix);
				img.blit( pimg, gx, gy);
			}
		}
	}

	phack_write( img );
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
