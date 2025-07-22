import puppeteer from 'puppeteer';
import { chapters } from './data.js';
import fs from 'fs';

async function fetchLinkedInPhotos() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const chapter of chapters) {
    for (const member of chapter.members) {
      if (!member.linkedin) continue;

      try {
        await page.goto(member.linkedin, { waitUntil: 'networkidle2' });

        // Attempt to grab the profile picture
        const imageUrl = await page.evaluate(() => {
          const img = document.querySelector('.pv-top-card-profile-picture__image');
          return img ? img.src : null;
        });

        if (imageUrl) {
          member.imageUrl = imageUrl;
          console.log(`Fetched image for ${member.name}: ${imageUrl}`);
        } else {
          console.log(`No image found for ${member.name}`);
        }
      } catch (err) {
        console.error(`Failed to fetch for ${member.name}:`, err);
      }
    }
  }

  await browser.close();

  // Write updated data to a new file
  fs.writeFileSync(
    './updatedChapters.json',
    JSON.stringify(chapters, null, 2)
  );

  console.log('Updated data saved to updatedChapters.json');
}

fetchLinkedInPhotos();
