// 1. Union Types

let id: string | number = 101;
let status: "success" | "failure" = "success";
let value: number | null = null;

// 2. Literal Types 

function sendRequest(method: "GET" | "POST"): void {
  console.log(`Request method: ${method}`);
}

sendRequest("GET");
sendRequest("POST");

// 3. Readonly Array

const fruits: readonly string[] = ["Apple", "Banana"];

// fruits.push("Orange"); // Error

// Readonly prevents modifying the array.
// It is useful when data should not be changed.

// 4. strictNullChecks 

let username: string | null = null;

// username.toUpperCase(); This shows error with strictNullChecks enabled

if (username !== null) {
  console.log(username.toUpperCase());
}
