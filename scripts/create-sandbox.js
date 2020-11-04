/**
 * @file Creates a codesandbox based on passed in files
 * @see https://codesandbox.io/docs/api
 */

// Use https://reqres.in to simulate/sandbox network requests
const fs = require('fs')
const requestedFiles = process.argv.slice(2)
const https = require('https')

/** JSON object containing files and their contents */
const files = {
  'package.json': {
    content: {
      dependencies: {}
    }
  }
}

/**
 * Handle response from CodeSandbox API
 * @param  {Response} res Response
 */
const responseHandler = res => {
  let data = ''

  res.on('data', chunk => (data += chunk))
  res.on('end', () => process.stdout.write(data))
}

// Add passed in files to `files`
requestedFiles.forEach(
  file =>
    (files[file] = { content: fs.readFileSync(file, { encoding: 'utf8' }) })
)

/** `files` ready to send */
const data = JSON.stringify({ files })

/** Network options for request */
const options = {
  protocol: 'https:',
  hostname: 'codesandbox.io',
  port: 443,
  path: '/api/v1/sandboxes/define?json=1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

/** Request */
const req = https.request(options, responseHandler).on('error', err => {
  process.stderr.write('Error: ', err.message)
})

// Send data
req.write(data)

// End request
req.end()
