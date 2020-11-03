const fs = require('fs')
const createGzip = require('zlib').createGzip

const src = fs.createReadStream('input.tar');
const transform = createGzip();
const dest = fs.createWriteStream('output.tar.gz');

// Note that streams can use 'pipes'
src.pipe(transform).pipe(dest);
