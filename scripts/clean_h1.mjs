import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, (match) => {
    if (file.includes('PrivacyPolicyPage')) {
      return match.replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>');
    }
    if (match.includes('sr-only')) {
      return ''; 
    }
    return match;
  });

  if(content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
