const os = require('os')

// Returns the operating system platform.
console.log('Platform:     ', os.platform())

// Returns the CPU architecture.
console.log('Architecture: ', os.arch())

// Returns the hostname of the system.
console.log('Hostname:     ', os.hostname())

// Returns the current user's home directory.
console.log('Home dir:     ', os.homedir())

// Returns the number of CPU cores available on the system.
console.log('CPU cores:    ', os.cpus().length)

// Calculates the total system memory in megabytes.
const totalMB = Math.round(os.totalmem() / 1024 / 1024)

// Calculates the available free memory in megabytes.
const freeMB = Math.round(os.freemem() / 1024 / 1024)

// Displays the free and total system memory in megabytes.
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`)


const platform = os.platform()

if (platform === 'win32') {
  console.log('Running on Windows')
} else if (platform === 'darwin') {
  console.log('Running on Mac')
} else {
  console.log('Running on Linux')
}

const freePercent = Math.round((os.freemem() / os.totalmem()) * 100)
if (freePercent < 20) {
  console.log('Warning: Low memory —', freePercent + '% free')
} else {
  console.log('Memory OK —', freePercent + '% free')
}

/*A Node.js application may check the operating system at runtime to execute
platform-specific commands or use file paths. For example, a backup
application might use "dir" on Windows and "ls" on Linux/macOS, or it may
store files in different default locations depending on the operating system.
*/