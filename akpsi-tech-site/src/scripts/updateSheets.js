import { readFromSheet } from '../utils/sheets.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function updateDataFile() {
  try {
    // Read data from Google Sheets
    const chapters = await readFromSheet();

    // Create the data file content
    const fileContent = `export const chapters = ${JSON.stringify(chapters, null, 2)};`;

    // Write to the data file
    const dataFilePath = join(__dirname, '../components/Brother/data.jsx');
    await fs.writeFile(dataFilePath, fileContent, 'utf8');

    console.log('Data file updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to update data file:', error);
    process.exit(1);
  }
}

// Run the update
updateDataFile(); 