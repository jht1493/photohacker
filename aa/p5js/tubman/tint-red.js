let img;

function preload() {
  img = loadImage('assets/56175u-3x4.png');
}

function setup() {
  createCanvas(1264, 1685);
  pixelDensity(1);
  let d = pixelDensity();
  console.log('d=' + d);

  console.log('img.width=' + img.width + ' img.height=' + img.height);

  image(img, 0, 0, img.width, img.height);

  // let halfImage = 4 * (width * d) * (height * d / 2);
  loadPixels();

  console.log('pixels.length=' + pixels.length);
  // const nbytes = pixels.length / 2;
  const nbytes = pixels.length;
  for (let i = 0; i < nbytes; i += 4) {
    const sum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    pixels[i] = sum;
    pixels[i + 1] = 0;
    pixels[i + 2] = 0;
  }

  updatePixels();

  save('56175u-3x4-red.png');
}
