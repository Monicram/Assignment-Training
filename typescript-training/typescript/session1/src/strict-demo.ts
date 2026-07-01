//function add(a, b) {
//return a + b;
//}

//Error when noImplicitAny is true

//COrrect Code

function add(a, b) {
  return a + b;
} 

//No error because noImplicitAny is false

//let username: string = null;

//Error

let username: string = null;
console.log(username);

//No error because nullchecks is false