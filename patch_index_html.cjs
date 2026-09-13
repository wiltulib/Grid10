const fs = require('fs');
let file = fs.readFileSync('index.html', 'utf8');

file = file.replace(
  'style="background-color: #F8F7F4; color: #111113;"',
  'style="background-color: var(--bg, #F8F7F4); color: var(--ink, #111113);"'
);

const earlyScript = `
    <script>
      (function() {
        try {
          if (localStorage.getItem('1010_block_darkmode') === 'true') {
            document.documentElement.classList.add('dark');
          }
        } catch (_) {}
      })();
    </script>
`;

file = file.replace(
  '    <link rel="preconnect" href="https://fonts.googleapis.com" />',
  earlyScript + '    <link rel="preconnect" href="https://fonts.googleapis.com" />'
);

fs.writeFileSync('index.html', file);
