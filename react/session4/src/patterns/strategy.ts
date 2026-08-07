type Product = {
  name: string;
  price: number;
  rating: number;
  salesCount: number;
};

interface SortStrategy {
  sort(products: Product[]): Product[];
}

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }
}

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
  }
}

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating);
  }
}

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.salesCount - a.salesCount);
  }
}

const products: Product[] = [
  { name: "Laptop", price: 60000, rating: 4.8, salesCount: 120 },
  { name: "Phone", price: 30000, rating: 4.6, salesCount: 250 },
  { name: "Tablet", price: 25000, rating: 4.4, salesCount: 180 },
  { name: "Headphones", price: 5000, rating: 4.7, salesCount: 320 },
];

console.log("Sort by Name:");
console.log(new SortByName().sort(products));

console.log("\nSort by Price:");
console.log(new SortByPrice().sort(products));

console.log("\nSort by Rating:");
console.log(new SortByRating().sort(products));

console.log("\nSort by Popularity:");
console.log(new SortByPopularity().sort(products));

class ProductCatalogue {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(products: Product[]): Product[] {
    return this.strategy.sort(products);
  }
}

const catalogueProducts: Product[] = [
  { name: "Keyboard", price: 2499, rating: 4.3, salesCount: 1200 },
  { name: "Monitor", price: 18999, rating: 4.7, salesCount: 340 },
  { name: "Headset", price: 3499, rating: 4.1, salesCount: 870 },
  { name: "Webcam", price: 1999, rating: 3.9, salesCount: 2100 },
  { name: "Mouse", price: 899, rating: 4.5, salesCount: 3400 },
];

const catalogue = new ProductCatalogue(new SortByName());

console.log("By name:", catalogue.sort(catalogueProducts).map(p => p.name));

catalogue.setStrategy(new SortByPrice());
console.log("By price:", catalogue.sort(catalogueProducts).map(p => p.name));

catalogue.setStrategy(new SortByRating());
console.log("By rating:", catalogue.sort(catalogueProducts).map(p => p.name));

catalogue.setStrategy(new SortByPopularity());
console.log("By popularity:", catalogue.sort(catalogueProducts).map(p => p.name));

class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price);
  }
}
catalogue.setStrategy(new SortByPriceDesc());
console.log(
  "By price desc:",
  catalogue.sort(catalogueProducts).map(p => p.name)
);

type SortFn = (products: Product[]) => Product[];

const sortByName: SortFn = p =>
  [...p].sort((a, b) => a.name.localeCompare(b.name));

const sortByPrice: SortFn = p =>
  [...p].sort((a, b) => a.price - b.price);

function applySort(products: Product[], fn: SortFn): Product[] {
  return fn(products);
}

console.log("\nFunction-based strategies:");

console.log(
  "By name:",
  applySort(catalogueProducts, sortByName).map(p => p.name)
);

console.log(
  "By price:",
  applySort(catalogueProducts, sortByPrice).map(p => p.name)
);

console.log(
  "By rating inline:",
  applySort(
    catalogueProducts,
    p => [...p].sort((a, b) => b.rating - a.rating)
  ).map(p => p.name)
);

// Task 2.1
// sort() should return a new array so the original product list is not changed.
// If sorting happens in place, one strategy can affect another.
// For example, after sorting by price, the original array is reordered.
// A later sort by name would no longer start with the original product order,
// which can cause unexpected results.

// Task 2.2
// The sort() call stays the same even when the sorting strategy changes.
// This shows that the Strategy interface allows different algorithms to
// be used without changing the calling code. With an if/else approach,
// the sort logic would be inside one method, making it harder to extend and maintain.

// Task 2.3
// Only two new lines were added to test the new strategy, and no existing
// strategy class or ProductCatalogue was changed. If a large if/else had
// been used, the existing sort logic would need to be modified every time
// a new sorting option was added.

// Task 2.4
// Class-based strategies are better when the strategy needs its own
// state, configuration, or additional methods. Function-based strategies
// work well for simple stateless logic, but they are not enough when the
// strategy needs to store data or perform more complex behavior.
