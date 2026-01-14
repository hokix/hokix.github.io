#!/bin/bash
set -e

echo "Building site..."
bundle exec jekyll build

echo "Deploying to gh-pages branch..."
cd _site
git init
git add -A
git commit -m "Deploy site on $(date)"
git branch -M gh-pages
git remote add origin git@github.com:hokix/hokix.github.io.git || true
git push -f origin gh-pages

echo "✓ Deployed successfully to gh-pages branch!"
