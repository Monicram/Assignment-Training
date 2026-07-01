// Task A — annotate these arrays
const fruits = ["apple", "banana", "cherry"];
const temperatures = [22.5, 19.0, 30.1];
const flags = [true, false, true];

// Task B — try adding wrong types
//fruits.push(42);
//Based on the Inference, it infer the type of the array as string. Hence, the number is not the type of the array.        
//temperatures.push("hot"); 
//Here the same but type is different.        

// Task C — create a mixed-type array using a union type
const mixed: (string | number)[] = ["Alice", 1, "Bob", 2];
//mixed.push(true); 

//In the mixed type, there is no boolean type.