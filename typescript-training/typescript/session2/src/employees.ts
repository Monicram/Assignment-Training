// Step 1
interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

// Step 2
interface Employee extends Person {
  readonly employeeId: string;
  department: string;
  startDate: Date;
}

// Step 3
interface Manager extends Employee {
  teamSize: number;
  directReports: string[];
}

// Step 4
function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

// Step 5
function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${
    employee.department
  }, joined on ${employee.startDate.toLocaleDateString()}`;
}

// Person 
const person: Person = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
};

// Employee 
const employee: Employee = {
  employeeId: "EMP001",
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  department: "Engineering",
  startDate: new Date("2024-01-01"),
};

// Manager 
const manager: Manager = {
  employeeId: "MGR001",
  firstName: "Bob",
  lastName: "Smith",
  email: "bob@example.com",
  department: "Engineering",
  startDate: new Date("2023-06-15"),
  teamSize: 5,
  directReports: ["EMP001", "EMP002", "EMP003"],
};

console.log(getFullName(person));
console.log(getFullName(employee));
console.log(getFullName(manager));

console.log(introduceEmployee(employee));
console.log(introduceEmployee(manager));


// Employee extends Person and Manager extends Employee.
// Therefore, Employee and Manager contain all Person properties,
// so they can be used wherever a Person is expected.
