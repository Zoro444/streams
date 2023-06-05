import readAndWriteFile from "./stream-functions/read-write-file.js";
import fs from "fs";
import path from "path";
import os from "os";

process.stdin.setEncoding('utf-8');

console.log(`Welcome ${os.userInfo().username}!\n
This is a command-line application that reads data from an input file,
performs a specified operation on the data using streams, 
and writes the transformed data to an output file.
Select input file path, output file path and operation!`);

process.stdin.on('data', (data) => {
  data = data.trim();
  const fullCommand = data.split(' ');
  
  if (fullCommand.length < 3) {
    console.log('Select "input file path", "output file path" and operation');
  }
  else if (fullCommand.length > 3) {
    console.log('To much arguments \n Must be "input file name", "output file name" and operation');
  }
  else {
    fs.stat(path.resolve(fullCommand[0]), (err) => {
      if (err) {
        console.log('No such input file');
      }
      else {
        readAndWriteFile(...fullCommand);
      }
    })
  }
});
