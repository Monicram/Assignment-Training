//Activity 1 - Understanding Async Behaviour

//1.
console.log("1")
setTimeout(() => console.log("2"), 1000)
console.log("3")

//JavaScript executes code line by line.
// setTimeout() is asynchronous, so it schedules the callback.
// Therefore "3" is executed before the callback that excutes "2".

//2.
console.log("1")
setTimeout(() => console.log("2"), 0)
console.log("3")

// Even with 0ms delay, setTimeout does not execute immediately.
// The callback is placed in the event and runs only after the current synchronous code finishes executing.
// It excutes similar to the above code.

//3.
console.log("Example using SetTimeout");

setTimeout(() => console.log("Data Received!"), 2000);

//Activity 2 — Promises

//1.

const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5
  setTimeout(() => {
    if (success) resolve("Data loaded!")
    else reject("Something went wrong")
  }, 1000)
})

getData
  .then((message) => console.log("Success:", message))
  .catch((error) => console.log("Error:", error));

//2.

const startValue = new Promise((resolve) => resolve(5));

startValue
  .then((num) => num * 2)
  .then((num) => num + 10)
  .then((result) => console.log("Final Result:", result));

//3.
  
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("User loaded"), 1000));

const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Orders loaded"), 1500));

Promise.all([promise1, promise2])
  .then((results) => console.log(results))
  .catch((error) => console.log(error));

//Activity 3 — async / await

// 1. Rewrite Promise chain using async/await

const fetchUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.log(error);
  }
};

fetchUser();


// 2. getUserById(id)

const getUserById = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return {
    name: user.name,
    email: user.email
  };
};

getUserById(3)
  .then((user) => console.log(user));


// 3. getAllUsers()

const getAllUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users.map((user) => ({
    name: user.name,
    email: user.email
  }));
};

getAllUsers()
  .then((users) => console.log(users));

//Activity 4 — Error Handling

//1.
const fetchUsers = async () => {
  try {
    const response = await fetch(
        fetch("https://jsonplaceholder.typicode.com/users/1")
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error.message);
  }
};
fetchUsers();

//2.

const fetchMissing = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/99999"
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Caught:", error.message);
  }
};

fetchMissing();

//3.

const request1 = fetch(
  "https://jsonplaceholder.typicode.com/users/1"
);
const request2 = fetch(
  "https://jsonplaceholder.typicode.com/invalid-url"
);
Promise.allSettled([request1, request2])
  .then((results) => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Request ${index + 1} succeeded`);
      } else {
        console.log(
          `Request ${index + 1} failed`
        );
      }
    });
  });

//Activity 5 — DOM: Select & Update

// 1. Change title text
const title = document.querySelector("#title");
title.textContent = "Hello, Intern!";

// 2. Change subtitle color to blue
const subtitle = document.querySelector("#subtitle");
subtitle.style.color = "blue";

// 3. Increment counter
const counter = document.querySelector("#counter");
let count = Number(counter.textContent);
count++;
counter.textContent = count;

// 4. Render names in user-list
const names = ["Alice", "Bob", "Carol"];
const userList = document.querySelector("#user-list");

names.forEach((name) => {
  const li = document.createElement("li");
  li.textContent = name;
  userList.appendChild(li);
});

// 5. Toggle class using classList
function toggleTitle() {
  title.classList.toggle("highlight");
}

toggleTitle();

//Activity 6 — Events

const greetBtn = document.querySelector("#greet-btn");
const addBtn = document.querySelector("#add-btn");
const resetBtn = document.querySelector("#reset-btn");
const nameInput = document.querySelector("#name-input");
const greeting = document.querySelector("#greeting");
const clickCount = document.querySelector("#click-count");

// 1. Greet button

greetBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name === "") {
    greeting.textContent = "Please enter a name";
  } else {
    greeting.textContent = `Hello, ${name}!`;
  }
});

// 2. Track clicks
let counts = 0;

addBtn.addEventListener("click", () => {
  counts++;
  clickCount.textContent = `Clicks: ${counts}`;
});

resetBtn.addEventListener("click", () => {
  counts = 0;
  clickCount.textContent = "Clicks: 0";
});

// 3. Live input
nameInput.addEventListener("input", () => {
  greeting.textContent = `Hello, ${nameInput.value}`;
});

// 4. Press Enter to trigger greet button
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    greetBtn.click();
  }
});

// Activity 7 — Fetch + DOM (Full Flow)

const loadBtn = document.querySelector("#load-btn");
const status = document.querySelector("#status");
const usersContainer = document.querySelector("#users-container");
const searchInput = document.querySelector("#search");

let allUsers = [];

//1. 
loadBtn.addEventListener("click", async () => {
  try {
    status.textContent = "Loading...";
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    allUsers = users;
    usersContainer.innerHTML = "";
    users.forEach((user) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>City: ${user.address.city}</p>
        <hr>
      `;
      usersContainer.appendChild(div);
    });

//2.
    status.textContent = `${users.length} users loaded`;
  } catch (error) {
    usersContainer.innerHTML = "";
    status.textContent =
      "Failed to load users. Try again.";
    console.log(error);
  }
});

//3.
searchInput.addEventListener("input", () => {
  const searchValue =
    searchInput.value.toLowerCase();
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchValue)
  );
  usersContainer.innerHTML = "";
  filteredUsers.forEach((user) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>
      <hr>
    `;
    usersContainer.appendChild(div);
  });
});

//Activity 8 — Self Learn

//1.
const getUserAndPosts = async () => {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    ]);
    const user = await userResponse.json();
    const posts = await postsResponse.json();
    console.log(`${user.name} has ${posts.length} posts`);
  } catch (error) {
    console.log(error);
  }
};
getUserAndPosts();

//2.

const users1 = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Carol" }
];
const userLists = document.createElement("ul");
users1.forEach((user) => {
  const li = document.createElement("li");
  li.textContent = user.name;
  userLists.appendChild(li);
});
document.body.appendChild(userLists);

//3.

allUsers = users1;
localStorage.setItem(
  "users",
  JSON.stringify(allUsers)
);

const savedUsers = JSON.parse(
  localStorage.getItem("users")
);

if (savedUsers) {
  allUsers = savedUsers;
  console.log("Users loaded from localStorage");
  console.log(allUsers);
}

//4.

const cancelBtn = document.querySelector("#cancel-btn");

let controller;

loadBtn.addEventListener("click", async () => {
  controller = new AbortController();
  try {
    status.textContent = "Loading...";
    const response = await fetch("https://jsonplaceholder.typicode.com/users",
      {
        signal: controller.signal
      }
    );

    const users = await response.json();

    status.textContent =
      `${users.length} users loaded`;
  } catch (error) {
    if (error.name === "AbortError") {
      status.textContent = "Fetch cancelled";
    } else {
      status.textContent =
        "Failed to load users";
    }
  }
});

cancelBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
  }
});