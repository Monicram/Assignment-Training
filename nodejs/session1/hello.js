// Task 1.1 — Hello from Node
const message = "Hello from Node.js"
console.log(message)

const fruits = ["apple", "banana", "mango"]
const upper = fruits.map(f => f.toUpperCase())
console.log(upper)

// Browser JavaScript runs inside a web browser and can interact with the HTML page using the DOM.
// Node.js JavaScript runs outside the browser in a server/runtime environment.
// It does not need an HTML file and displays output directly in the terminal.

// Task 1.2 — The REPL

// REPL stands for Read-Eval-Print Loop.
// It is an interactive Node.js environment where we can quickly test JavaScript code,debug expressions, and experiment without creating a separate file.