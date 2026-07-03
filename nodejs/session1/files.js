const fs = require('fs')

// Write a file
fs.writeFileSync('nodejs/session1/output.txt', 'Hello from Node.js file system!')

// Read it back
const content = fs.readFileSync('nodejs/session1/output.txt', 'utf8')
console.log("File content:", content)

// Append to it
fs.appendFileSync('nodejs/session1/output.txt', '\nThis line was appended.')

// Read again
const updated = fs.readFileSync('nodejs/session1/output.txt', 'utf8')
console.log("Updated content:", updated)

//writeFileSync creates a new file or replaces the existing content. appendFileSync adds new content to the end of the existing file.

const fs = require('fs').promises;

async function fileOperations() {
    await fs.writeFile('nodejs/session1/output.txt', 'Hello from Node.js file system!');

    const content = await fs.readFile('nodejs/session1/output.txt', 'utf8');
    console.log("File content:", content);

    await fs.appendFile('nodejs/session1/output.txt', '\nThis line was appended.');

    const updated = await fs.readFile('nodejs/session1/output.txt', 'utf8');
    console.log("Updated content:", updated);
}

fileOperations();