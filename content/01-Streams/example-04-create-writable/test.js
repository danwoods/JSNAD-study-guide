const assert = require('assert')
const {myWritableThing} = require('./index.js')


myWritableThing.on('finish', () => {
  assert.equal(myWritableThing.data, 'Streams are easy!');
});

myWritableThing.write('Strea');
myWritableThing.write('ms are ');
myWritableThing.write('easy!');

// Signal we're done
myWritableThing.end();

process.stdout.write('Module works correctly\n')
