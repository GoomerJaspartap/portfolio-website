import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/local/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const screenshots = [
    { width: 1440, name: 'screenshot-desktop-1440.png', url: 'http://localhost:4321/' },
    { width: 1024, name: 'screenshot-laptop-1024.png', url: 'http://localhost:4321/' },
    { width: 640, name: 'screenshot-tablet-640.png', url: 'http://localhost:4321/' },
    { width: 360, name: 'screenshot-mobile-360.png', url: 'http://localhost:4321/' },
    { width: 1440, name: 'screenshot-bms-case-study.png', url: 'http://localhost:4321/projects/bms' }
  ];

  const outputDir = '/workspace/portfolio';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const config of screenshots) {
    const page = await browser.newPage();
    
    // Set viewport with a reasonable height
    await page.setViewport({
      width: config.width,
      height: 1080
    });

    console.log(`Capturing ${config.name} at ${config.width}px width...`);
    
    // Navigate to the page
    await page.goto(config.url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit for any animations or lazy loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take full page screenshot
    const outputPath = path.join(outputDir, config.name);
    await page.screenshot({
      path: outputPath,
      fullPage: true
    });

    console.log(`Saved ${config.name}`);
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
