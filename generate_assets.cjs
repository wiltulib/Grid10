const sharp = require('sharp');
const fs = require('fs');

async function createAssets() {
  const iconExists = fs.existsSync('public/icon.png');
  const baseImage = iconExists ? 'public/icon.png' : 'public/icon.svg';

  try {
    // 1. List Thumbnail (usually square or slightly wide, let's make it 600x600 for high quality)
    await sharp(baseImage)
      .resize(600, 600, {
        fit: 'contain',
        background: { r: 24, g: 24, b: 27, alpha: 1 } // #18181b
      })
      .toFile('public/list_thumbnail.png');
    console.log('Created list_thumbnail.png (600x600)');

    // 2. Cover / Banner (1280x720) - just in case we need to recreate it with the new icon
    await sharp(baseImage)
      .resize(1280, 720, {
        fit: 'contain',
        background: { r: 24, g: 24, b: 27, alpha: 1 }
      })
      .toFile('public/cover.png');
    console.log('Created cover.png (1280x720)');

    // 3. Screenshots (16:9 ratio, typically 1920x1080)
    // We will generate a few placeholder screenshots using the icon on a nice background
    for (let i = 1; i <= 3; i++) {
        await sharp(baseImage)
          .resize(1920, 1080, {
            fit: 'contain',
            background: { r: 24 + (i*10), g: 24 + (i*10), b: 27 + (i*15), alpha: 1 } // slightly different dark backgrounds
          })
          .toFile(`public/screenshot_${i}.png`);
        console.log(`Created screenshot_${i}.png (1920x1080)`);
    }

  } catch (err) {
    console.error('Error generating assets:', err);
  }
}

createAssets();
