'use strict';
var page = require('webpage').create();
var dpi = 300;
var scale = 1;
var page_width = Math.floor(8.5 * dpi * scale);
var page_height = Math.floor(11 * dpi * scale);
var outfile = 'color-page-1-rad-3.png';
var rad = 3;
page.viewportSize = { width: page_width, height: page_height };
page.content = '<html><body><canvas id="surface"></canvas></body></html>';
page.evaluate(function () {
  var el = document.getElementById('surface'),
    context = el.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    cx = width / 2,
    cy = height / 2,
    radius = width / 3,
    imageData,
    pixels,
    hue,
    sat,
    value,
    i = 0,
    x,
    y,
    rx,
    ry,
    d,
    f,
    g,
    p,
    u,
    v,
    w,
    rgb;

  el.width = width;
  el.height = height;
  imageData = context.createImageData(width, height);
  pixels = imageData.data;

  for (y = 0; y < height; y = y + 1) {
    for (x = 0; x < width; x = x + 1, i = i + 4) {
      rx = x - cx;
      ry = y - cy;
      d = rx * rx + ry * ry;
      //if (d < radius * radius) {
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
      //}
    }
  }

  context.putImageData(imageData, 0, 0);
  document.body.style.backgroundColor = 'white';
  document.body.style.margin = '0px';
});

console.log('outfile=' + outfile);

page.render(outfile);

phantom.exit();
