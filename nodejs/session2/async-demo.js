const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Synchronous
console.log('1 — before sync read')
const data = fs.readFileSync(filePath, 'utf8')
console.log('2 — sync read done:', data.split('\n').length, 'lines')
console.log('3 — after sync read')

console.log('---')

// Asynchronous
console.log('4 — before async read')
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err
  console.log('6 — async read done:', data.split('\n').length, 'lines')
})
console.log('5 — after async read (does not wait)')

/*
Synchronous operations block the program until they finish, so other requests
must wait. Asynchronous operations do not block execution, allowing the server
to continue handling other users while the file is being read. This improves
performance and responsiveness when many users access the server at the same time.
Thats why the orderring is important.
*/