// Task A
type Predicate<T> = (value: T) => boolean;
type Transform<T, U> = (value: T) => U;
type EventHandler = (eventName: string, payload: unknown) => void;

// Task B
function filter<T>(items: T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate);
}

function transform<T, U>(items: T[], fn: Transform<T, U>): U[] {
  return items.map(fn);
}

// Task C
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = filter(numbers, (num) => num % 2 === 0);
console.log(evenNumbers); 

const stringNumbers = transform(numbers, (num) => num.toString());
console.log(stringNumbers); 

// Example
const handleEvent: EventHandler = (eventName, payload) => {
  console.log(eventName, payload);
};

handleEvent("login", { user: "Monica" });