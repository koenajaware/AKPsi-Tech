import fs from 'fs';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

const { chapters } = await import('./data2.js');

const EMAIL = process.env.LINKEDIN_EMAIL;
const PASSWORD = process.env.LINKEDIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  throw new Error("❌ Missing LinkedIn credentials in .env file.");
}

console.log("📦 Loaded LinkedIn credentials");
console.log("📚 Chapters loaded from data.js:");
console.dir(chapters, { depth: null });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loginToLinkedIn(page) {
  console.log("🔐 Logging in to LinkedIn...");
  await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2', timeout: 60000 });

  await page.waitForSelector('#username', { timeout: 30000 });
  await page.type('#username', EMAIL, { delay: 50 });
  await page.type('#password', PASSWORD, { delay: 50 });

  const initialUrl = page.url();
  await page.click('button[type="submit"]');

  try {
    // Wait for either URL to change or main nav to load
    await Promise.race([
      page.waitForFunction(`window.location.href !== '${initialUrl}'`, { timeout: 60000 }),
      page.waitForSelector('nav[aria-label="Primary"]', { timeout: 60000 }),
    ]);
  } catch {
    // check for checkpoint or error page
    if (page.url().includes('/checkpoint/challenge')) {
      const content = await page.content();
      fs.writeFileSync('challenge_page.html', content);
      throw new Error("⚠️ Login challenge detected. HTML saved to challenge_page.html");
    }
    throw new Error("Login did not complete or timed out.");
  }

  console.log("✅ Logged in successfully");
}

async function scrapeLinkedInPhotos(chapters) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: puppeteer.executablePath(),
  });
  const page = await browser.newPage();

  await loginToLinkedIn(page);

  for (const chapter of chapters) {
    console.log(`📘 Processing chapter: ${chapter.name || 'Unnamed Chapter'}`);
  
    for (const member of chapter.members || []) {
      console.log(`👤 Checking member: ${member.name || 'Unnamed Member'}`);
  
      if (!member.linkedin) {
        console.log(`⚠️ Skipping ${member.name}: no LinkedIn link`);
        member.imageUrl = null;
        continue;
      }
  
      try {
        console.log(`🌐 Navigating to ${member.linkedin}`);
        await page.goto(member.linkedin, { waitUntil: 'domcontentloaded', timeout: 30000 });
  
        console.log(`🌍 Current page URL: ${page.url()}`);
  
        const photoUrl = await page.evaluate(() => {
          const selectors = [
            'img.pv-top-card-profile-picture__image--show',
            'img.profile-photo-edit__preview',
            'img.pv-top-card-profile-picture__image',
            'img.evi-image',
            'img.entity-photo-circle-9',
          ];
  
          for (const sel of selectors) {
            const img = document.querySelector(sel);
            if (img && img.src && !img.src.includes('R0lGODlhAQABAIAAAAAAAP')) {
              return img.src;
            }
          }
  
          const picture = document.querySelector('picture img');
          if (picture && picture.src) {
            return picture.src;
          }
  
          return null;
        });
  
        if (photoUrl) {
          console.log(`📸 Found photo for ${member.name}: ${photoUrl}`);
        } else {
          console.log(`⚠️ No photo found for ${member.name}`);
        }
  
        member.imageUrl = photoUrl;
  
      } catch (err) {
        console.error(`❌ Failed to scrape ${member.name}:`, err.message);
        member.imageUrl = null;
      }
  
      await sleep(4000 + Math.random() * 4000); // ⏳ Delay to avoid rate limit
    }
  
    await sleep(5000); // Optional: pause longer between chapters
  }
  await browser.close();
  return chapters;
}

const updated = await scrapeLinkedInPhotos(chapters);

console.log("💾 Writing output to data_with_photos.json...");
fs.writeFileSync('data_with_photos.json', JSON.stringify({ chapters: updated }, null, 2));
console.log('✅ Saved results to data_with_photos.json');