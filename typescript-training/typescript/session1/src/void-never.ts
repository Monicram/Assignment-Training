function logEvent(event: string): void {
  console.log(`[LOG] ${event}`);
}

const result = logEvent("user_login");
console.log(result); // what is the value of result?
//[LOG] user_login
//undefined

// Task B — never: function that always throws
function fail(message: string): never {
  throw new Error(message);
}

// Task C — try to return a value from a void function
function doSomething(): string {
  return "hello"; // what error do you get?
}

//Type 'string' is not assignable to type 'void'.