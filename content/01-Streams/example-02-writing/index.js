/**
 * @file Create a writable stream to a new file, and write sample text to the file.
 **/

const fs = require('fs')

/** File contents */
const data = 'Streams are easy!'

/** Writable stream to a file */
const writerStream = fs.createWriteStream('./output.txt')

// Write data as UTF-8.
writerStream.write(data, 'UTF8')

// End streaming
writerStream.end()

// Once the stream completes, notify user
writerStream.on('finish', () =>
  process.stdout.write('Done: see `output.txt`\n')
)

// On error, display error
writerStream.on('error', process.stderr.write)
