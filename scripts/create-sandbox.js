/**
 * @file Creates a codesandbox based on passed in files
 * @see https://codesandbox.io/docs/api
 */

// Use https://reqres.in to simulate/sandbox network requests
const fs = require('fs')
const https = require('https')
const path = require('path')


/** Directory to upload */
const directory = process.argv[2]

/** JSON object containing files and their contents */
const files = {
  // Default `package.json`; expected to be overridden
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
fs.readdirSync(directory).forEach(
  file =>
    (files[file] = { content: fs.readFileSync(path.resolve(directory,file), { encoding: 'utf8' }) })
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
