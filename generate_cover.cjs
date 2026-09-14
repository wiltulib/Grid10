const sharp = require('sharp');
sharp('public/icon.svg')
  .resize(1280, 720, {
    fit: 'contain',
    background: { r: 24, g: 24, b: 27, alpha: 1 } // #18181b
  })
  .toFile('public/cover.png')
  .then(() => console.log('Cover generated'))
  .catch(err => console.error(err));
