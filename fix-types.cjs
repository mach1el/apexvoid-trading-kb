const fs = require('fs');
let content = fs.readFileSync('src/shared/components/AnnotatedChart.tsx', 'utf8');

const importStatement = `import type { ChartData } from '../../features/kb/content/chartRegistry';\n\n`;
if (!content.includes('import type { ChartData }')) {
  content = importStatement + content;
}

// Add explicit types to maps to be absolutely sure
content = content.replace(/\.map\(\(an, idx\)/g, '.map((an: any, idx: number)');
content = content.replace(/\.map\(\(pt, j\)/g, '.map((pt: any, j: number)');
content = content.replace(/\.map\(\(pt, i\)/g, '.map((pt: any, i: number)');
content = content.replace(/\.map\(\(v, i\)/g, '.map((v: any, i: number)');
content = content.replace(/\.map\(\(r, i\)/g, '.map((r: any, i: number)');
content = content.replace(/\(a, b\)/g, '(a: any, b: any)');

fs.writeFileSync('src/shared/components/AnnotatedChart.tsx', content, 'utf8');
