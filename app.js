import readAndWriteFile from "./stream-functions/read-write-file.js";
import fs from "fs";
import path from "path";
import os from "os";

process.stdin.setEncoding('utf-8');

const appArguments = [...process.argv].slice(2);

function getArguments(...fullCommand) {

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
};

getArguments(...appArguments);
