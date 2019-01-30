const fs = require('fs');
const path = './';
const file = 'file.txt';
const {EOL} = require('os');
const wstream = fs.createWriteStream(path+file, {flags:'a'});


process.stdin.on('data', data=>{
  wstream.write(data.toString());
  process.stdout.write(`written to "${file}"${EOL}\n`);
});

