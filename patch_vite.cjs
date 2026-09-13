const fs = require('fs');
let file = fs.readFileSync('vite.config.ts', 'utf8');

file = file.replace(
  "export default defineConfig(() => {\n  return {\n    plugins",
  "export default defineConfig(() => {\n  return {\n    base: './',\n    plugins"
);

fs.writeFileSync('vite.config.ts', file);
