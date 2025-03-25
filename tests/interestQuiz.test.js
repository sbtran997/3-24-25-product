const puppeteer = require('puppeteer');
const { expect } = require('@jest/globals');

describe('Travel Interest Quiz Tests', () => {
  let browser;
  let page;
  const TEST_URL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/interestQuiz.html';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    });
    page = await browser.newPage();
    
    // Set longer default navigation timeout
    page.setDefaultNavigationTimeout(15000);
    await page.goto(TEST_URL);
    
    // Wait for critical elements
    await page.waitForSelector('#quiz-container', { visible: true });
    await page.waitForSelector('#submit-quiz', { visible: true });
  }, 30000);  // Increased timeout for CI environments

  beforeEach(async () => {
    // Reset state with retries for CI stability
    await page.evaluate(() => {
      localStorage.clear();
      location.reload(true);
    });
    await page.waitForSelector('#quiz-container', { visible: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  const getErrorState = async (selector) => {
    await page.waitForSelector(selector, { visible: false });
    return page.$eval(selector, el => ({
      visible: window.getComputedStyle(el).display !== 'none',
      text: el.textContent.trim()
    }));
  };

  const waitForStorageUpdate = async () => {
    await page.waitForFunction(
      () => localStorage.getItem('interests') && localStorage.getItem('travelBudget')
    );
  };

  test('Initial state has empty display and no errors', async () => {
    const displayText = await page.$eval('#selections-display', el => el.value);
    expect(displayText).toMatch(/Your selections will appear here/);
    
    const errors = await Promise.all([
      getErrorState('#interest-error'),
      getErrorState('#budget-error'),
      getErrorState('#budget-boundary-error')
    ]);
    
    errors.forEach(error => expect(error.visible).toBe(false));
  });

  test('Show appropriate errors for invalid submissions', async () => {
    // Test empty submission
    await page.click('#submit-quiz');
    let interestError = await getErrorState('#interest-error');
    expect(interestError.visible).toBe(true);
    expect(interestError.text).toContain('select at least one interest');

    // Test invalid budget after selecting interest
    await page.click('#interest-food');
    await page.type('#budgetInput', '5');
    await page.click('#submit-quiz');
    
    const budgetError = await getErrorState('#budget-error');
    expect(budgetError.visible).toBe(true);
    expect(budgetError.text).toContain('$10 minimum');
  });

  test('Save valid preferences and persist data', async () => {
    // Select multiple interests
    await page.click('#interest-food');
    await page.click('#interest-music');
    
    // Enter valid budget
    await page.type('#budgetInput', '2500');
    await page.click('#submit-quiz');
    
    // Wait for storage and UI updates
    await waitForStorageUpdate();
    await page.waitForFunction(() => 
      document.querySelector('#selections-display').value.includes('$2500')
    );

    // Verify storage
    const storage = await page.evaluate(() => ({
      interests: JSON.parse(localStorage.getItem('interests')),
      budget: localStorage.getItem('travelBudget')
    }));
    
    expect(storage.interests).toEqual(expect.arrayContaining(['food', 'music']));
    expect(storage.budget).toBe('2500');

    // Verify display persistence after reload
    await page.reload();
    await page.waitForSelector('#quiz-container');
    const displayText = await page.$eval('#selections-display', el => el.value);
    expect(displayText).toContain('Food, Music');
    expect(displayText).toContain('$2500');
  });

  test('Handle extreme budget values', async () => {
    await page.click('#interest-beaches');
    
    // Test minimum valid budget
    await page.type('#budgetInput', '10');
    await page.click('#submit-quiz');
    await expect(getErrorState('#budget-error')).resolves.toMatchObject({ visible: false });
    
    // Test maximum valid budget
    await page.$eval('#budgetInput', el => el.value = '');
    await page.type('#budgetInput', '1000000000');
    await page.click('#submit-quiz');
    await expect(getErrorState('#budget-boundary-error')).resolves.toMatchObject({ visible: false });
  });

  test('Continue button becomes functional after valid submission', async () => {
    // Initial state check
    const initialHref = await page.$eval('#continue-btn', el => el.href);
    expect(initialHref).toContain('map.html');

    // Verify button works without submission
    await Promise.all([
      page.waitForNavigation(),
      page.click('#continue-btn')
    ]);
    expect(page.url()).toContain('map.html');
    await page.goBack();
    
    // Submit valid preferences
    await page.click('#interest-entertainment');
    await page.type('#budgetInput', '500');
    await page.click('#submit-quiz');
    await waitForStorageUpdate();
    
    // Test continue with saved preferences
    await Promise.all([
      page.waitForNavigation(),
      page.click('#continue-btn')
    ]);
    expect(page.url()).toContain('map.html');
  });
});
