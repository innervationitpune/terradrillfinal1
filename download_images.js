const fs = require('fs');
const https = require('https');
const path = require('path');

const baseUrl = 'https://trayana-infratech.netlify.app';
const images = [
  '/images/equipment/hdd-hero.jpeg',
];
for(let i = 1; i <= 21; i++) images.push(`/images/gallery/g${i}.jpeg`);

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function run() {
  for (const img of images) {
    const dest = path.join(__dirname, 'public', img);
    console.log('Downloading', img);
    await download(baseUrl + img, dest).catch(e => console.error(e));
  }
  console.log('Done');
}
run();
