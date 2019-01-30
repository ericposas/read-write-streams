const fs = require('fs');
const spawn = require('child_process').spawn;
const path = './';
const file = 'file.txt';


fs.watch(file, (e,trigger)=>{
  //We can pipe the data directly via `rstream.pipe(process.stdout)` 
  //But that won't allow us to add additional info into the passed data
  //Alternatively, we can capture the readstream content by pushing the
  // chunks into an array, and then concatenating them on 'end'. After
  // which, we'll be able to tack on additional info before we write out
  // to `process.stdout` or wherever we choose to output the data to.
  
  const chunks = [];
  const rstream = fs.createReadStream(path+file);
  rstream.on('data', chunk=>{
    chunks.push(chunk);
  });
  rstream.on('end', ()=>{
    let content = Buffer.concat(chunks);
    process.stdout.write(`reading from "${file}"\n`);
    process.stdout.write(`content:\n`);
    process.stdout.write(`"${content}"\n`);
  });
});
