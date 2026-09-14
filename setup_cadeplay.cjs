const fs = require('fs');
const https = require('https');
const token = '41|cdp_iOe9truyw3cPJMRX7ZbJUB4WzZjrHlDKoo4m3DsW614bf7b7';

// Write initial token (Step 4)
let env = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
env = env.replace(/^CADEPLAY_TOKEN=.*$/gm, '');
fs.writeFileSync('.env', env.trim() + '\nCADEPLAY_TOKEN=' + token + '\n');

// Fetch long-lived token (Step 5)
const req = https.request('https://cadeplay.com/v1/tokens', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('step5_status.txt', res.statusCode.toString());
    if (res.statusCode >= 200 && res.statusCode < 300) {
       try {
           const parsed = JSON.parse(data);
           if (parsed && parsed.value) {
              let updatedEnv = fs.readFileSync('.env', 'utf8').replace(/^CADEPLAY_TOKEN=.*$/gm, '');
              fs.writeFileSync('.env', updatedEnv.trim() + '\nCADEPLAY_TOKEN=' + parsed.value + '\n');
              fs.writeFileSync('step5_success.txt', 'true');
           }
       } catch (e) {
           fs.writeFileSync('step5_status.txt', 'JSON parse error');
       }
    }
  });
});
req.on('error', (e) => fs.writeFileSync('step5_status.txt', 'error: ' + e.message));
req.write(JSON.stringify({
   name: 'cli',
   scopes: ['account:read', 'account:write', 'games:read', 'games:write', 'builds:write', 'uploads:write', 'stats:read', 'webhooks:manage']
}));
req.end();
