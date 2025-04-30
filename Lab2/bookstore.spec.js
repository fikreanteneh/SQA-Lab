import { expect, test } from '@playwright/test';

test('Validate book prices on Books to Scrape (0 - 100 GBP)', async ({
  page,
}) => {
  const validPrices = [];
  test.setTimeout(36000);
  await page.goto('https://books.toscrape.com/');

  while (true) {
    // Locate the <section> element containing the list of books
    const itemsList = await page.locator('section ol.row li');
    const priceList = [];

    // Count the number of <li> elements
    const count = await itemsList.count();
    console.log(`Number of books: ${count}`);
    console.log(itemsList);

    // Iterate through each <li> element and validate the price
    for (let i = 0; i < count; i++) {
      const priceElement = itemsList.nth(i).locator('p.price_color');
      const priceText = await priceElement.textContent();

      // Parse and validate the price
      const price = parseFloat(priceText?.trim().replace('£', ''));
      priceList.push(price);
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
    await nextButton.first().locator('a').click();
  }
});
