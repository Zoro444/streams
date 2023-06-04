import fs from "fs";
import path from "path";
import stream from "stream";
import operationCommand from "./operation.js";
import allOperations from "./all-operations.js";

export default function(inputPath, outputPath, operation) {
  if (operationCommand('', operation) === false){
    console.log('No such operation \nThis operations you can use');
    console.table(allOperations.available_operation);
    return;
  }

  const readableStream = fs.createReadStream(path.resolve(inputPath), 'utf8');
  const writeableStream = fs.createWriteStream(path.resolve(outputPath), 'utf-8');
 
  const transform = new stream.Transform({
    transform(chunk, encoding, next) {
      const transformedChunk = operationCommand(chunk.toString(), operation);
 
      this.push(transformedChunk);
      next();
    }
  });

  readableStream.on('data', (data) => {
    data.toString().toUpperCase();
  });

  readableStream.on('end', (data) => {
    console.log("The file is correctly written");
  });
    
  readableStream.pipe(transform).pipe(writeableStream);

  readableStream.on('error', (err) => {
    console.log('no such file or directory');
  });

   readableStream.on('close', (data) => {
      writeableStream.end();
   });
};
