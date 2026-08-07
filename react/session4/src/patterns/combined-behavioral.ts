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

type PriceChangeEvent = {
  product: string;
  oldPrice: number;
  newPrice: number;
};

class PricingEngine extends Subject {
  updatePrice(
    product: string,
    oldPrice: number,
    newPrice: number
  ): void {
    this.notify({ product, oldPrice, newPrice });
  }
}

class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    const discount =
      ((event.oldPrice - event.newPrice) / event.oldPrice) * 100;

    if (discount > 10) {
      console.log(
        `[Discount] ${event.product} dropped by ${discount.toFixed(
          2
        )}% — alert sent`
      );
    }
  }
}

class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`
    );
  }
}

class BudgetTrackerObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    if (event.newPrice < 2000) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`
      );
    }
  }
}

const engine = new PricingEngine();

engine.subscribe(new DiscountAlertObserver());
engine.subscribe(new PriceHistoryObserver());
engine.subscribe(new BudgetTrackerObserver());

engine.updatePrice("Monitor", 18999, 14999);
engine.updatePrice("Keyboard", 2499, 1999);
engine.updatePrice("Mouse", 899, 849);

// Task 3.1
// For Monitor, the DiscountAlertObserver and PriceHistoryObserver react,
// but BudgetTrackerObserver does not because the new price is above 2000.
// For Keyboard, all three observers react because the price dropped by
// more than 10% and the new price is below 2000.
// For Mouse, only PriceHistoryObserver and BudgetTrackerObserver react.
// The discount is less than 10%, so DiscountAlertObserver does not react.

// Task 3.2
// Behavioral Pattern Audit

// File reviewed: strategy.ts

// 1. Is there any object that directly calls methods on multiple other objects
// in response to a state change?
// Possible Observer problem? No — Reason: The file focuses on sorting products and does not notify multiple objects when something changes.

// 2. Is there any function or method with a growing if/else block that selects
// different behaviour based on a type, mode, or string value?
// Possible Strategy problem? Yes — Reason: Different sorting methods can be handled using separate strategies instead of adding more if/else conditions.

// 3. Rule of three check:
// If Observer: No, this pattern does not appear.
// If Strategy: Yes, different sorting options are expected to grow over time.

// 4. If a pattern fits: describe in one sentence what the refactored structure
// would look like.
// Create a separate strategy class for each sorting method and switch between them through a common interface.

// 5. If no pattern fits: what is the simpler solution, and why is the pattern
// unnecessary here?
// Observer is unnecessary because there is no event or state change that needs to notify multiple objects.


// Explore 1:
// If one observer throws an error, notify() stops and the remaining
// observers will not run. For example, if EmailService throws an error,
// AuditLog will not receive the update. This can be fixed by wrapping
// each observer call in a try/catch block so the other observers still run.

// Explore 2:
// EventEmitter provides built-in methods for adding, removing, and managing
// event listeners. It is more reliable and has more features than writing
// a custom Subject class from scratch.

// Explore 3:
// A class-based strategy can store configuration, such as the field name
// and sort direction. A closure can also store values, but a class is
// easier to extend and maintain when the strategy becomes more complex.

// Explore 4:
// Combining Factory and Strategy lets the caller request a strategy using
// only a string value. The Factory creates the correct strategy object,
// making the code cleaner and easier to extend when new strategies are added.