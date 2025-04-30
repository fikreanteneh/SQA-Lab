import { expect, test } from '@playwright/test';

const discountCases = [
  { loggedIn: true, couponApplied: true, cartTotal: 100, expectedDiscount: 20 },
  {
    loggedIn: false,
    couponApplied: true,
    cartTotal: 100,
    expectedDiscount: 10,
  },
  { loggedIn: true, couponApplied: false, cartTotal: 100, expectedDiscount: 5 },
  { loggedIn: false, couponApplied: false, cartTotal: 50, expectedDiscount: 0 },
];

for (const {
  loggedIn,
  couponApplied,
  cartTotal,
  expectedDiscount,
} of discountCases) {
  test(`Discount Test - LoggedIn: ${loggedIn}, Coupon: ${couponApplied}, Cart: $${cartTotal}`, async ({
    page,
  }) => {
    // 1. Visit Home Page
    await page.goto('https://demo.nopcommerce.com');

    // 2. Login if needed
    if (loggedIn) {
      await page.goto('https://demo.nopcommerce.com/login');
      await page
        .getByRole('textbox', { name: 'Email:' })
        .fill('fikremariam.a.asegie@gmail.com');
      await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
      await page.getByRole('button', { name: 'Log in' }).click();
      await expect(page).toHaveURL('https://demo.nopcommerce.com/');
    }

    // 3. Add a product to cart
    await page
      .locator('button[class*="product-box-add-to-cart-button"]')
      .first()
      .click();

    // 4. Go to Cart
    await page.locator('span.cart-label').click(); // click cart icon
    await page.locator('a[href="/cart"]').click(); // then click "Go to cart"

    // 5. Apply coupon if needed
    if (couponApplied) {
      await page.fill(
        'input#discountcouponcode',
        `Discount${expectedDiscount}`,
      );
      await page.click('button[name="applydiscountcouponcode"]');
    }

    // 6. Verify the discount (assuming % discount is shown in '.discount-value')
    if (expectedDiscount > 0) {
      const discountText = await page.locator('.discount-value').innerText();
      const actualDiscount = parseFloat(discountText.replace('%', '').trim());
      expect(actualDiscount).toBe(expectedDiscount);
    } else {
      // If no discount expected, check discount section is not visible
      const discountVisible = await page.locator('.discount-value').isVisible();
      expect(discountVisible).toBeFalsy();
    }
  });
}
