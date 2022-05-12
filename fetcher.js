const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const url = process.argv.slice(2)[0];
const filePath = process.argv.slice(2)[1];

const sendRequest = function(url, filePath) {
  request(url, (error, response, body) => {
  if (error) console.error(error);
  if (!error) {
    
    fs.writeFile(filePath, body, err => {
      if (err) {
        console.error(err);
        process.exit();
      }
      if (!err) {
        
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(err);
            process.exit();
          }
          if (!err) {
            console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
            process.exit();
          }
        });
      }
    });
  }
  });
}

if (fs.existsSync(filePath)) {
  rl.question('File name exists, do you want to overwrite it? y/n: ', (key) => {
    if (key === 'y' || key === 'Y') {
      sendRequest(url, filePath);
    }
    if (key === 'n' || key === 'N') {
      process.exit();
    }
    console.log('Invalid Input. Program ends.')
    process.exit();
  })
} else {
  sendRequest(url, filePath);
}
