interface Observer {
  update(data: unknown): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  protected notify(data: unknown): void {
    this.observers.forEach(o => o.update(data));
  }
}
type Order = {
  id: string;
  customerEmail: string;
  total: number;
};

class OrderStore extends Subject {
  private orders: Order[] = [];

  placeOrder(order: Order): void {
    this.orders.push(order);
    this.notify(order);
  }

  cancelOrder(id: string): void {
    const order = this.orders.find(o => o.id === id);

    if (order) {
      this.orders = this.orders.filter(o => o.id !== id);
      this.notify({ cancelled: true, order });
    }
  }

  getOrders(): Order[] {
    return [...this.orders];
  }
}

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const order = data as Order;
    console.log(`[ShipmentQueue] scheduling delivery for ${order.id}`);
  }
}

class EmailService implements Observer {
  update(data: unknown): void {
    const order = data as Order;
    console.log(
      `[EmailService] sending confirmation to ${order.customerEmail}`
    );
  }
}

class AuditLog implements Observer {
  update(data: unknown): void {
    const order = data as Order;
    console.log(
      `[AuditLog] recorded order ${order.id} at ${new Date().toISOString()}`
    );
  }
}

const store = new OrderStore();
const shipment = new ShipmentQueue();
const email = new EmailService();
const audit = new AuditLog();

store.subscribe(shipment);
store.subscribe(email);
store.subscribe(audit);

store.placeOrder({
  id: "ORD-001",
  customerEmail: "alice@example.com",
  total: 1500,
});

store.placeOrder({
  id: "ORD-002",
  customerEmail: "bob@example.com",
  total: 800,
});
console.log("\n--- Unsubscribe AuditLog ---");

store.unsubscribe(audit);

store.placeOrder({
  id: "ORD-003",
  customerEmail: "carol@example.com",
  total: 200,
});

console.log("\n--- Subscribe AuditLog Again ---");

store.subscribe(audit);

store.placeOrder({
  id: "ORD-004",
  customerEmail: "david@example.com",
  total: 1200,
});
class AnalyticsService implements Observer {
  update(data: unknown): void {
    const order = data as Order;
    console.log(
      `[AnalyticsService] tracking purchase event for order ${order.id}, value: ${order.total}`
    );
  }
}

const analytics = new AnalyticsService();

store.subscribe(analytics);

console.log("\n--- AnalyticsService Added ---");

store.placeOrder({
  id: "ORD-005",
  customerEmail: "emma@example.com",
  total: 2500,
});

// Task 1.1
// notify is protected so that only the Subject class and its subclasses
// can notify observers. If notify were public, any code could call
// subject.notify("fake update"), causing observers to receive incorrect
// notifications even when no real change happened.

// Task 1.2
// Adding AuditLog did not require changing any lines inside OrderStore.
// Only a new observer was created and subscribed. This shows that the
// Observer pattern makes it easy to add new functionality without
// modifying the existing Subject class.

// Task 1.3
// In a real system, an observer may be unsubscribed when a user turns off
// email notifications or when a temporary service, such as analytics or
// logging, is disabled while the rest of the system continues to work.

// Task 1.4
// From placeOrder() alone, we cannot tell that four different actions
// happen because it only calls notify(). This can become a problem when
// many observers are added, making it harder to understand, debug, and
// predict what happens after placing an order. A long observer chain can
// also reduce performance because every observer runs whenever an update is sent.