class Logger {
  private static instance: Logger | null = null;
  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}

const a = Logger.getInstance();
const b = Logger.getInstance();

a.log("system started");
b.log("request received");

console.log(a === b);             // true
console.log(a.getLogs().length);  // 2

function testLoggerStartsEmpty(): void {
  const logger = Logger.getInstance();
  logger.log("left over from a previous operation");

  const fresh = Logger.getInstance();
  console.log("Logs should be empty:", fresh.getLogs());
}

function testLoggerCountsCorrectly(): void {
  const logger = Logger.getInstance();
  logger.log("entry one");

  console.log("Expected 1 log, got:", logger.getLogs().length);
}

testLoggerStartsEmpty();
testLoggerCountsCorrectly();

// Task 1.1
// If the private constructor is removed, anyone can create multiple Logger objects using `new Logger()`. 
// This breaks the Singleton pattern because there would no longer be a single shared instance. 
// The breakage can be detected by creating multiple Logger objects and observing that they are
// different objects with separate log buffers.

// Task 1.3
// The second test gets the wrong result because the Logger Singleton
// shares the same instance and log data between tests. This means one
// test affects another, breaking test isolation. In a real test suite,
// a resetLogs() or clearLogs() method could be added to the Logger class
// so that each test starts with an empty log buffer.