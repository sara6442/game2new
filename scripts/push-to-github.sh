#!/usr/bin/env bash
#
# push-to-github.sh — Push the dress-up game project to your GitHub repository
#
# USAGE:
#   1. Create a new empty repository on GitHub (https://github.com/new)
#      - Don't add a README, .gitignore, or license (we have them already)
#      - Copy the repo URL, e.g. https://github.com/your-username/dress-up-game.git
#   2. Run this script:
#        bash scripts/push-to-github.sh
#   3. Paste your GitHub repo URL when prompted
#   4. Enter your GitHub credentials when asked (use a Personal Access Token as password)
#

set -e

echo "=========================================="
echo "  Push Dress-Up Game to GitHub"
echo "=========================================="
echo ""
echo "Make sure you have:"
echo "  1. Created an EMPTY repo on https://github.com/new"
echo "  2. Copied the repo URL (e.g. https://github.com/USER/REPO.git)"
echo ""
read -p "Paste your GitHub repo URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
  echo "Error: No URL provided. Exiting."
  exit 1
fi

echo ""
echo "Adding remote 'origin'..."
cd /home/z/my-project

# Remove existing origin if any
git remote remove origin 2>/dev/null || true

# Add the new remote
git remote add origin "$REPO_URL"

echo "Pushing to GitHub..."
echo "(If prompted for a password, use a GitHub Personal Access Token, not your account password)"
echo "  → Create a token at: https://github.com/settings/tokens (scope: repo)"
echo ""

git push -u origin main

echo ""
echo "=========================================="
echo "  ✅ Success! Your project is on GitHub"
echo "=========================================="
echo ""
echo "View it at: $REPO_URL"
echo ""
echo "To clone in a new session, run:"
echo "  git clone $REPO_URL"
