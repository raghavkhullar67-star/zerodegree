import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/text-\[9px\]/g, 'text-[10px]');
    content = content.replace(/text-\[10px\]/g, 'text-xs');
    
    // Contrast Bumps
    content = content.replace(/text-gray-500/g, 'text-gray-400');
    content = content.replace(/text-slate-500/g, 'text-slate-400');
    
    // Further bump elements that were already text-xs and incredibly low contrast
    content = content.replace(/text-gray-600/g, 'text-gray-400');
    content = content.replace(/text-slate-600/g, 'text-slate-400');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
