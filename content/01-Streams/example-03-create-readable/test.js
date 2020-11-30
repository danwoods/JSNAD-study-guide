const assert = require('assert')
const {myStreamableThing} = require('./index.js')

let data = ''

myStreamableThing.on('data', (chunk) => {
  data += chunk;
});

myStreamableThing.on('end', () => {
  assert.equal(data, 'Streams are easy!');
});

process.stdout.write('Module works correctly\n')
