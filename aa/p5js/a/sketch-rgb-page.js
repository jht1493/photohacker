const scale = 5;
let a_ = {
  rstart: 1,
  ratio: 1,
  max: 10,
  delta: 0.1,
  margin: 30,
};

function setup() {
  // createCanvas(300 * scale, 400 * scale);
  // createCanvas(400 * scale, 300 * scale);
  pixelDensity(1);
  createButton('Save').mousePressed(function () {
    save('color-page-' + scale + '.png');
  });
  createButton('Render').mousePressed(function () {
    render_color();
  });
  createButton('Size').mousePressed(function () {
    resize_render();
  });
  createSpan().id('ix');
  createSpan().id('iy');
  createSpan().id('ir');
  createSpan().id('ifps');
  // frameRate(5);

  resize_render();
}

function draw() {
  // a_.ratio += a_.delta;
  // if (a_.ratio > a_.max) a_.ratio = a_.rstart;
  // a_.ratio = 0.3 + (1 + sin(frameCount * 0.04));
  a_.ratio = 1.5;
  render_color();
  select('#ix').html('[width=' + width + '] ');
  select('#iy').html('[height=' + height + '] ');
  select('#ir').html('[ratio=' + round(a_.ratio, 2) + '] ');
  select('#ifps').html('[fps=' + round(frameRate(), 2) + '] ');
}

function resize_render() {
  resizeCanvas(windowWidth, windowHeight - a_.margin);
  render_color();
}

function render_color() {
  loadPixels();
  // console.log('width=' + width + ' height=' + height);
  var cx = width / 2;
  var cy = height / 2;
  var radius = width / a_.ratio;
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
  console.log('render_color done');
}

// From: https://github.com/ariya/phantomjs/blob/master/examples/colorwheel.js
