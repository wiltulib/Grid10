const sharp = require('sharp');
const fs = require('fs');

async function createAssets() {
  const iconExists = fs.existsSync('public/icon.png');
  const baseImage = iconExists ? 'public/icon.png' : 'public/icon.svg';

  try {
    // 1. List Thumbnail (600x600)
    await sharp(baseImage)
      .resize(600, 600, {
        fit: 'contain',
        background: { r: 248, g: 247, b: 244, alpha: 1 } // #F8F7F4
      })
      .toFile('public/list_thumbnail.png');
    console.log('Created list_thumbnail.png (600x600)');

    // 2. Cover / Banner (1280x720)
    await sharp(baseImage)
      .resize(1280, 720, {
        fit: 'contain',
        background: { r: 248, g: 247, b: 244, alpha: 1 } // #F8F7F4
      })
      .toFile('public/cover.png');
    console.log('Created cover.png (1280x720)');

    // 3. Screenshots (1920x1080)
    for (let i = 1; i <= 3; i++) {
        await sharp(baseImage)
          .resize(1920, 1080, {
            fit: 'contain',
            background: { r: 248, g: 247, b: 244, alpha: 1 } // #F8F7F4
          })
          .toFile(`public/screenshot_${i}.png`);
        console.log(`Created screenshot_${i}.png (1920x1080)`);
    }
  } catch (err) {
    console.error('Error generating assets:', err);
  }
}

createAssets();
