interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");

    return `${headers}\n${rows}`;
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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

// Task 2.1
// The caller only uses the ReportGenerator interface and the factory,
// so it does not depend on specific report classes. This makes the code
// easier to maintain and extend. Without the factory, the caller would
// need to create each concrete class directly and use multiple if/else
// or switch statements to handle different report formats.