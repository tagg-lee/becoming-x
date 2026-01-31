#!/bin/bash
set -e

echo "Building Quartz..."
npx quartz build

echo "Deploying to gh-pages..."
npx gh-pages -d public -b gh-pages

echo "Done! Your site will be available at your GitHub Pages URL."
