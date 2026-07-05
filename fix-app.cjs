const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/import\('\.\/content\//g, "import('./features/kb/content/");
fs.writeFileSync('src/App.tsx', content, 'utf-8');
