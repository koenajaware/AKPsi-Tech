// scraper.js (ES module)

import { chromium } from 'playwright';
import { chapters } from './data.js';  // Adjust path if needed

// Flatten all members from all chapters into one array
const getAllMembers = () => {
  return chapters.flatMap(chapter => chapter.members);
};

const scrapeLinkedInProfile = async (browser, name) => {
  const page = await browser.newPage();

  // Set user agent & viewport
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );
  await page.setViewportSize({ width: 1280, height: 800 });

  const query = `${name} Alpha Kappa Psi - Omega Theta Chapter site:linkedin.com/in`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);  // wait 2 seconds for content to load

    // Try a more flexible selector for first search result link
    const firstLink = await page.$eval('a[href^="https://www.linkedin.com/in/"]', a => a.href);

    console.log(`✅ Found LinkedIn for ${name}: ${firstLink}`);
    await page.close();
    return firstLink;
  } catch (error) {
    console.error(`❗ Error scraping ${name}: ${error.message}`);
    await page.close();
    return null;
  }
};

const main = async () => {
  const browser = await chromium.launch({ headless: true });

  const members = getAllMembers();

  for (const member of members) {
    console.log(`🔍 Scraping ${member.name}...`);
    const url = await scrapeLinkedInProfile(browser, member.name);
    // You can store or process url here, e.g. update your data or save to a file
  }

  await browser.close();
};

main().catch(console.error);