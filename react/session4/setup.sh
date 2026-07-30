#!/bin/bash
set -e

echo "=== Intern Dashboard Setup ==="

# 1. Check Node.js
if ! command -v node &>/dev/null; then
    echo "ERROR: Node.js not found. Install from nodejs.org."
    exit 1
fi
echo "Node $(node -v) ready."

# 2. Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed."
fi

# 3. Create .env if missing
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo ".env created from .env.example."
    else
        echo ".env.example not found. Skipping."
    fi
else
    echo ".env already exists."
fi

# 4. Run tests
if npm run test:run; then
    echo "All tests passed"
else
    echo "Some tests failed"
fi

# 5. Completion message
echo ""
echo "=== Setup Complete ==="
echo "Run the development server with:"
echo "npm run dev"
