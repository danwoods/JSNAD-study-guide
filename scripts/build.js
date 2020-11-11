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
const matter = require('gray-matter')

/** Where we store our content */
const MARKDOWN_FILE_DIR = './content'

/** Where we'll write to */
const TARGET_DIR = './dist'

/** Basic styling */
const style = `
html {
  font-family: sans-serif;
  line-height: 1.5;
}
body {
  max-width: 960px;
  margin: 0 auto;
  padding: 64px;
}
`

/**
 * Create first part of HTML string, including <html>, a full <head /> tag, and the opening <body> tag
 * @param  {object} props - Properties to pass in
 * @param  {string} props.title - Title of page
 * @return {string} - Opening HTML string
 */
const createHtmlPrefix = ({ title }) =>
  `<html><head><title>${title}</title><style>${style}</style></head><body>`

/** Closing HTML string. Closes <body> and <html> */
const HTML_SUFFIX = `</body></head>`

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
      const mdObj = matter(
        readFileSync(join(source, filename), { encoding: 'utf8' })
      )
      return {
        markdown: mdObj.content,
        data: mdObj.data,
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

// Create top level index file ////////////////////////////////////////////////

if (!existsSync(TARGET_DIR)) {
  mkdirSync(TARGET_DIR, { recursive: true })
}

const topLevelMdObj = getMarkdownFiles(MARKDOWN_FILE_DIR)[0]

writeFileSync(
  resolve(TARGET_DIR + '/index.html'),
  `${createHtmlPrefix({ title: topLevelMdObj.data.title })}${marked(
    topLevelMdObj.markdown
  )}${HTML_SUFFIX}`
)

// Create sub pages ///////////////////////////////////////////////////////////

// Loop through content directories, converting READMEs to HTML and creating the file structure
contentDirectories.forEach((dirname) => {
  /** New path for new HTML */
  const pathname = resolve(TARGET_DIR, dirname)

  /** Content for new HTML file */
  const { markdown, data } = getMarkdownFiles(dirname)[0]

  // If we don't have a place to store the new HTML file, create it
  if (!existsSync(pathname)) {
    mkdirSync(pathname, { recursive: true })
  }

  // Write new HTML file
  writeFileSync(
    pathname + '/index.html',
    `${createHtmlPrefix({ title: data.title })}${marked(
      markdown
    )}${HTML_SUFFIX}`
  )
})
