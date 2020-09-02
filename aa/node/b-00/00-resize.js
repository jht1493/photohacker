
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/00-resize.jpg';

// Resize input photo
function phack_img(img) {
	img.resize(128, 128); 	// resize
	img.quality(60);    // set JPEG quality
	//img.greyscale();     // set greyscale

	phack_write( img );
	console.log('open '+infile);
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
