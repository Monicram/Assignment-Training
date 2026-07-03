const os = require('os')

console.log("Platform:", os.platform())
console.log("Architecture:", os.arch())
console.log("Hostname:", os.hostname())
console.log("Home directory:", os.homedir())
console.log("CPUs:", os.cpus().length)
console.log("Total memory (MB):", Math.round(os.totalmem() / 1024 / 1024))
console.log("Free memory (MB):", Math.round(os.freemem() / 1024 / 1024))

// A Node.js app can use platform and memory information to improve performance.
// For example, it can adjust its behavior based on the operating system or available memory.