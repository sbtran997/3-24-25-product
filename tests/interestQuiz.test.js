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

    // Handle dialog properly
    const dialogPromise = new Promise(resolve => {
        page.once('dialog', async dialog => {
            await dialog.accept();
            resolve();
        });
    });
    await Promise.all([
        dialogPromise,
        page.click('#submit-quiz')
    ]);
    
    // Verify storage
    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));
    
    expect(JSON.parse(storage.interests)).toEqual(['food']);
    expect(storage.budget).toBe('1000');
  }, 15000);

  test('Show error when no interests selected', async () => {
    await page.type('#budgetInput', '500');
    await page.click('#submit-quiz');
    
    const interestErrorVisible = await page.$eval('#interest-error', el => 
      window.getComputedStyle(el).display !== 'none'
    );
    expect(interestErrorVisible).toBe(true);
    
    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));
    expect(storage.interests).toBeNull();
  }, 15000);

  test('Save preferences with minimum budget', async () => {
    await page.click('#interest-beaches');
    await page.type('#budgetInput', '10');

    // Handle dialog properly
    const dialogPromise = new Promise(resolve => {
        page.once('dialog', async dialog => {
            await dialog.accept();
            resolve();
        });
    });
    await Promise.all([
        dialogPromise,
        page.click('#submit-quiz')
    ]);

    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));
    
    expect(JSON.parse(storage.interests)).toEqual(['beaches']);
    expect(storage.budget).toBe('10');
  }, 15000);

  test('Save preferences with maximum budget', async () => {
    await page.click('#interest-music');
    await page.type('#budgetInput', '1000000000');

    // Handle dialog properly
    const dialogPromise = new Promise(resolve => {
        page.once('dialog', async dialog => {
            await dialog.accept();
            resolve();
        });
    });
    await Promise.all([
        dialogPromise,
        page.click('#submit-quiz')
    ]);

    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));
    
    expect(JSON.parse(storage.interests)).toEqual(['music']);
    expect(storage.budget).toBe('1000000000');
  }, 15000);
  
  test('Show error for excessive budget', async () => {
    await page.click('#interest-food');
    await page.type('#budgetInput', '1000000001');
    await page.click('#submit-quiz');
    
    const boundaryErrorVisible = await page.$eval('#budget-boundary-error', el => 
      window.getComputedStyle(el).display !== 'none'
    );
    expect(boundaryErrorVisible).toBe(true);
    
    const storage = await page.evaluate(() => localStorage.getItem('travelBudget'));
    expect(storage).toBeNull();
  }, 15000);
});
