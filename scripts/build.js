const { readdirSync, readFileSync, lstatSync } = require('fs')
const { join } = require('path')
const marked = require('marked')

// Where we store our content
const MARKDOWN_FILE_DIR = './content'

// Where we'll write to
const TARGET_DIR = './dist'

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

const isDirectory = (source) => lstatSync(source).isDirectory()
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory)

const contentDirectories = getDirectories(MARKDOWN_FILE_DIR)

console.log(contentDirectories)

const contentMarkdown = getMarkdownFiles(contentDirectories[0])

console.log(contentMarkdown)

const renderer = new marked.Renderer()

const rendered = marked(contentMarkdown[0].markdown)

console.log(rendered)
