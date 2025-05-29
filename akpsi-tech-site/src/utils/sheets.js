const SPREADSHEET_ID = '1g-S4QGQxJHgnKwE9Ubj4wz-_hBVPJtQ00QiOsNCFWrw';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

async function readFromSheet() {
  try {
    console.log('Starting readFromSheet function...');
    console.log('API Key available:', !!API_KEY); // Logs true/false without exposing the key

    if (!API_KEY) {
      console.error('API Key is missing from environment variables');
      throw new Error('Google Sheets API key is not defined in environment variables');
    }
    console.log(API_KEY)
    // 1. Get the first sheet's name
    console.log('Fetching spreadsheet metadata...');
    const spreadsheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`
    );
    console.log('Spreadsheet response status:', spreadsheetResponse.status);
    
    const spreadsheetData = await spreadsheetResponse.json();
    console.log('Spreadsheet data received:', {
      title: spreadsheetData.properties?.title,
      sheetCount: spreadsheetData.sheets?.length
    });

    const firstSheetName = spreadsheetData.sheets[0].properties.title;
    console.log('First sheet name:', firstSheetName);

    // 2. Get specific columns data
    const ranges = [
      `${firstSheetName}!B:B`,  // Full Name
      `${firstSheetName}!C:C`,  // PC
      `${firstSheetName}!G:G`,  // Headshot
      `${firstSheetName}!I:I`   // LinkedIn
    ].map(range => encodeURIComponent(range)).join('&ranges=');

    console.log('Fetching column data with ranges:', ranges);
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?ranges=${ranges}&key=${API_KEY}`
    );
    console.log('Column data response status:', response.status);
    
    const data = await response.json();
    console.log('Column data received:', {
      valueRangeCount: data.valueRanges?.length,
      firstRange: data.valueRanges?.[0]?.range,
      firstRangeRowCount: data.valueRanges?.[0]?.values?.length
    });

    // 3. Process the data
    const values = data.valueRanges;
    const names = values[0].values.slice(1); // Skip header
    const pcs = values[1].values.slice(1);   // Skip header
    const headshots = values[2].values.slice(1); // Skip header
    const linkedins = values[3].values.slice(1); // Skip header

    console.log('Processed data counts:', {
      namesCount: names.length,
      pcsCount: pcs.length,
      headshotsCount: headshots.length,
      linkedinsCount: linkedins.length
    });

    // 4. Create array of brother objects
    const brothers = names.map((name, index) => ({
      id: index + 1,
      name: name[0],
      pc: pcs[index][0].trim(), // Trim to handle any extra spaces
      imageUrl: headshots[index][0],
      linkedin: linkedins[index][0]
    })).filter(brother => brother.name); // Filter out any empty entries

    console.log('Created brothers array:', {
      totalBrothers: brothers.length,
      sampleBrother: brothers[0] // Log first brother as sample
    });

    // 5. Group by PC
    const chapters = brothers.reduce((acc, brother) => {
      const pc = (brother.pc || 'Unassigned').toLowerCase();
      if (!acc[pc]) {
        acc[pc] = [];
      }
      acc[pc].push(brother);
      return acc;
    }, {});

    console.log('Grouped by PC:', {
      chapterCount: Object.keys(chapters).length,
      chapterNames: Object.keys(chapters),
      sampleChapterSize: Object.values(chapters)[0]?.length
    });

    // 6. Convert to array format and sort chapters
    const chaptersArray = Object.entries(chapters)
      .map(([name, members]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        members: members.sort((a, b) => {
          const lastNameA = a.name.split(' ').pop().toLowerCase();
          const lastNameB = b.name.split(' ').pop().toLowerCase();
          return lastNameA.localeCompare(lastNameB);
        })
      }))
      .sort((a, b) => {
        // Extract the class identifier (e.g., "xi", "nu", "mu" from "Alpha Xi", "Alpha Nu", "Alpha Mu")
        const getClassIdentifier = (name) => {
          const parts = name.toLowerCase().split(' ');
          return parts[parts.length - 1]; // Get the last word
        };
        
        const classA = getClassIdentifier(a.name);
        const classB = getClassIdentifier(b.name);
        
        // Sort in reverse order so newer classes come first
        return classB.localeCompare(classA);
      });

    console.log('Final chapters array (sorted):', {
      totalChapters: chaptersArray.length,
      chapterOrder: chaptersArray.map(c => c.name)
    });

    return chaptersArray;
  } catch (error) {
    console.error('Error in readFromSheet:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    throw error;
  }
}

export { readFromSheet }; 