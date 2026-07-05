import fs from 'fs';
import path from 'path';

const dirs = [
  'src/features/kb/content',
  'src/features/kb/components',
  'src/features/kb/layouts',
  'src/shared/components',
  'src/shared/lib',
  'src/shared/types'
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Move content
if (fs.existsSync('src/content')) {
  const items = fs.readdirSync('src/content');
  for (const item of items) {
    fs.renameSync(path.join('src/content', item), path.join('src/features/kb/content', item));
  }
}

// Move layouts
if (fs.existsSync('src/layouts')) {
  const items = fs.readdirSync('src/layouts');
  for (const item of items) {
    fs.renameSync(path.join('src/layouts', item), path.join('src/features/kb/layouts', item));
  }
}

// Move lib (if exists)
if (fs.existsSync('src/lib')) {
  const items = fs.readdirSync('src/lib');
  for (const item of items) {
    fs.renameSync(path.join('src/lib', item), path.join('src/shared/lib', item));
  }
}

// Move types (if exists)
if (fs.existsSync('src/types')) {
  const items = fs.readdirSync('src/types');
  for (const item of items) {
    fs.renameSync(path.join('src/types', item), path.join('src/shared/types', item));
  }
}

const sharedComponents = ['Callout.tsx', 'CompareTable.tsx', 'ConceptCard.tsx', 'KeyTakeaways.tsx', 'StepFlow.tsx', 'Term.tsx', 'AnnotatedChart.tsx'];

// Move components
if (fs.existsSync('src/components')) {
  const items = fs.readdirSync('src/components');
  for (const item of items) {
    if (sharedComponents.includes(item)) {
      fs.renameSync(path.join('src/components', item), path.join('src/shared/components', item));
    } else {
      fs.renameSync(path.join('src/components', item), path.join('src/features/kb/components', item));
    }
  }
}

function replaceInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      replaceInDir(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.mdx')) {
      let content = fs.readFileSync(p, 'utf-8');
      
      // Update App.tsx
      if (item === 'App.tsx') {
        content = content.replace(/from '\.\/layouts\//g, "from './features/kb/layouts/");
        content = content.replace(/from '\.\/content\//g, "from './features/kb/content/");
        content = content.replace(/from '\.\/components\//g, (match, offset, str) => {
          const componentName = str.slice(offset + match.length).split("'")[0] + '.tsx';
          if (sharedComponents.includes(componentName)) {
            return "from './shared/components/";
          } else {
            return "from './features/kb/components/";
          }
        });
      }
      
      // Update layouts
      if (dir.includes('layouts')) {
        content = content.replace(/from '\.\.\/components\//g, (match, offset, str) => {
          const componentName = str.slice(offset + match.length).split("'")[0] + '.tsx';
          if (sharedComponents.includes(componentName)) {
            return "from '../../../shared/components/";
          } else {
            return "from '../components/";
          }
        });
        content = content.replace(/from '\.\.\/content\//g, "from '../content/");
      }
      
      // Update MDX
      if (p.endsWith('.mdx')) {
        content = content.replace(/from '\.\.\/\.\.\/components\//g, (match, offset, str) => {
          const componentName = str.slice(offset + match.length).split("'")[0] + '.tsx';
          if (sharedComponents.includes(componentName)) {
            return "from '../../../../shared/components/";
          } else {
            return "from '../../components/";
          }
        });
      }

      // Update KB components
      if (dir.includes('features/kb/components')) {
        content = content.replace(/from '\.\//g, (match, offset, str) => {
          // If a component imports another component in the same folder
          const componentName = str.slice(offset + match.length).split("'")[0] + '.tsx';
          if (sharedComponents.includes(componentName)) {
            return "from '../../../shared/components/";
          } else {
            return "from './";
          }
        });
      }

      fs.writeFileSync(p, content, 'utf-8');
    }
  }
}

replaceInDir('src');

// Remove empty old dirs
['src/content', 'src/components', 'src/layouts', 'src/lib', 'src/types'].forEach(d => {
  if (fs.existsSync(d) && fs.readdirSync(d).length === 0) {
    fs.rmdirSync(d);
  }
});
