import { expect, test } from '@playwright/test';

test('Correct Credential', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('fikremariam.a.asegie@gmail.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('https://demo.nopcommerce.com/');
});

await page.goto('https://demo.nopcommerce.com/login?returnUrl=%2F');

await page.goto('https://demo.nopcommerce.com/login?returnUrl=%2F');
test('Missing Email and Password', async ({ page }) => {
  test.setTimeout(3600000); // Set timeout to 30 seconds
  await page.goto('https://demo.nopcommerce.com/login');
  await page.getByRole('button', { name: 'Log in' }).click();

  const emailValidationMessage = await page
    .locator('span.field-validation-valid')
    .textContent();
  expect(emailValidationMessage).toBe('Please enter your email');
});

test('Missing Password', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('valid.email@example.com');
  await page.getByRole('button', { name: 'Log in' }).click();

  const errorMessage = await page
    .locator('div.message-error.validation-summary-errors')
    .textContent();
  expect(errorMessage).toContain(
    'Login was unsuccessful. Please correct the errors and try again.\nNo customer account found',
  );
});

test('Missing Email', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  const emailValidationMessage = await page
    .locator('span.field-validation-valid')
    .textContent();
  expect(emailValidationMessage).toBe('Please enter your email');
});

test('Invalid Email Format', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('bebi.anteneh.yahooo');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  const errorMessage = await page
    .locator('div.message-error.validation-summary-errors')
    .textContent();
  expect(errorMessage).toContain(
    'Login was unsuccessful. Please correct the errors and try again.\nNo customer account found',
  );
});

test('Invalid Credential Non Existing Account', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('bebi.anteneh01@gmail.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  const errorMessage = await page
    .locator('div.message-error.validation-summary-errors')
    .textContent();
  expect(errorMessage).toContain(
    'Login was unsuccessful. Please correct the errors and try again.\nNo customer account found',
  );
});
