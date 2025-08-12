#!/bin/bash

# Script to replace Next.js Image components with regular img tags for static export

FILES_TO_UPDATE=(
  "frontend/src/components/mainpage/blog-section.tsx"
  "frontend/src/app/blogs/page.tsx"
  "frontend/src/components/mainpage/hero-section.tsx"
  "frontend/src/components/mainpage/footer.tsx"
  "frontend/src/components/mainpage/insights-section.tsx"
  "frontend/src/components/mainpage/testimonials-section.tsx"
  "frontend/src/app/about/page.tsx"
  "frontend/src/app/blogs/[slug]/page.tsx"
)

echo "Replacing next/image imports with regular img tags..."

for file in "${FILES_TO_UPDATE[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Remove Next.js Image import
    sed -i '' '/import Image from "next\/image";/d' "$file"
    
    # Replace Image components with img tags
    # This is a basic replacement - manual review needed
    sed -i '' 's/<Image/<img/g' "$file"
    sed -i '' 's/<\/Image>/<\/img>/g' "$file"
    
    # Remove Next.js specific props that don't work with img
    sed -i '' 's/fill//g' "$file"
    sed -i '' 's/sizes="[^"]*"//g' "$file"
    sed -i '' 's/priority//g' "$file"
    
    echo "✓ Updated $file"
  else
    echo "✗ File not found: $file"
  fi
done

echo "Done! Please review the changes manually."
