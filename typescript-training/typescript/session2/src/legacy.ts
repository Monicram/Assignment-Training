interface Item {
  price: number;
  quantity: number;
}

interface User {
  firstName: string;
  lastName: string;
  title?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

function calculateInvoiceTotal(items: Item[],taxRate: number): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  const tax = total * taxRate;
  return total + tax;
}
function formatCurrency(amount: number,currencyCode: string): string {
  return currencyCode + amount.toFixed(2);
}
function getUserDisplayName(user: User): string {
  if (user.title) {
    return user.title + " " + user.firstName + " " + user.lastName;
  }

  return user.firstName + " " + user.lastName;
}

function findProductByCategory(products: Product[],category: string): Product[] {
  return products.filter((p) => p.category === category);
}