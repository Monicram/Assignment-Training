// Error 1: Property 'username' does not exist on type 'User'.

// Trying to access a property that is not defined in the User type.

// Code:
interface User {
  name: string;
}

const user: User = { name: "Monica" };
// console.log(user.username);

// console.log(user.name);



// Error 2: Argument of type 'string' is not assignable to parameter of type 'number'.

// A string value was passed where a number was expected.

function square(num: number): number {
  return num * num;
}

// square("5");

// square(5);



// Error 3: Parameter 'data' implicitly has an 'any' type.

// A function parameter has no type annotation when strict mode is enabled.

// function print(data) {
//   console.log(data);
// }

function print(data: string): void {
  console.log(data);
}



// Error 4: Object is possibly 'undefined'.

// TypeScript cannot guarantee that the object exists before use.

const users = ["Alice", "Bob"];
const found = users.find((u) => u === "John");

// found.toUpperCase();

if (found !== undefined) {
  found.toUpperCase();
}



// Error 5: Type 'string | undefined' is not assignable to type 'string'.

// A variable may be undefined but is being assigned to a string-only variable.

interface Person {
  name?: string;
}

const person: Person = {};

// const userName: string = person.name;

const userName: string = person.name ?? "Unknown";