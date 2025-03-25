const puppeteer = require('puppeteer');

describe('Travel Interest Quiz Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto('https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/interestQuiz.html');
    await page.waitForSelector('#quiz-container');
  }, 15000);

  beforeEach(async () => {
    // Clear storage and reload for each test
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('#quiz-container');
  });

  afterAll(async () => {
    await browser.close();
  });

  const getErrorVisibility = async (selector) => {
    return await page.$eval(selector, el => 
      window.getComputedStyle(el).display !== 'none'
    );
  };

  test('Initial state has empty display', async () => {
    const displayText = await page.$eval('#selections-display', el => el.value);
    expect(displayText).toContain('Your selections will appear here');
  });

  test('Show interest error when submitting empty', async () => {
    await page.click('#submit-quiz');
    expect(await getErrorVisibility('#interest-error')).toBe(true);
  });

  test('Validate budget constraints', async () => {
    // Select at least one interest
    await page.click('#interest-food');

    // Test minimum budget
    await page.type('#budgetInput', '5');
    await page.click('#submit-quiz');
    expect(await getErrorVisibility('#budget-error')).toBe(true);

    // Test maximum budget
    await page.$eval('#budgetInput', el => el.value = '');
    await page.type('#budgetInput', '1000000001');
    await page.click('#submit-quiz');
    expect(await getErrorVisibility('#budget-boundary-error')).toBe(true);
  });

  test('Save valid preferences to localStorage', async () => {
    // Select interests
    await page.click('#interest-food');
    await page.click('#interest-beaches');

    // Enter valid budget
    await page.type('#budgetInput', '1500');
    await page.click('#submit-quiz');

    // Check localStorage
    const storage = await page.evaluate(() => ({
      interests: localStorage.getItem('interests'),
      budget: localStorage.getItem('travelBudget')
    }));

    expect(JSON.parse(storage.interests)).toEqual(['food', 'beaches']);
    expect(storage.budget).toBe('1500');
  });

  test('Real-time display updates', async () => {
    // Test checkbox updates
    await page.click('#interest-sports');
    let displayText = await page.$eval('#selections-display', el => el.value);
    expect(displayText).toContain('Sports');

    // Test budget updates
    await page.type('#budgetInput', '200');
    displayText = await page.$eval('#selections-display', el => el.value);
    expect(displayText).toContain('$200');
  });

  test('Error clearing on interaction', async () => {
    // Trigger errors first
    await page.click('#submit-quiz');
    await page.type('#budgetInput', '5');
    await page.click('#submit-quiz');

    // Fix errors and verify they clear
    await page.click('#interest-food');
    expect(await getErrorVisibility('#interest-error')).toBe(false);

    await page.type('#budgetInput', '100');
    expect(await getErrorVisibility('#budget-error')).toBe(false);
  });
});
