// User interface from Task 1.1
interface User {
  readonly id: string;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}

// 1. Partial<T>
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

// 2. Pick<T, K>
type UserContact = Pick<User, "name" | "email">;

function sendWelcomeEmail(user: UserContact): void {
  console.log(`Welcome ${user.name}! Email sent to ${user.email}`);
}

// 3. Omit<T, K>
type NewUser = Omit<User, "id">;

function createUser(user: NewUser): User {
  return {
    id: Math.random().toString(),
    ...user
  };
}

// 4. Record<K, V>
type RolePermissions = Record<
  "admin" | "editor" | "viewer",
  string[]
>;

const permissions: RolePermissions = {
  admin: ["create", "read", "update", "delete"],
  editor: ["read", "update"],
  viewer: ["read"]
};

function getPermissions(
  role: "admin" | "editor" | "viewer"
): string[] {
  return permissions[role];
}

// Examples
const user: User = {
  id: "1",
  name: "Monica",
  email: "monica@example.com",
  role: "admin"
};

const updatedUser = updateUser(user, {
  age: 21
});

sendWelcomeEmail({
  name: "Monica",
  email: "monica@example.com"
});

const newUser = createUser({
  name: "John",
  email: "john@example.com",
  role: "viewer"
});

console.log(getPermissions("admin"));

// Partial makes all properties optional.
// Pick selects specific fields, Omit removes fields, and Record creates key-value mappings.