const puppeteer = require('puppeteer');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Step 1: Capture approved design at 1440px
    console.log('Capturing approved design at 1440px...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('file:///home/ubuntu/.cursor/projects/workspace/uploads/design-final_6182.html', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    await page.screenshot({
      path: '/tmp/design-approved-1440px.png',
      fullPage: true
    });

    // Step 1: Capture approved design at 390px
    console.log('Capturing approved design at 390px...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('file:///home/ubuntu/.cursor/projects/workspace/uploads/design-final_6182.html', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    await page.screenshot({
      path: '/tmp/design-approved-390px.png',
      fullPage: true
    });

    // Step 2: Capture built site at 1440px
    console.log('Capturing built site at 1440px...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4321/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    await page.screenshot({
      path: '/tmp/built-site-1440px.png',
      fullPage: true
    });

    // Step 2: Capture built site at 390px
    console.log('Capturing built site at 390px...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:4321/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    await page.screenshot({
      path: '/tmp/built-site-390px.png',
      fullPage: true
    });

    console.log('All screenshots captured successfully');
  } finally {
    await browser.close();
  }
}

async function createComparison(width) {
  console.log(`Creating comparison image for ${width}px...`);
  
  const designImg = await loadImage(`/tmp/design-approved-${width}px.png`);
  const builtImg = await loadImage(`/tmp/built-site-${width}px.png`);
  
  // Use the taller height to ensure we don't crop
  const maxHeight = Math.max(designImg.height, builtImg.height);
  const gap = 20; // Gap between images
  const padding = 40; // Padding around entire canvas
  const labelHeight = 50; // Height for labels
  
  // Create canvas with both images side by side plus labels
  const canvas = createCanvas(
    designImg.width + builtImg.width + gap + (padding * 2),
    maxHeight + labelHeight + (padding * 2)
  );
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw labels
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  
  // "Approved Design" label
  ctx.fillText('Approved Design', padding + designImg.width / 2, padding + 30);
  
  // "Built Site" label
  ctx.fillText('Built Site', padding + designImg.width + gap + builtImg.width / 2, padding + 30);
  
  // Draw images
  ctx.drawImage(designImg, padding, padding + labelHeight);
  ctx.drawImage(builtImg, padding + designImg.width + gap, padding + labelHeight);
  
  // Draw separator line
  ctx.strokeStyle = '#CCCCCC';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding + designImg.width + gap / 2, padding);
  ctx.lineTo(padding + designImg.width + gap / 2, canvas.height - padding);
  ctx.stroke();
  
  // Save comparison
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`/workspace/.github/pr-screenshots/comparison-${width}px.png`, buffer);
  console.log(`Comparison saved: comparison-${width}px.png`);
}

async function main() {
  await captureScreenshots();
  await createComparison(1440);
  await createComparison(390);
  console.log('All comparison images created successfully!');
}

main().catch(console.error);
