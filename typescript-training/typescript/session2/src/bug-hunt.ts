interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}

// Bug 1
function applyDiscount(product: Product): number {
  return product.price - (product.discount ?? 0);
}

// If discount is undefined, the result could become NaN.
// TypeScript warns that optional values may not exist.

// Bug 2
function getTagSummary(product: Product): string {
  return product.tags.join(", ").toUpperCase();
}

// toUppercase() does not exist and would cause an error.
// The correct method name is toUpperCase().



// Bug 3
function createProduct(name: string, price: number): Product {
  return {
    id: Math.random().toString(),
    name: name,
    price: price,
    tags: []
  };
}


// Without parameter types, TypeScript reports implicit any errors.
// Wrong value types could be passed at runtime.



// Bug 4
function findCheapest(products: Product[]): Product | undefined {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  return sorted[0];
}

/*
If the array is empty, sorted[0] is undefined.
Returning Product directly would be unsafe.
*/


// Bug 5
function printProduct(product: Product): void {
  console.log(`${product.name} costs ${product.price}`);
}


// A function returning void should not return a value.
// Returning product.name violates the function signature.
