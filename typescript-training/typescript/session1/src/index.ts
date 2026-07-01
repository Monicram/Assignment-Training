// Section 1 - Setup

// Task 1.1 - Initialise a TypeScript Project
console.log("TypeScript is running");

// Task 1.2 — Understand `tsc --noEmit`
const age: number = 30;
//tsc --noEmit only checks for errors without creating any javaScript files but the tsc converts the typescipt file into a javascript file with the error.

// Task 1.3 — Strict Mode Flags

//noImplicitAny prevents typeScript from Inferencing types to any.It forces to declare the types explicitly.
//strictNullChecks checkss null and undefined must be explicitly handled in types.

// Section 2 — Why TypeScript

// Task 2.1 - Experience a Runtime Bug

//TypeError: Cannot read properties of undefined (reading 'toUpperCase')
//fullName is misspelled in the code so the error occurs.

//In Typescript it shows the error whike writing the correct so that the error could be avoided.

//.ts and .js dif
//In the .js file, I discovered the bug only when I ran the program and it crashed at runtime. In the .ts file, TypeScript detected the error during compilation/type checking before the code was executed.

// Task 2.2 — Understand Transpilation

 function add(a: number, b: number): number {
     return a + b;
   }
   console.log(add(2, 3));

//1. The type annotations (: number) were removed during compilation. TypeScript strips all type information and generates plain JavaScript.
//2. safety exists only during development and compilation. After compilation, the JavaScript file contains no type information

// Section 3 — Type Basics

// Task 3.1 — Primitive Types

//1. Type 'number' is not assignable to type 'string'.
//2. Type 'string' is not assignable to type 'number'.
//3. Type 'number' is not assignable to type 'boolean'.
 
// These are the errors tat occurs during the reassigning of vaiables with wrong type.

// Task 3.2 — Type Inference vs Explicit Annotation

// TypeScript assigns the type any when it cannot infer a type.
// Variables of type any can store values of any type, so both
// hello and 42 are allowed for the variable mystery.

// Task 3.3 — `any` vs `unknown`

// Type narrowing means checking the type of a variable before using it. 
// After the check, TypeScript knows the exact type and allows only the operations that are valid for that type.

// Task 3.4 — Arrays

// The string[] and Array<string> are the same.
// Both represent an array of strings and can be used interchangeably.
// The difference is only in syntax.

// Task 3.5 — Tuples

// A tuple has a fixed number of elements and a fixed order.
// If I try to add a 4th element to a tuple that defines only 3 positions, typeScript gives an error because the tuple size does not match its definition.

// Section 4 — Functions

// Task 4.1 — Parameter and Return Types

// Adding parameter and return types helps TypeScript catch mistakes early.
// If I pass the wrong type of argument, typeScript shows an error before the code runs.

// Task 4.2 — Optional and Default Parameters

// An optional parameter can be omitted and its value becomes undefined. 
// when no argument is provided. 
// I would use an optional parameter when the value is not required.

// Task 4.3 — `void` and `never`

// function has type 'never' when it never reaches the end of execution. 
// This can happen when it always throws an error 
// so it never returns any value.

// Task 4.4 — Putting It All Together

// This challenge uses functions, arrays, tuples, optional parameters, and the never type for error handling.