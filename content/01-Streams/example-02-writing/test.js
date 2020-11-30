const assert = require('assert')
const {readFileSync} = require('fs')

assert.equal(readFileSync('./output.txt'), 'Streams are easy!')
process.stdout.write('Module works correctly\n')
