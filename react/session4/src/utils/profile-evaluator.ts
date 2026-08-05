export interface ProfileData {
  name: string
  score: number
  isPresent: boolean
}

// AFTER: Flattened with Guard Clauses
export function evaluateProfile(data: ProfileData): string {
  // 1. Guard against bad data immediately (Early Returns/Throws)
  if (data.name.trim() === "") throw new Error("Profile Rejected: Name is missing.")
  if (!data.isPresent) throw new Error("Profile Rejected: Intern is not present.")
  if (data.score < 50) throw new Error("Profile Rejected: Score too low.")

  // 2. The Happy Path is un-nested at the bottom!
  return "Profile Approved: Ready for project assignment."
}


//   Task 5.1 
//   How many levels of nesting did the before have? 
//   The original function had 3 levels of nesting (`if` inside an `if` inside an `if`).
//   How many does the after have? 
//   Zero. The code is completely flat.
//   Does the after read more like a sentence?
//   Yes. It reads like a clear checklist: "If missing name, stop. If absent, stop. If score is low, stop. Otherwise, approve." It removes the cognitive load of tracking deeply nested brackets.
