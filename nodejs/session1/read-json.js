const fs = require('fs')

const raw = fs.readFileSync('nodejs/session1/data.json', 'utf8')
const data = JSON.parse(raw)

console.log("All users:", data.users)
console.log("First user:", data.users[0].name)

const interns = data.users.filter(u => u.role === 'intern')
console.log("Interns:", interns.map(u => u.name))

//JSON.parse() converts a JSON string into a JavaScript object.
// If the JSON has a syntax error, Node.js throws an error and the program stops.