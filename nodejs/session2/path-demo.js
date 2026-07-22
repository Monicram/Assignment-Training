const path = require('path')

// Prints the absolute path of the folder containing this file.
// Useful for creating file paths that work from any location.
console.log('Current directory:', __dirname)

// Prints the absolute path of the current file.
// Useful when you need the exact location of the running file.
console.log('Current file:     ', __filename)

// Joins multiple path segments into one valid path.
// Useful for creating platform-independent file paths.
const filePath = path.join(__dirname, 'data', 'users.json')
console.log('Joined path:', filePath)

// Returns only the file name from a full path.
// Useful for extracting the file name.
console.log('Basename:', path.basename('/home/user/notes.txt'))

// Returns the file extension.
// Useful for identifying the file type.
console.log('Extension:', path.extname('index.html'))

// Returns the directory part of a file path.
// Useful for getting the parent directory of a file.
console.log('Dirname:  ', path.dirname('/home/user/notes.txt'))

// Manual string concatenation — fragile
const manual = __dirname + '/data/users.json'
console.log('Manual:    ', manual)

// path.join() — safe across all operating systems
const joined = path.join(__dirname, 'data', 'users.json')
console.log('path.join: ', joined)

// path.resolve() — always returns an absolute path
const resolved = path.resolve('data', 'users.json')
console.log('Resolved:  ', resolved)

/*
1. path.join() combines multiple path segments into a single path. If the input is relative,
   the result is also a relative path unless an absolute path is provided.

2. path.resolve() resolves the given path into an absolute path. If a relative path is given,
   it starts from the current working directory and returns the complete absolute path.

3. path.join() can be used when we want to safely combine folder and file names.
   path.resolve() can be used when we need the absolute location of a file or directory.
*/