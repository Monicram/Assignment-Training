
// Part A - any
let dangerousValue: any = "hello";
dangerousValue = 42;
dangerousValue = { name: "Alice" };
console.log(dangerousValue.foo.bar); 

// Part B — unknown
let safeValue: unknown = "hello";
//console.log(safeValue.toUpperCase()); 
//Here the value cannot be considered as any type before we specifying it. 

// Fix Part B — use a type check before using the value
if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase()); 
}