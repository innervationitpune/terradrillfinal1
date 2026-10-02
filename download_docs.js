const fs = require('fs');
const https = require('https');
const path = require('path');

const baseUrl = 'https://trayana-infratech.netlify.app';
const docs = [
  '/documents/1-DRG._NO._801_R5_Chandani_chowk_layout_plan_22.09.2017.pdf',
  '/documents/LINE_NO-07_MAIN_SEWER_LINE_ALONG_HADAPSAR_NALLA_06-02-2023-4.pdf',
  '/documents/Luni_River_Crossing_Drawing.pdf',
  '/documents/L_SECTION_PLAN_OF_RIVER_CROSSING_TUNNEL_AT_RAVET_IN_PCMC.PUNE-Model.pdf',
  '/documents/BHUSAWAL_-_PWL_-_FDN_-_02.pdf',
  '/documents/CR-PUNE-2024-WL-10.pdf',
  '/documents/pimpri_chinchava_work_done_certi.pdf',
  '/documents/127.1001.02_R3_GA_DRAWING_AGAINST_JOINT_NOTE_FOR_APPROVAL_1.pdf'
];

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
  for (const doc of docs) {
    const dest = path.join(__dirname, 'public', doc);
    console.log('Downloading', doc);
    await download(baseUrl + doc, dest).catch(e => console.error(e));
  }
  console.log('Done');
}
run();
