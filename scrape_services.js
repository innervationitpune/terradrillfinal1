const fs = require('fs');
const https = require('https');
const path = require('path');

async function scrapeServices() {
  const url = 'https://terradrill.netlify.app/services';
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', async () => {
      // Find all image URLs
      const regex = /url\(\/images\/services\/([^\)]+)\)/g;
      let match;
      const images = [];
      while ((match = regex.exec(data)) !== null) {
        images.push(match[1]);
      }
      
      const imgRegex2 = /src="\/images\/services\/([^"]+)"/g;
      while ((match = imgRegex2.exec(data)) !== null) {
        images.push(match[1]);
      }

      // Unique images
      const uniqueImages = [...new Set(images)];
      console.log("Found images:", uniqueImages);

      // Download them
      const dir = path.join(__dirname, 'public', 'images', 'services');
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
      }

      for (const img of uniqueImages) {
        const imgUrl = `https://terradrill.netlify.app/images/services/${img}`;
        const dest = path.join(dir, img);
        console.log(`Downloading ${imgUrl} to ${dest}`);
        await new Promise((resolve) => {
          https.get(imgUrl, (res) => {
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          });
        });
      }
      console.log("Done downloading images.");
    });
  });
}

scrapeServices();
