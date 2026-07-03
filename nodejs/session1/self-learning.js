
// Task 1: fs.promises with async/await

// Rewrite the file operations using fs.promises and async/await for better readability and error handling.

// Task 2:
// __dirname gives the current folder path.
// __filename gives the current file path.
// They are not available in ES Modules.
// ES Modules use import.meta.url instead.

// Task 3: readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your name: ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
});

// Task 4:
// npm install installs packages and updates package-lock.json if needed.
// npm ci installs the exact versions from package-lock.json and is mainly used in CI/CD.