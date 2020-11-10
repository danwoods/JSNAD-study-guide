const {
  readdirSync,
  readFileSync,
  lstatSync,
  writeFileSync,
  existsSync,
  mkdirSync
} = require('fs')
const { join, resolve } = require('path')
const marked = require('marked')

// XXX XXX XXX XXX
//
// Use https://www.npmjs.com/package/gray-matter
//
// XXX XXX XXX XXX

// Where we store our content
const MARKDOWN_FILE_DIR = './content'

// Where we'll write to
const TARGET_DIR = './dist'

// New folder/file structure
const targetContent = {}

/*
 * Generates an Array with the following data:
 * [
 *   {
 *     filename: '{ markdownFilename }.md',
 *     markdown: '{ markdownString }`
 *   }
 * ]
 */
const getMarkdownFiles = (source) =>
  readdirSync(source)
    // Take only .md files
    .filter((filename) => /\.md$/.test(filename))
    // Normalize file data.
    .map((filename) => {
      return {
        markdown: readFileSync(join(source, filename), { encoding: 'utf8' }),
        filename
      }
    })

/**
 * Determine if passed in `source` is a directory
 * @param  {string}  source - File or directory to check
 * @return {Boolean}        - Whether or not the passed in `source` was a directory
 */
const isDirectory = (source) => lstatSync(source).isDirectory()

/**
 * Find all sub-directories in a directory
 * @param  {string} source - Directory to walk
 * @return {string[]}      - Array of directories
 */
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory)

/** Sub directories of `MARKDOWN_FILE_DIR` */
const contentDirectories = getDirectories(MARKDOWN_FILE_DIR)

// Create top level index file
if (!existsSync(TARGET_DIR)) {
  mkdirSync(TARGET_DIR, { recursive: true })
}

writeFileSync(
  resolve(TARGET_DIR + '/index.html'),
  marked(getMarkdownFiles(MARKDOWN_FILE_DIR)[0].markdown)
)

// Loop through content directories, converting READMEs to HTML and creating the file structure
contentDirectories.forEach((dirname) => {
  /** New path for new HTML */
  const pathname = resolve(TARGET_DIR, dirname)

  /** Content for new HTML file */
  const content = marked(getMarkdownFiles(dirname)[0].markdown)

  // If we don't have a place to store the new HTML file, create it
  if (!existsSync(pathname)) {
    mkdirSync(pathname, { recursive: true })
  }

  // Write new HTML file
  writeFileSync(pathname + '/index.html', content)
})
