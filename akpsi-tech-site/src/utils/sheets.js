import { google } from 'googleapis';

// Replace these with your own credentials
const CREDENTIALS = {
  // TODO: Fill in your Google Sheets API credentials here
  // You can get these from the Google Cloud Console
  // https://console.cloud.google.com/apis/credentials
  client_email: 'akpsi-website@akpsi-tech.iam.gserviceaccount.com', // Should look like: something@project-id.iam.gserviceaccount.com
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3R84BmUmPp5J6\nS7HmshoE8G0NLUFopJ+8/1VgxFlL8yAsFbedA4jl1BEDWo68t3UOs6sY51Xn9/fY\nGD+cfJhS9BkqzKeyLCVTRC9FykV/JAAdX8zV03mM6tq4hxZA/Arztg7SkwTeYiQp\nA9XGdg7KeMnQR5SAZ+Veks86krvQcZrLeFhQb0GET7RJR22cOrGi9lCTH8DHCu3s\nBb2sG6aTsoeFz+fqmRUiI53Je3MDrEghp2h/8Z7ec0tOCUoGbYqoFLjyzb1Rc/gP\nvBxonVjZ9HMIFVTALnle4uhAar4rJh4aE8N97f0aFvAFYL+o+X496X+xzV/0NWy+\n/2qCIRZvAgMBAAECgf8yrXE2kj5E1doGG1W6GM4Y/T0qDCKJ3vsnopbmqtG8948k\noW7s6R+V2rH+KR5OomuEt3Jg8HG+MlJnyXE7CqY4SbQZfOrhkAovxQYooWnfGUwT\nZXwro6kvO3f1sokZSk6YXdEEjTSUkiC2pEaKPj8h4Y1ZrnEqfdkAhE5a0YD4fNS1\nLW3361ZYnJanyStoUh40QCdMyHCrq7BlAal5sPEnpBUUAX5OKov7ZPPxnCUW7Y08\nUv9RV32CHc8e5T9yDTDvTThxSvXUXDitxkaVDduAA9ofpwwpgq0s906lhar79MC+\n8oGfWx58Koud3okt7O3T87uJGA6bkcgGYfENYJkCgYEA3blsm/UVYYtuZpEbczy5\n20xEnzepEtMgZuaZF1ye7+nlL5mWLdIttSdj7RQSa8w2+etSNj2zOWal8+kFD8Bb\nDXnXAM6UvmpXRe/LhAMEihCsMDavRv2K8k8svJ9FGDI3bxsJGlJuQPe2zWA/+85Y\noDSgVigNl5t0QtVEM4PAYgkCgYEA05z+lNJ4BstXVg2df76aD5jIrpddyYDRuCAZ\nhdPDiPrf3CrwGp3ptsHfLtcGBwMDY9YrBZJjxdlSQ63mOIYWYuGLbicEIdnPygH9\nKM1Ir9mAVfL23yg1jFRtYoD0+q4WH+3I6LlNASpim89JB1vuOyZjzytQHBbw1qY7\ndwkbcrcCgYEAnY8FcfIAJpf5dONKuWH+xKp23RmliN4E2XqmcWZ8/wmbtm6SvK7t\nkhySsscfrACrVH93pVnFAVZDOYdt9FqBmZrqQQWLx6AzslwLqByo3h+o7H3/ohfL\n5BKFPOiFJgORRt/UYSMQfBRLj7gE38ArVHTxNygxOHncbR214FGQpVkCgYEAm4Od\n6HsAcGXRilE5NR87E0lB+mUNLL/53+nfN+WXprxP9fqsN7NjhcbWoRKuwEprnFxR\ng6fAoS8D8O8E6PdJzmNY15vewo3S0e9CQFEVIP6j/QYwfXGMYNPPC3wgDXYQlmhm\npPlA6SFgFIdycPETk+6znRWEqxAE8Ip72xAbVuMCgYEAhvfY1nuWgW9C+P0eL2Hl\njfuG8ro4TgycZ+BWavl/C/ZyndrPYVvdnMwP/i5zaHAX4LZdlIVvkj0flz9sv4qH\nHFiDpw65Eo/Suon6UXrB7JaE3Hc1oFfv+3GmyjWvcTkWEYYMFMbpJOR2m09tIj1R\n8JLjjPqETHvTnSZtc3+2wGU=\n-----END PRIVATE KEY-----\n', // Should start with "-----BEGIN PRIVATE KEY-----"
};

const SPREADSHEET_ID = '1g-S4QGQxJHgnKwE9Ubj4wz-_hBVPJtQ00QiOsNCFWrw';
const SHEET_NAME = 'Brother Contact Information (Responses)';

// Define the column ranges for each field using A1 notation
const COLUMN_RANGES = {
  fullName: 'B2:B',  // Full Name column starting from row 2 (after header)
  pc: 'C2:C',        // PC column starting from row 2
  headshot: 'G2:G',  // Headshot column starting from row 2
  linkedin: 'I2:I'   // LinkedIn column starting from row 2
};

async function readFromSheet() {
  try {
    const auth = new google.auth.JWT(
      CREDENTIALS.client_email,
      null,
      CREDENTIALS.private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all data at once using the column ranges
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SPREADSHEET_ID,
      ranges: Object.values(COLUMN_RANGES).map(range => `'${SHEET_NAME}'!${range}`),
      valueRenderOption: 'UNFORMATTED_VALUE', // Get raw values without formatting
      dateTimeRenderOption: 'FORMATTED_STRING' // Format dates as strings
    });

    // Extract the values from each range
    const values = response.data.valueRanges;
    if (!values || values.length === 0) {
      throw new Error('No data found in sheet');
    }

    // Get the number of rows (assuming all columns have the same number of rows)
    const numRows = values[0].values?.length || 0;
    if (numRows <= 0) {
      throw new Error('No data rows found in sheet');
    }

    // Process the data
    const members = Array.from({ length: numRows }, (_, index) => {
      return {
        id: index + 1,
        name: values[0].values?.[index]?.[0] || '', // Full Name (index 0 in values array)
        pc: values[1].values?.[index]?.[0] || '',   // PC (index 1 in values array)
        imageUrl: values[2].values?.[index]?.[0] || '', // Headshot (index 2 in values array)
        linkedin: values[3].values?.[index]?.[0] || ''  // LinkedIn (index 3 in values array)
      };
    }).filter(member => member.name); // Filter out rows with no name

    // Group members by PC
    const chapters = members.reduce((acc, member) => {
      const pc = member.pc || 'Unassigned';
      if (!acc[pc]) {
        acc[pc] = [];
      }
      acc[pc].push(member);
      return acc;
    }, {});

    // Convert to array format
    const chaptersArray = Object.entries(chapters).map(([name, members]) => ({
      name,
      members
    }));

    return chaptersArray;
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
}

export { readFromSheet }; 