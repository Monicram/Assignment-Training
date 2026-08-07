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

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`
    );

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");
    return `${headers}\n${rows}`;
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`
    );

    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`
    );

    let html = "<table>\n";

    for (const row of data) {
      html += "  <tr>";
      for (const value of Object.values(row)) {
        html += `<td>${value}</td>`;
      }
      html += "</tr>\n";
    }

    html += "</table>";
    return html;
  }
}

function createReportGenerator(format: string): ReportGenerator {
  switch (format.toLowerCase()) {
    case "csv":
      return new CSVReportGenerator();
    case "json":
      return new JSONReportGenerator();
    case "html":
      return new HTMLReportGenerator();
    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
      );
  }
}

const data = [
  { name: "Alice", score: 91, department: "Backend" },
  { name: "Bob", score: 84, department: "Frontend" },
];

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

console.log(csv.generate(data));
console.log(json.generate(data));
console.log(html.generate(data));

console.log(Logger.getInstance().getLogs());

// Task 3.1
// The three report generators are separate objects, but they all use the
// same Logger Singleton. Without the Singleton pattern, we would need to
// create a Logger object and pass it to every report generator so they all
// write to the same log. The Singleton provides one shared logger instance
// that every generator can access directly.

// Task 3.2
// Pattern Recognition Audit
// File reviewed: notification-factory.ts
//
// 1. Is there any object that is created more than once but should be shared?
// → Possible Singleton? No — Each notifier is created only when it is needed, so there is no need to share a single instance.
//
// 2. Is there any conditional block (if/else or switch) that creates different objects
// based on a type or string value?
// → Possible Factory? Yes — The switch statement in createNotifier() creates different notifier objects based on the selected channel.
//
// 3. If a pattern applies: what would the refactored structure look like in one sentence?
// → The Factory pattern can be used so that createNotifier() returns the correct notifier without the caller worrying about which class is created.
//
// 4. If no pattern applies: what is missing that would make the pattern unnecessary
// complexity here?
// → A Singleton is not required because these notifier objects don't store shared data or need to be reused across the application.

// Explore 1:
// In a multi-threaded environment, two threads could create two different
// Singleton instances at the same time if both see instance as null.
// Double-checked locking helps avoid this problem. In Node.js, this is
// usually not an issue because JavaScript runs on a single thread, so only
// one call to getInstance() executes at a time.

// Explore 2:
// A Factory class can store its own configuration or state, while a Factory
// function simply creates and returns objects. I would use a Factory function
// for simple object creation and a Factory class when additional setup or
// configuration is needed.

// Explore 3:
// A NoOpNotifier is useful when it is acceptable to ignore unsupported
// notification types without stopping the program. Throwing an error is
// safer when an invalid notification type should be treated as a mistake
// that needs to be fixed immediately.

// Explore 4:
// A class-based Singleton provides better encapsulation because it keeps
// data and methods together and controls object creation. Module-level
// state is simpler, but a Singleton class is more suitable when the object
// has more complex behavior or needs additional methods.