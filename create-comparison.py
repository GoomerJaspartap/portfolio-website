from PIL import Image

def create_comparison(left_path, right_path, output_path):
    # Open both images
    left_img = Image.open(left_path)
    right_img = Image.open(right_path)
    
    # Get dimensions
    left_width, left_height = left_img.size
    right_width, right_height = right_img.size
    
    # Make both images the same height
    max_height = max(left_height, right_height)
    
    # Create a new image with both side by side
    comparison = Image.new('RGB', (left_width + right_width, max_height), color='white')
    
    # Paste both images
    comparison.paste(left_img, (0, 0))
    comparison.paste(right_img, (left_width, 0))
    
    # Save
    comparison.save(output_path)
    print(f"✓ Created {output_path}")

# Create 1440px comparison
create_comparison(
    '/tmp/design-approved-1440px.png',
    '/tmp/built-site-1440px.png',
    '/workspace/.github/pr-screenshots/comparison-1440px.png'
)

# Create 390px comparison
create_comparison(
    '/tmp/design-approved-390px.png',
    '/tmp/built-site-390px.png',
    '/workspace/.github/pr-screenshots/comparison-390px.png'
)

print("\n✅ All comparison images created!")
