import puppeteer from 'puppeteer';

async function captureAllScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    const mainPageSizes = [
      { width: 360, filename: 'final-360px.png' },
      { width: 390, filename: 'final-390px.png' },
      { width: 640, filename: 'final-640px.png' },
      { width: 768, filename: 'final-768px.png' },
      { width: 1024, filename: 'final-1024px.png' },
      { width: 1440, filename: 'final-1440px.png' }
    ];

    // Capture main page at all viewport sizes
    for (const size of mainPageSizes) {
      console.log(`Capturing main page at ${size.width}px...`);
      await page.setViewport({ width: size.width, height: 900 });
      await page.goto('http://localhost:4321/', {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      await page.screenshot({
        path: `/workspace/.github/pr-screenshots/${size.filename}`,
        fullPage: true
      });
      console.log(`✓ Saved ${size.filename}`);
    }

    // Capture BMS case study at 1440px
    console.log('Capturing BMS case study at 1440px...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4321/projects/bms', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    await page.screenshot({
      path: '/workspace/.github/pr-screenshots/final-bms.png',
      fullPage: true
    });
    console.log('✓ Saved final-bms.png');

    console.log('\n✅ All screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

captureAllScreenshots().catch(console.error);
