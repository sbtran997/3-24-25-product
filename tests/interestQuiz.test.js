const puppeteer = require('puppeteer');

describe('Travel Interest Quiz Tests', () => {
  let browser;
  let page;
  const TEST_URL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/interestQuiz.html';

  // Increased timeout for CI environment
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ]
    });
    page = await browser.newPage();
    
    // Faster navigation with basic wait
    await page.goto(TEST_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#quiz-container', { timeout: 10000 });
  }, 60000); // 60s timeout for CI

  beforeEach(async () => {
    // Fast reset without full reload
    await page.evaluate(() => {
      localStorage.clear();
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      document.getElementById('budgetInput').value = '';
    });
    await page.waitForTimeout(500); // Brief stabilization
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Initial state has empty display', async () => {
    const displayText = await page.$eval('#selections-display', el => el.value);
    expect(displayText).toContain('Your selections will appear here');
  });

  test('Show interest error when submitting empty', async () => {
    await page.click('#submit-quiz');
    const errorVisible = await page.$eval('#interest-error', el => 
      window.getComputedStyle(el).display !== 'none'
    );
    expect(errorVisible).toBe(true);
  }, 15000); // Test-specific timeout

  test('Save valid preferences', async () => {
    // Fast sequential operations
    await page.click('#interest-food');
    await page.type('#budgetInput', '1500');
    await page.click('#submit-quiz');
    
    // Direct storage check without wait
    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));
    
    expect(JSON.parse(storage.interests)).toEqual(['food']);
    expect(storage.budget).toBe('1500');
  }, 15000);

  test('Continue button navigation', async () => {
    await Promise.race([
      page.click('#continue-btn'),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Navigation timeout')), 5000)
      )
    ]);
    
    expect(page.url()).toContain('map.html');
  }, 10000);
});
