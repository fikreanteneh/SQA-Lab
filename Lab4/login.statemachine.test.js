import { expect, test } from '@playwright/test';

test('Missing Email and Password', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.getByRole('button', { name: 'Log in' }).click();
  const errorMessage = await page
    .getByText('The credentials provided are incorrect')
    .isVisible();
  expect(errorMessage).toBeTruthy();
});

test('Missing Password', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('valid.email@example.com');
  await page.getByRole('button', { name: 'Log in' }).click();
  const errorMessage = await page
    .getByText('The credentials provided are incorrect')
    .isVisible();
  expect(errorMessage).toBeTruthy();
});

test('Missing Email', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  const errorMessage = await page
    .getByText('The credentials provided are incorrect')
    .isVisible();
  expect(errorMessage).toBeTruthy();
});

test('Invalid Email Format', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('bebi.anteneh.yahooo');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test('Invalid Credential Non Existing Account', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('bebi.anteneh01@gmail.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test('Correct Credential', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/login');
  await page
    .getByRole('textbox', { name: 'Email:' })
    .fill('fikremariam.a.asegie@gmail.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
});
