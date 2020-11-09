const HtmlWebpackPlugin = require('html-webpack-plugin')
// const marked = require("marked");
const fs = require('fs')
const path = require('path')
const marked = require('marked')

// Assuming I add a bunch of .md files in my ./md dir.
const MARKDOWN_FILE_DIR = './content'

/*
 * Generates an Array with the following data:
 * [
 *   {
 *     filename: '{markdownFilename}.md',
 *     markdown: '{ markdownString }`
 *   }
 * ]
 */
const markdownFilesData = fs
  // Read directory contents
  .readdirSync(MARKDOWN_FILE_DIR)
  // Take only .md files
  .filter((filename) => /\.md$/.test(filename))
  // Normalize file data.
  .map((filename) => {
    return {
      markdown: fs.readFileSync(path.join(MARKDOWN_FILE_DIR, filename), {
        encoding: 'utf8'
      }),
      filename
    }
  })

console.log(markdownFilesData)

const renderer = new marked.Renderer()

module.exports = {
  entry: {
    // XXX: Automate
    streams: './content/01-Streams/README.md'
  },
  output: {
    filename: 'dummy.html',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'JSNAD Study Guide',
      template: './content/README.md'
    }),
    new HtmlWebpackPlugin({
      title: 'JSNAD Study Guide - Streams',
      template: './content/01-Streams/README.md',
      filename: 'streams.html',
      meta: {
        description: 'Learn Node Streams'
      }
    })
  ]
}
// plugins: [
//     // map the above function to the array of file data
//     ...markdownFiles.map(makeHtmlConfig),
// ],

// ...
