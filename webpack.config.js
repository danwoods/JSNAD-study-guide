const HtmlWebpackPlugin = require("html-webpack-plugin");
// const marked = require("marked");
const fs = require("fs");
const path = require("path");


// Assuming I add a bunch of .md files in my ./md dir.
const MARKDOWN_FILE_DIR = "./content";

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
    .filter(filename => /\.md$/.test(filename))
    // Normalize file data.
    .map(filename => {
        return {
            markdown: fs.readFileSync(path.join(MARKDOWN_FILE_DIR, filename), {encoding: "utf8"}),
            filename,
        };
    });

    console.log(markdownFilesData)
    

// const makeHtmlConfig = ({ filename, markdown }) => ({
//     template: "pug!templates/index.pug",
//     cache: true,
//     chunks: ["main"],
//     title: `Page Number ${n}`,
//     filename: `pages/${filename}.html`,
//     // Parses the markdown string and converts to HTML string
//     bodyHTML: marked(markdown),
// });

module.exports = {
    entry: {
        // XXX: Automate
        streams: "./content/01-Streams/README.md"
    },
  output: {
    filename: 'streams.html',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
                options: {
                    /* your options here */
                }
            }
        ]
    }]
},
plugins: [
    new HtmlWebpackPlugin({
      title: 'JSNAD Study Guide',
      template: './content/README.md'
    })
  ]
}
    // plugins: [
    //     // map the above function to the array of file data
    //     ...markdownFiles.map(makeHtmlConfig),
    // ],

    // ...
