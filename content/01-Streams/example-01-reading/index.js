/**
 * @file Creates a readable stream from a file, reads the contents of the file
 *       into a variable, and prints the variable.
 **/

const fs = require('fs')

/** File contents */
let data = ''

/** Readable stream from file */
const readerStream = fs.createReadStream('./input.txt')

// Set the encoding to be utf8.
readerStream.setEncoding('UTF8')

// When data is read from the stream, save it to our `data` variable
readerStream.on('data', (chunk) => (data += chunk))

// When the stream ends, display read data
readerStream.on('end', () => process.stdout.write(data))

// On error, display error
readerStream.on('error', process.stderr.write)
