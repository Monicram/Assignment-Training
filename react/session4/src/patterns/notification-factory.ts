interface Notifier {
  send(recipient: string, message: string): void;
}

class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} — ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} — ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} — ${message}`);
  }
}

class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} — ${message}`);
  }
}

function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case "email":
      return new EmailNotifier();
    case "sms":
      return new SMSNotifier();
    case "push":
      return new PushNotifier();
    case "slack":
      return new SlackNotifier();
    default:
      throw new Error(
        `createNotifier: unknown channel '${channel}', expected one of: email, sms, push, slack`
      );
  }
}

const channels = ["email", "sms", "push", "slack"];

for (const channel of channels) {
  const notifier = createNotifier(channel);
  notifier.send("user@example.com", "Your order has been confirmed.");
}

// Task 2.2
// The send() call is the same for all notification types because each
// class implements the Notifier interface. The interface provides a
// common method that the caller can use without knowing the concrete
// class. Without the interface, the loop would need to create each
// notifier class directly and handle each type separately.

// Task 2.3
// Only two existing lines needed to be changed: one line in the factory
// to support the "slack" case and one line in the channels array.
// This shows that the Factory pattern is easy to extend because new
// notification types can be added with minimal changes to the existing code.