function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

greetUser("Alice");         // should work after your change
greetUser("Alice", "Dr.");  // should still work

// Task B — add a default value for 'role'
function createAccount(email: string, role?: string): object {
  return { email, role };
}

createAccount("alice@example.com");          // should default role
createAccount("bob@example.com", "admin");   // should use provided role