// The Data: A clean dictionary object
const ROLE_LABELS: Record<string, string> = {
  Frontend: 'Frontend Developer',
  Backend: 'Backend Developer',
  Fullstack: 'Fullstack Developer',
}

// The Logic: A single O(1) property lookup
export function getRoleLabel(role: string): string {
  // The ?? operator returns 'Unknown' if the lookup results in null or undefined
  return ROLE_LABELS[role] ?? 'Unknown'
}

//   Task 5.2 
//   What happens when a new role needs to be added?
//   You only need to add a single key-value pair to the `ROLE_LABELS` object. The function's logic never has to be touched or modified again.
  
//   How does the lookup approach compare to adding a new else if?
//   It is much cleaner and less error-prone. A long `else if` chain adds repetitive boilerplate and increases the function's complexity. A lookup object separates the data from the execution, scales infinitely without getting harder to read, and executes faster as a direct property lookup (O(1) time).