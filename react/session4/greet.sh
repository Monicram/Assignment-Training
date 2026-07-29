#!/bin/bash
set -e

# $1 is the first argument, $2 is the second
NAME=${1:-"Intern"}    # default to "Intern" if no argument given
ROLE=${2:-"Developer"}

echo "Welcome, $NAME!"
echo "Role: $ROLE"
echo "Dashboard: http://localhost:3000"
