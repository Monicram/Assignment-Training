// Task A — define a tuple for a user record: [name, age, isActive]
const userRecord: [string, number, boolean] = ["Alice", 30, true];

// Task B — access each element and prove TS knows the type
console.log(userRecord[0].toUpperCase()); 
console.log(userRecord[1].toFixed(2));    
console.log(userRecord[2].toString());    

// Task C — try to put values in the wrong order
// const wrongOrder: [string, number, boolean] = [30, "Alice", true];
// The type is mismatched because it is in wrong order.

// Task D — create a tuple for a coordinate pair [latitude, longitude]
const coordinates: [number, number] = [19.076, 72.877];