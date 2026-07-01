// Task A
function describe(value: string | number | boolean | null): string {
  if (value === null) {
    return "No value provided";
  }

  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }

  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }

  return `Boolean: ${value}`;
}

// Task B
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}

// Task C
function summarise(input: string | number[] | { label: string }): string {
  if (typeof input === "string") {
    return `String: ${input}`;
  }

  if (Array.isArray(input)) {
    return `Array with ${input.length} numbers`;
  }

  return `Label: ${input.label}`;
}

// Discriminated unions

interface Cat2 {
  kind: "cat";
  meow(): void;
}

interface Dog2 {
  kind: "dog";
  bark(): void;
}

type Animal = Cat2 | Dog2;

function makeSound2(animal: Animal): void {
  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
}

// Discriminated unions use a common property such as 'kind' for type checking.
// They are safer and clearer than checking properties with the 'in' operator.