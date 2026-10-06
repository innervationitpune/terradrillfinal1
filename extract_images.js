const fs = require('fs');
const html = fs.readFileSync('equipment.html', 'utf8');
const matches = html.match(/\/images\/[a-zA-Z0-9_\-\.\/]+/g);
if (matches) {
  const unique = [...new Set(matches)];
  unique.forEach(url => console.log(url));
} else {
  console.log("No images found");
}
