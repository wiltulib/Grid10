const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');

// Serve the dist directory
const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;
  if (pathname === './') pathname = './index.html';
  pathname = path.join(__dirname, 'dist', pathname);

  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}).listen(8080);

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Create output folder if it doesn't exist
    if (!fs.existsSync('public/screenshots')) {
      fs.mkdirSync('public/screenshots');
    }

    console.log('Loading game...');
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    
    console.log('Taking home screen screenshot...');
    await page.screenshot({ path: 'public/screenshot_1.png' });

    // Initialize recorder
    const recorder = new PuppeteerScreenRecorder(page, {
      fps: 30,
      videoFrame: { width: 1920, height: 1080 },
      videoCodec: 'libx264',
      videoBitrate: 1000,
      recordDurationLimit: 15 // seconds
    });

    console.log('Starting video recording...');
    await recorder.start('public/trailer.mp4');

    // Start game
    console.log('Starting game...');
    await page.click('#btn-home-start');
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('Taking gameplay screenshot 1...');
    await page.screenshot({ path: 'public/screenshot_2.png' });
    
    // Wait some time to record gameplay
    await new Promise(r => setTimeout(r, 3000));
    
    console.log('Taking gameplay screenshot 2...');
    await page.screenshot({ path: 'public/screenshot_3.png' });
    
    await new Promise(r => setTimeout(r, 5000)); // wait for trailer

    console.log('Stopping recording...');
    await recorder.stop();
    await browser.close();
    server.close();
    console.log('Done!');
  } catch(e) {
    console.error(e);
    server.close();
  }
})();
