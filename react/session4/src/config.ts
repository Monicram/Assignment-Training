// src/config.ts
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'
const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? 'Intern Management Dashboard'

// Fail-Fast Startup Check: Validate critical config before app boots
if (!API_BASE || !API_BASE.startsWith('http')) {
  throw new Error(
    'config: VITE_API_BASE must be a valid HTTP/HTTPS URL. Add or fix it in your .env file.\n' +
    'Example: VITE_API_BASE=http://localhost:3000'
  )
}

if (!APP_TITLE.trim()) {
  throw new Error('config: VITE_APP_TITLE is required and cannot be empty.')
}

export const config = {
  apiBase: API_BASE,
  appTitle: APP_TITLE,
}

// Task 6.2
// - When does this check run — at import time, at first use, or on demand?
//   This check runs at import time (when the module is first evaluated by JS).
// - Why does "at import time" implement fail fast better than "on demand"?
//   Import-time checks execute as soon as the bundle boots, instantly preventing the app from mounting if configuration is invalid. On-demand checks delay failure until user interaction, risking partial execution, inconsistent UI, or silent failures deep in execution path.