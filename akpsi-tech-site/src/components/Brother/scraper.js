import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { chapters } from './data.js';  // Adjust path if needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const org = "Alpha Kappa Psi - Omega Theta Chapter";

// Flatten all member names from all chapters into one array
const getAllMemberNames = () => {
  return chapters.flatMap(chapter => chapter.members.map(member => member.name));
};

const scrapeLinkedInProfile = async (browser, name) => {
  const page = await browser.newPage();
  const query = `${name} ${org} site:linkedin.com/in`;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  await page.goto(googleSearchUrl, { waitUntil: 'domcontentloaded' });

  const link = await page.locator('a[href*="linkedin.com/in"]').first();
  const profileUrl = await link.getAttribute('href');

  if (!profileUrl) {
    console.log(`❌ No LinkedIn found for ${name}`);
    await page.close();
    return { name, linkedin: null, headshot: null };
  }

  await page.goto(profileUrl, { waitUntil: 'domcontentloaded' });

  const image = await page.locator('img').first();
  const headshotUrl = await image.getAttribute('src');

  await page.close();

  return {
    name,
    linkedin: profileUrl,
    headshot: headshotUrl || null
  };
};

const main = async () => {
  const browser = await chromium.launch({ headless: false }); // set true to hide browser
  const memberNames = getAllMemberNames();
  const results = [];

  for (const name of memberNames) {
    console.log(`🔍 Scraping ${name}...`);
    try {
      const data = await scrapeLinkedInProfile(browser, name);
      results.push(data);
    } catch (err) {
      console.error(`❗ Error scraping ${name}:`, err);
      results.push({ name, linkedin: null, headshot: null });
    }
  }

  await browser.close();

  const outputPath = path.join(__dirname, 'linkedin_results.json');
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

  console.log(`✅ Finished scraping. Results saved to ${outputPath}`);
};

main();