const { exec } = require('child_process')
const assert = require('assert')

exec('node ./index.js', (error, stdout, stderr) => {
  assert.equal(error, null)
  assert.equal(stderr, '')
  assert.equal(stdout, 'Streams are easy!')
  process.stdout.write('Module works correctly\n')
})
