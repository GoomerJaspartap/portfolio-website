import puppeteer from 'puppeteer';
import path from 'path';

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/local/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const screenshots = [
    { width: 1440, name: 'screenshot-desktop-1440-updated.png', url: 'http://localhost:4321/' },
    { width: 360, name: 'screenshot-mobile-360-updated.png', url: 'http://localhost:4321/' }
  ];

  const outputDir = '/workspace/portfolio';

  for (const config of screenshots) {
    const page = await browser.newPage();
    
    // Set viewport
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

    // Wait for rendering
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
  console.log('Updated screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
