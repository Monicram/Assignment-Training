console.log("Hello");

console.log("Section 1 - Variables and Types");

console.log("1. Creation of Variables");

const profile = {
    name: "Monica",
    age: 20,
    role: "Intern",
    isAvailable: true
};

console.log(profile);

console.log("2. Type of Each Variable");

console.log(typeof profile.name);
console.log(typeof profile.age);
console.log(typeof profile.role);
console.log(typeof profile.isAvailable);

console.log("3. Error during reassigning a const keyword");

console.log("A const variable cannot be reassigned. It shows Syntaxerror while reassigning const variable.");

console.log("Section 2 - Template Literals");

const personName = "Alice";
const personRole = "dev";
const available = true;

console.log(`Hi, I'm ${personName} and I'm a ${personRole}.`);
console.log(`Available: ${available}`);
console.log(`My name has ${personName.length} characters`);

console.log("Section 3 - Arrow Functions");

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Alice", "Johnson"));

const isAdult = (age) => age >= 18;
console.log(isAdult(20));

const formatUser = (user) => `${user.name} - ${user.role}`;

const userInfo = {
    name: "Alice",
    role: "dev"
};

console.log(formatUser(userInfo));

console.log("Section 4 - Objects and Destructuring");

const users = {
    id: 1,
    name: "Alice",
    role: "dev",
    active: true,
    address: {
        city: "Mumbai",
        country: "India"
    }
};

console.log(users);

const {name: userName,role: userRole,active} = users;

console.log(userName, userRole, active);

const { address: { city }} = users;

console.log(city);

const updatedUser = {...users,active: false};

console.log(updatedUser);

console.log("Section 5 - Arrays and Spread");

const devs = ["Alice", "Carol"];
const designers = ["Bob", "Dan"];

const team = [...devs, ...designers];

console.log(team);

const updatedTeam = [...team, "Eve"];

console.log(updatedTeam);

const [first, second] = team;

console.log(first);
console.log(second);

console.log("Section 6 - Array map and filter");

const users1 = [
    { id: 1, name: "Alice", role: "dev", active: true },
    { id: 2, name: "Bob", role: "design", active: false },
    { id: 3, name: "Carol", role: "dev", active: true },
    { id: 4, name: "Dan", role: "design", active: true },
    { id: 5, name: "Eve", role: "dev", active: false }
];

const activeUsers = users1.filter(u => u.active).map(u => u.name);

console.log(activeUsers);

const devUsers = users1.filter(u => u.role === "dev");

console.log(devUsers);

const userDetails = users1.map( u => `${u.name} is a ${u.role}`);

console.log(userDetails);

const activeDevs = users1.filter(u => u.active && u.role === "dev").map(u => u.name);

console.log(activeDevs);

console.log("Section 7 - Array Functions");

const roleCount = users1.reduce((acc, user) => {acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
}, {});

console.log(roleCount);

const activeDesigner = users1.find(u => u.active && u.role === "design");

console.log(activeDesigner);

const hasInactiveUser = users1.some( u => !u.active);

console.log(hasInactiveUser);

const allHaveRole = users1.every( u => u.role);

console.log(allHaveRole);

console.log("Section 8 - Spot & Fix the Bugs");

const input = "5";
const score = 5;

if (input === score) {
    console.log("match");
}

console.log(input === score); 

const doubled = [1, 2, 3].map(n => {
    return n * 2;
});

console.log(doubled);

const original = [1, 2, 3];

const newArray = [...original, 4];

console.log(original);
console.log(newArray);

const userStatus = {
    name: "Alice",
    active: true
};

userStatus.active = false;

console.log(userStatus);

console.log("Section 9 - Things to be Aware Of");

const Username = "Alice";
const username = "Bob";

console.log(Username);
console.log(username);


const a = null;
const b = undefined;

console.log(typeof a); 
console.log(typeof b); 

// null = absence of value
// undefined = value not assigned

const greet = (name) => `Hello, ${name}`;

console.log(greet("Alice"));

// Arrow functions must be defined before they are called.

const p = 10;
const q = 20;

