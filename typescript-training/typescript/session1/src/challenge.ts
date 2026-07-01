// Challenge 1

function fail(message: string): never {
  throw new Error(message);
}

function calculateDiscount(price: number, discountPercent?: number): number {
  if (discountPercent === undefined) {
    return price;
  }

  if (discountPercent >= 100) {
    fail("Invalid discount");
  }

  return price - (price * discountPercent) / 100;
}

// Challenge 2

function formatUserList(users: [string, number][]): string[] {
  return users.map(user => `${user[0]} (${user[1]} years)`);
}

// Challenge 3

function findFirst(arr: string[], searchTerm: string): string | undefined {
  for (let item of arr) {
    if (item === searchTerm) {
      return item;
    }
  }
  return undefined;
}