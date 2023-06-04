export default function(chunk, operation) {
  switch (operation) {
    case 'uppercase':
      return chunk.toUpperCase();
    case 'lowercase':
      return chunk.toLowerCase()
    case 'reverse':
      return chunk.split('').reverse().join('');         
    case 'removeSpaces':
      return chunk.replace(/\s/g, '');
  }
   return false;
}
