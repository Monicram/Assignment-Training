const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

const raw   = fs.readFileSync(filePath, 'utf8')
const users = JSON.parse(raw)

console.log('All users:', users)
console.log('Total:', users.length)

const top = users.filter(u => u.score >= 90)
console.log('Top scorers:', top.map(u => u.name))

const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length
console.log('Average score:', avg.toFixed(1))

/*
JSON.parse() converts a JSON-formatted string into a JavaScript object or array,
allowing the data to be accessed and manipulated in the program.
Without JSON.parse(), the data read from the file would remain a plain string,
so methods like filter(), map(), or accessing properties such as
users.length and users[0].name would not work correctly.
*/

// Add a new user
const newUser = { id: 5, name: 'Vikram', role: 'intern', score: 88 }
users.push(newUser)

// Write back to file
const updated = JSON.stringify(users, null, 2)
fs.writeFileSync(filePath, updated)
console.log('User added and file updated')

// Verify
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log('Total after update:', verify.length)

/*
In JSON.stringify(users, null, 2), the value null means no custom replacer is
used, and 2 specifies that the JSON should be indented with 2 spaces.

This makes the JSON file easy to read and properly formatted. Without null, 2,
the JSON would be written as a single compact line, making it harder for humans
to read and edit.
*/

const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const index = currentData.findIndex(u => u.name === 'Amit')
if (index !== -1) {
  currentData[index].score = 90
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
  console.log('Amit score updated to 90')
}

/*
Array.find() returns the first element that matches the given condition.

Array.findIndex() returns the index (position) of the first matching element.
If no match is found, it returns -1.

find() can be used when we only need to read or access the matching object.
Use findIndex() can be used when we need to update, replace, or remove an element in the array.
*/