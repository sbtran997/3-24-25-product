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
    await page.goto(TEST_URL);
    await page.waitForSelector('#interestQuiz');
  }, 60000);

  beforeEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      document.getElementById('budgetInput').value = '';
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Basic form interaction', async () => {
    // Test checkbox
    await page.click('#interest-food');
    const isChecked = await page.$eval('#interest-food', cb => cb.checked);
    expect(isChecked).toBe(true);

    // Test budget input
    await page.type('#budgetInput', '100');
    const budgetValue = await page.$eval('#budgetInput', el => el.value);
    expect(budgetValue).toBe('100');

    // Test submit
    await page.click('#submit-quiz');
    const alertText = await page.evaluate(() => {
      return new Promise(resolve => {
        window.alert = message => resolve(message);
      });
    });
    expect(alertText).toContain('saved successfully');
  }, 15000);
});
