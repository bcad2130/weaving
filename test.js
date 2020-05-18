const Jimp = require('jimp');


// new Jimp(256, 256, (err, image) => {
//   // this image is 256 x 256, every pixel is set to 0x00000000
//     image.write('test.png', (err) => {
//       if (err) throw err;
//     });
// });

let imageData = [
  [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],
  [ 0xFF0000FF, 0x00FF00FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],
  [ 0xFF0000FF, 0x00FF00FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],  
  [ 0xFF0000FF, 0x00FF00FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],
  [ 0xFF0000FF, 0xFF0000FF, 0x0000FFFF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ]
];


let image = new Jimp(5, 5, function (err, image) {
  if (err) throw err;

  imageData.forEach((row, y) => {
    row.forEach((color, x) => {
      image.setPixelColor(color, x, y);
    });
  });

  image.write('test.png', (err) => {
    if (err) throw err;
  });
});