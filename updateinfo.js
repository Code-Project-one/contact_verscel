const fs = require('fs');
const https = require('https');

const fileToDelete = 'fullcontact.json';
const githubRawURL = 'https://raw.githubusercontent.com/lucifer911/SPO_Contact_list/main/fullcontact.json';

// Delete the existing fullcontact.json file (if it exists)
fs.unlink(fileToDelete, (err) => {
  if (err && err.code !== 'ENOENT') {
    console.error('Error deleting the existing fullcontact.json file:', err);
  } else {
    console.log('Deleted the existing fullcontact.json file (if it existed).');
    
    // Download the updated fullcontact.json file from GitHub
    const file = fs.createWriteStream(fileToDelete);
    https.get(githubRawURL, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('Successfully downloaded the updated fullcontact.json file from GitHub.');
        });
      });
    }).on('error', (err) => {
      console.error('Error downloading the file from GitHub:', err);
    });
  }
});
