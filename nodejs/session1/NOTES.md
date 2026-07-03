# package.json Notes

- **name** - The name of the project.
- **version** - The current version of the project.
- **description** - A short summary of the project.
- **main** - The main JavaScript file that starts the project.
- **scripts** - Commands that can be run using npm.
- **keywords** - Words that describe the project.
- **author** - The name of the project author.
- **license** - The license that defines how the project can be used.

## npm Scripts

npm scripts make it easy to run commands with short names.
They help teams use the same commands without remembering long or complex commands.

## dependencies vs devDependencies

- dependencies are packages needed to run the application.
- devDependencies are packages needed only during development. `nodemon` belongs here because it helps developers by automatically restarting the app when files change.

## package.json vs package-lock.json

- package.json lists the project's dependencies and settings.
- package-lock.json stores the exact versions of installed packages to ensure everyone installs the same versions.

## __dirname and __filename

- __dirname gives the current folder path.
- __filename gives the current file path.
- They are not available in ES Modules.
- ES Modules use import.meta.url instead.

## npm install vs npm ci

- npm install installs packages and updates package-lock.json if needed.
- npm ci installs the exact versions from package-lock.json and is mainly used in CI/CD.