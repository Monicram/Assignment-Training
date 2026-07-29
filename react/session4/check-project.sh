#!/bin/bash
set -e

echo "=== Project Health Check ==="

# Check node_modules exists
if [ -d "node_modules" ]; then
  echo "✓ node_modules exists"
else
  echo "✗ node_modules missing — run: npm install"
fi

# Check .env exists
if [ -f ".env" ]; then
  echo "✓ .env file found"
else
  echo "✗ .env missing — copy from .env.example"
fi

# Count TypeScript files
TS_COUNT=$(find src/ -name "*.ts" -o -name "*.tsx" | wc -l | tr -d ' ')
echo "✓ Found $TS_COUNT TypeScript files in src/"

# List test files
echo ""
echo "Test files:"
for FILE in src/test/*.test.ts src/**/*.test.tsx; do
  [ -f "$FILE" ] && echo "  - $FILE"
done

echo ""
echo "=== Check complete ==="
