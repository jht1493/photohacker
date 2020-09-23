let img;
const level = 150;
const iwidth = 1264;
const iheight = 1685;
const third = iwidth / 3;
const third2 = third * 2;

function preload() {
  img = loadImage('assets/56175u-3x4.png');
}

function setup() {
  createCanvas(iwidth, iheight);
  pixelDensity(1);
  console.log('img.width=' + img.width + ' img.height=' + img.height);

  image(img, 0, 0, img.width, img.height);

  loadPixels();

  console.log('pixels.length=' + pixels.length);
  const nbytes = pixels.length;
  let xindex = 0;
  let yindex = 0;
  for (let i = 0; i < nbytes; i += 4) {
    const sum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    if (sum < level) {
      // pixels[i] = 255 - sum;
      if (xindex < third) {
        pixels[i] = 0;
        pixels[i + 1] = sum;
        pixels[i + 2] = 0;
      } else if (xindex < third2) {
        pixels[i] = sum;
        pixels[i + 1] = sum;
        pixels[i + 2] = 0;
      } else {
        pixels[i] = sum;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
      }
    }
    xindex++;
    if (xindex >= iwidth) {
      xindex = 0;
      yindex++;
    }
  }
  updatePixels();

  save('56175u-3x4-limit-gbr.png');
}
