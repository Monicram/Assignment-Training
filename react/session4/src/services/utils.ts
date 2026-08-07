// Internal helper functions.
// These are used only inside the services folder,
// so they should NOT be exported.

function formatInternName(name: string): string {
  return name.trim();
}

function isValidScore(score: number): boolean {
  return score >= 0 && score <= 100;
}

function createCacheKey(id: number): string {
  return `intern-${id}`;
}

export {};

// Task 4.1
//
// Exported symbols:
// - None
//
// Do callers outside services need them?
// - No.
//
// Therefore, all helper functions remain internal
// and the export keyword is removed.

// Task 4.2
//
// Created a barrel file (index.ts).
// Re-exported only the public API:
// - InternTracker
// - Intern
//
// Internal helper functions from utils.ts
// are not re-exported.

// Task 4.3
//
// Searched for direct imports of:
// - intern-service
// - score-service
// - attendance-service
//
// No matching imports were found.
// Therefore, no import statements needed to be updated.