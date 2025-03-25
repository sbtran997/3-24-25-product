const puppeteer = require('puppeteer');

describe('Travel Interest Quiz Tests', () => {
  let browser;
  let page;
  const TEST_URL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/interestQuiz.html';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    
    // Wait for actual elements that exist
    await page.goto(TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.quiz-container', { visible: true, timeout: 15000 });
  }, 60000);

  beforeEach(async () => {
    // Reset state using existing elements
    await page.evaluate(() => {
      localStorage.clear();
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      document.getElementById('budgetInput').value = '';
    });
    
    // Wait for reset to complete
    await page.waitForFunction(
      () => document.querySelectorAll('input[type="checkbox"]:checked').length === 0
    );
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Basic form interaction', async () => {
    // Test checkbox interaction
    await page.click('#interest-food');
    const isChecked = await page.$eval('#interest-food', cb => cb.checked);
    expect(isChecked).toBe(true);

    // Test budget input
    await page.type('#budgetInput', '1000');
    const budgetValue = await page.$eval('#budgetInput', el => el.value);
    expect(budgetValue).toBe('1000');

    // Set up dialog handler
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Test submit
    await page.click('#submit-quiz');
    
    // Verify storage
    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));
    
    expect(JSON.parse(storage.interests)).toEqual(['food']);
    expect(storage.budget).toBe('1000');
  }, 15000);
});
