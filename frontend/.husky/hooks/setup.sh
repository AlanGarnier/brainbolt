#!/bin/bash

# Change directory to the hooks folder
cd "$(dirname "$0")"

# Grant execute permissions to the check_branch_naming.sh script
chmod +x check_branch_naming.sh

echo "Setup complete!"