const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Write
fs.writeFileSync(filePath, 'Line 1 — written by Node.js')
console.log('File written')

// Read
const content = fs.readFileSync(filePath, 'utf8')
console.log('Content:', content)

// Append
fs.appendFileSync(filePath, '\nLine 2 — appended')
fs.appendFileSync(filePath, '\nLine 3 — appended again')

// Read again
const updated = fs.readFileSync(filePath, 'utf8')
console.log('Updated:\n', updated)

/*
1. fs.writeFileSync() creates a new file or overwrites the existing file with
   the given content.
2. fs.appendFileSync() adds new content to the end of an existing file without
   removing the previous content. If the file does not exist, it creates it.
*/

const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

/*
If readFileSync() is called on a file that does not exist, Node.js throws an
ENOENT (Error NO ENTry) error because it cannot find the specified file.
To handle this properly, first check if the file exists using fs.existsSync(),
or use a try-catch block to catch the error and respond appropriately instead
of allowing the application to crash.
*/