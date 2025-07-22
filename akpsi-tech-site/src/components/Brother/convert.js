import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const csvPath = path.resolve('src/components/Brother/members.csv');

const pledgeOrder = ['alphaxi', 'alphanu', 'alphamu', 'alphalambda', 'alphakappa'];

// Helper to normalize pledge class keys
function normalizePledgeClass(name) {
  if (!name) return 'unknown';
  return name.toLowerCase().replace(/\s+/g, '');
}

// Helper to get last name (last word in name)
function getLastName(fullName) {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1].toLowerCase();
}

const results = [];

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (data) => {
    // Normalize pledge class
    const rawPledge = data['PC (Ex: Alpha Lambda)'] || 'Unknown';
    const pledgeClass = normalizePledgeClass(rawPledge);

    // Add member object
    results.push({
      name: data['Full Name']?.trim() || '',
      pledgeClass,
      linkedin: data['LinkedIn']?.trim() || '',
      imageUrl: data['Image URL']?.trim() || '', // if you have this in CSV, else remove
    });
  })
  .on('end', () => {
    // Group by pledgeClass, remove duplicates by name+linkedin
    const grouped = results.reduce((acc, member) => {
      if (!acc[member.pledgeClass]) acc[member.pledgeClass] = [];

      // Check duplicates by name + linkedin URL
      const duplicate = acc[member.pledgeClass].some(
        (m) =>
          m.name.toLowerCase() === member.name.toLowerCase() &&
          m.linkedin.toLowerCase() === member.linkedin.toLowerCase()
      );
      if (!duplicate) acc[member.pledgeClass].push(member);

      return acc;
    }, {});

    // Sort each pledge class by last name and assign IDs
    for (const pledgeClass in grouped) {
      grouped[pledgeClass].sort((a, b) => {
        const lastA = getLastName(a.name);
        const lastB = getLastName(b.name);
        if (lastA < lastB) return -1;
        if (lastA > lastB) return 1;
        return a.name.localeCompare(b.name);
      });

      grouped[pledgeClass] = grouped[pledgeClass].map((member, index) => ({
        id: index + 1,
        name: member.name,
        imageUrl: member.imageUrl || '',
        linkedin: member.linkedin,
      }));
    }

    // Order pledge classes by your specified order, filter out empty
    const orderedChapters = pledgeOrder
      .filter((key) => grouped[key])
      .map((key) => ({
        name:
          // Capitalize first letter of Greek letter + rest as in original
          key
            .replace(/^alpha/, 'Alpha ')
            .replace('xi', 'Xi')
            .replace('nu', 'Nu')
            .replace('mu', 'Mu')
            .replace('lambda', 'Lambda')
            .replace('kappa', 'Kappa'),
        members: grouped[key],
      }));

    // Add any leftover pledge classes not in your order at the end (optional)
    Object.keys(grouped)
      .filter((key) => !pledgeOrder.includes(key))
      .forEach((key) => {
        orderedChapters.push({
          name: key,
          members: grouped[key],
        });
      });

    // Output as React-ready file (data.jsx)
    const output = `export const chapters = ${JSON.stringify(orderedChapters, null, 2)};\n`;
    fs.writeFileSync('src/components/Brother/data.jsx', output);

    console.log('✅ data.jsx generated successfully with normalized, sorted, de-duped members');
  });