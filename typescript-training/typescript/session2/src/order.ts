
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Product {
  readonly id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  readonly id: string;
  customer: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

function calculateTotal(order: Order): number {
  let total = 0;
  for (let item of order.items) {
    total += item.product.price * item.quantity;
  }
  return total;
}


// A recursive type references itself.
// Example: TreeNode contains children: TreeNode[]. 

// interface TreeNode {
//   value: string;
//   children: TreeNode[];
// }
