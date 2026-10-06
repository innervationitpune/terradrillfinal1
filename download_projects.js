const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = [
  '/clients/private/reliance.png',
  '/clients/private/tata-vodafone.png',
  '/clients/private/airtel.png',
  '/clients/private/tata.png',
  '/clients/private/bsnl.png',
  '/clients/private/gail.png',
  '/clients/private/iocl.gif',
  '/clients/private/ss-sathe.png',
  '/clients/government/midc.png',
  '/clients/private/serum.png',
  '/clients/private/mjp.png',
  '/clients/private/lnt.png',
  '/clients/government/kmda.png',
  '/clients/private/vodafone.png',
  '/clients/private/jio.png',
  '/clients/private/hinduja.png',
  '/clients/private/ongc.png',
  '/images/projects/p13.jpg'
];

async function download() {
  for (const item of logos) {
    const imgUrl = `https://terradrill.netlify.app${item}`;
    // keep folder structure inside public
    const destDir = path.join(__dirname, 'public', path.dirname(item));
    if (!fs.existsSync(destDir)){
        fs.mkdirSync(destDir, { recursive: true });
    }
    const dest = path.join(__dirname, 'public', item);
    
    console.log(`Downloading ${imgUrl} to ${dest}`);
    await new Promise((resolve, reject) => {
      https.get(imgUrl, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Failed to download ${imgUrl}: ${res.statusCode}`);
          resolve();
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${imgUrl}: ${err.message}`);
        resolve();
      });
    });
  }
  console.log("Done downloading projects images.");
}

download();
