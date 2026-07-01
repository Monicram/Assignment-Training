interface User {
  readonly id: number; 
  name: string;
  email: string;
  age?: number; 
  role: "admin" | "editor" | "viewer"; 
}
//1. Create three objects

const admin: User = {
  id: 1,
  name: "Monica",
  email: "monica@mail.com",
  age: 21,
  role: "admin",
};

const editor: User = {
  id: 2,
  name: "John",
  email: "john@mail.com",
  role: "editor",
};

const viewer: User = {
  id: 3,
  name: "Mohan",
  email: "Mohan@mail.com",
  age: 25,
  role: "viewer",
};

// 2. Invalid role assignment

//const invalid: User = {
// id: 4,
// name: "Alex",
// email: "alex@example.com",
// role: "superuser", 
// };


// Type '"superuser"' is not assignable to type
// "admin" | "editor" | "viewer"


// 3. Attempting to change readonly id

// admin.id = 10; 

// cannot change it because readonly 


// readonly prevents unwanted changes to the user ID.
// TypeScript catches error during the runtime and making the code safer.