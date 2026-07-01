// Function 1
function getFirstWord(sentence: string | null): string {
  if (sentence === null) {
    return "";
  }

  return sentence;
}


// If sentence is null, calling split() would cause a runtime error.
// TypeScript forces us to check for null before using string methods.



// Function 2
function getUserAge(user: { name: string; age?: number }): string {
  if (user.age === undefined) {
    return `${user.name} age not provided`;
  }

  return `${user.name} is ${user.age.toString()} years old`;
}

// If age is undefined, calling toString() would cause a runtime error.
// TypeScript warns that optional properties may not exist.


// Function 3
const config = {
  database: {
    host: "localhost",
    port: 5432
  }
};

function getDbPort(): number {
  return config.database.port;
}

// This is safe because database and port always exist.
// No runtime error occurs with the current object structure.


// Function 4
const users = ["Alice", "Bob", "Charlie"];

function findUser(name: string): string {
  const found = users.find((u) => u === name);

  if (found === undefined) {
    return "User not found";
  }

  return found.toUpperCase();
}


// find() returns undefined when no match is found.
// Calling toUpperCase() on undefined would cause a runtime error.