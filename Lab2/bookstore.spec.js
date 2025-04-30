import { expect, test } from '@playwright/test';

test('Validate book prices on Books to Scrape (£0 - £100)', async ({
  page,
}) => {
  const validPrices = [];
  const invalidPrices = [];
  test.setTimeout(360000);
  await page.goto('https://books.toscrape.com/');

  while (true) {
    // Locate the <section> element containing the list of books
    const itemsList = await page.locator('section ol.row li');

    // Count the number of <li> elements
    const count = await itemsList.count();

    // Extract and validate prices in a single loop
    for (const item of await itemsList.elementHandles()) {
      const priceText = await item.locator('p.price_color').textContent();
      const price = parseFloat(priceText?.trim().replace('£', ''));

      // Categorize prices and validate
      (price >= 0 && price <= 100 ? validPrices : invalidPrices).push(price);

      expect(price).toBeGreaterThanOrEqual(0);
      expect(price).toBeLessThanOrEqual(100);
    }

    const navigation = await page.locator('section ul.pager li');
    const nextButton = navigation.filter({
      has: page.locator('a:has-text("next")'),
    });

    if ((await nextButton.count()) === 0) {
      break; // Exit the loop if there is no "next" button
    }
    // Click the "next" button to go to the next page
    await nextButton.first().locator('a').click();
    await page.waitForLoadState('networkidle');
  }
  console.log('Invalid Prices:', invalidPrices);
  console.log('Valid Prices:', validPrices);
  validPrices.sort((a, b) => a - b);
  console.log('First 10 Valid Prices:', validPrices.slice(0, 10));
  console.log('Last 10 Valid Prices:', validPrices.slice(-10));
});
