const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

async function fileOperations() {
  try {
    // Write to the file
    await fsp.writeFile(filePath, 'Line 1 - written using fs.promises')
    console.log('File written successfully')

    // Read the file
    const content = await fsp.readFile(filePath, 'utf8')
    console.log('Content:')
    console.log(content)

    // Append more content
    await fsp.appendFile(filePath, '\nLine 2 - appended using fs.promises')

    // Read again
    const updated = await fsp.readFile(filePath, 'utf8')
    console.log('Updated content:')
    console.log(updated)
  } catch (err) {
    console.error('Error:', err.message)
  }
}

fileOperations()

// List all JavaScript files in the current folder
const folder = __dirname
const files = fs.readdirSync(folder)

console.log('\nJavaScript files:\n')

files.forEach(file => {
  if (path.extname(file) === '.js') {
    const currentFile = path.join(folder, file)
    const stats = fs.statSync(currentFile)
    const sizeKB = (stats.size / 1024).toFixed(2)

    console.log(`${file} - ${sizeKB} KB`)
  }
})

/*
text/plain - Sends plain text without formatting.
text/html - Sends HTML so the browser renders a web page.
application/json - Sends JSON data, commonly used for APIs.
*/