import fs from 'fs';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

const { chapters } = await import('./data2.js');

const EMAIL = process.env.LINKEDIN_EMAIL;
const PASSWORD = process.env.LINKEDIN_PASSWORD;
const RESTART_INTERVAL = 25; // restart browser after every 25 members

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loginToLinkedIn(page) {
  console.log("🔐 Logging into LinkedIn...");
  await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });

  await page.type('#username', EMAIL, { delay: 50 });
  await page.type('#password', PASSWORD, { delay: 50 });
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
  console.log("✅ Logged in.");
}

async function scrapeProfileWithRetry(member, page, maxRetries = 3) {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      console.log(`🌐 [${attempts + 1}/${maxRetries}] Visiting: ${member.linkedin}`);
      await page.goto(member.linkedin, { waitUntil: 'domcontentloaded', timeout: 30000 });

      const src = await page.evaluate(() => {
        const selectors = [
          'img.pv-top-card-profile-picture__image--show',
          'img.profile-photo-edit__preview',
          'img.pv-top-card-profile-picture__image',
          'img.evi-image',
          'img.entity-photo-circle-9',
          'picture img',
        ];

        for (const sel of selectors) {
          const img = document.querySelector(sel);
          if (img && img.src && !img.src.includes('data:image/gif') && !img.src.includes('R0lGODlhAQABAIAAAAAAAP')) {
            return img.src;
          }
        }
        return null;
      });

      if (src) {
        member.imageUrl = src;
        console.log(`📸 Found photo for ${member.name}`);
        break;
      } else {
        console.warn(`⚠️ No valid photo found for ${member.name}`);
      }
    } catch (err) {
      console.error(`❌ Error scraping ${member.name} (attempt ${attempts + 1}): ${err.message}`);
    }

    attempts++;
    if (attempts < maxRetries) {
      const delayMs = 5000 + Math.floor(Math.random() * 2000);
      console.log(`🔁 Retrying after ${delayMs}ms...`);
      await sleep(delayMs);
    } else {
      member.imageUrl = null;
      console.log(`❌ Giving up on ${member.name} after ${maxRetries} attempts.`);
    }
  }
}

async function scrapeLinkedInPhotos(chapters) {
  let chapterIndex = 0;
  let memberIndex = 0;
  const membersPerSession = 15;

  while (chapterIndex < chapters.length) {
    console.log("🚀 Launching new browser session...");
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await loginToLinkedIn(page);

    let scrapedInThisSession = 0;

    outer: while (chapterIndex < chapters.length) {
      const chapter = chapters[chapterIndex];
      
      while (memberIndex < chapter.members.length) {
        const member = chapter.members[memberIndex];

        if (!member.linkedin) {
          console.log(`⛔️ Skipping ${member.name}: no LinkedIn URL`);
          member.imageUrl = null;
        } else {
          console.log(`🕵️ Scraping: ${member.name}`);
          await scrapeProfileWithRetry(member, page);
          scrapedInThisSession++;

          const delayMs = 5000 + Math.floor(Math.random() * 3000);
          console.log(`⏱ Waiting ${delayMs}ms...`);
          await sleep(delayMs);
        }

        memberIndex++;

        if (scrapedInThisSession >= membersPerSession) {
          console.log("🔁 Restarting browser after session limit reached...");
          await browser.close();
          await sleep(10000); // 10s delay before restart
          break outer; // breaks out to relaunch browser
        }
      }

      // Finished all members in chapter
      if (memberIndex >= chapter.members.length) {
        chapterIndex++;
        memberIndex = 0;
      }
    }

    console.log("✅ Closing browser at end of session");
    await browser.close();
  }

  console.log("🎉 Finished scraping all profiles!");
  return chapters;
}

// Start the scraping process
console.log("📚 Starting scrape...");
const updated = await scrapeLinkedInPhotos(chapters);

// Save to file
console.log("💾 Writing output to data_with_photos.json...");
fs.writeFileSync('data_with_photos.json', JSON.stringify({ chapters: updated }, null, 2));
console.log("✅ Done! Results saved.");