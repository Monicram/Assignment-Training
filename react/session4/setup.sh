#!/bin/bash
set -e

echo "=== Intern Dashboard Setup ==="

# 1. Check node
if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js not found. Install from nodejs.org."
  exit 1
fi
echo "Node $(node -v) ready."

# 2. Install dependencies
# TODO: add npm install step here

# 3. Create .env if missing
# TODO: add .env step here

# 4. Run tests
# TODO: add test step here

echo ""
echo "=== Done. Run: npm run dev ==="
