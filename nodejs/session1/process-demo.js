//Task 2.1

console.log("Node version:", process.version)
console.log("Platform:", process.platform)
console.log("Current directory:", process.cwd())
console.log("Memory usage:", process.memoryUsage())

//Node version: Returns the installed Node.js version. Useful for checking compatibility.
// Platform: Returns the operating system (Windows, Linux, or macOS). Useful for platform-specific code.
// Current directory: Returns the current working directory. Useful for finding project files.
// Memory usage: Returns the memory used by the Node.js process. Useful for monitoring application performance.

const args = process.argv
console.log("All arguments:", args)
console.log("Your input:", args[2])

// Command line arguments let users give input while running a program.
// They are useful for passing file names, options, or user data.

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);

//Environment variables keep sensitive information like API keys and database URLs
//outside the code, making applications more secure and easier to manage.
