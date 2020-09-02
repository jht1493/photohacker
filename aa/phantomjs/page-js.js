function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();

  console.log('width=' + width + ' height=' + height);

  var cx = width / 2;
  var cy = height / 2;
  var radius = width / 2.3;
  var hue;
  var sat;
  var i = 0;
  var x;
  var y;
  var rx;
  var ry;
  var d;
  var f;
  var g;
  var u;
  var v;
  var w;

  for (y = 0; y < height; y = y + 1) {
    for (x = 0; x < width; x = x + 1, i = i + 4) {
      rx = x - cx;
      ry = y - cy;
      d = rx * rx + ry * ry;
      hue = (6 * (Math.atan2(ry, rx) + Math.PI)) / (2 * Math.PI);
      sat = Math.sqrt(d) / radius;
      g = Math.floor(hue);
      f = hue - g;
      u = 255 * (1 - sat);
      v = 255 * (1 - sat * f);
      w = 255 * (1 - sat * (1 - f));
      pixels[i] = [255, v, u, u, w, 255, 255][g];
      pixels[i + 1] = [w, 255, 255, v, u, u, w][g];
      pixels[i + 2] = [u, u, w, 255, 255, v, u][g];
      pixels[i + 3] = 255;
    }
  }

  updatePixels();

  console.log('setup done');
}
