const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/**/*.tsx');
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
