import { test } from '@playwright/test';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(StealthPlugin());

test('bypass cloudflare and login', async () => {
  const browser = await chromium.launch({ headless: false }); // HEADFUL
  const page = await context.newPage();
  await page.goto('https://demo.nopcommerce.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  const context = await browser.newContext({
    cookies: [
      {
        name: '.Nop.Antiforgery',
        value:
          'CfDJ8OfaiJhnrxxPpGLBmNfpOt7EXeutobbhg0XgRRgZgf6xRgAExX1aJ5YI2F_A_bka0YK73kbq47Gn7bPz7ltsUHADy8Q5QiJIu9ic9l4Q4qEbjvV9OC7yc8jtjn98oFj-tOnP47XmNSfCFqTflI6tNHY',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: '.Nop.Authentication',
        value:
          'CfDJ8OfaiJhnrxxPpGLBmNfpOt7qm3SalEnL5MkWA3aq058MdPoCRjAEpLF4R3SDH2ObP5FpUqHy_3HQfH5D4DbKGBxoAClQKfm7g6os63fqyBWnD60MSNCnO6C9yHQVN8g_T7TQUCFzEkkwy0VyEBMzGX5oHuRSK_bfKzjRjmcEsNvc9Ax5fnbaMdiqkbGuWbwlJnoXK2a1fgowS1TOpdmekirhmxffuvoofXzu80p24GXgi5mXg-HRnPJIqdOfdF9RSk74aUxCtPGpNCFsL7REBuemjCgJBKW6qTi8rZffxB115OZJ_KAgit9mp_uNMDkk51p05gy696pokyhCUMFhT78I0DCRo2Xj4CCKLu64twLeVpSHbrCN1wq88dOtZO78ty-XVAj2B_I0OcKAbdMnbfE8BXYEnGoCKqkPAC4092U-3sMHMr3JzBfDWNzrkgv4s_w_a84U6tHO6-GYRu-Doe1PGcyy63KwE82ZJ2JjANZL8GSMT-3ZA6V_jBDQoxWDM49WKLYuHW18GeImpmLbpnep8RQ5Bn7YYK1_SoaYUMstEkNHeBWRYczx8-jw6Qff4PiILW9w3MHBLVc8Ylhy3AIKYYNOP9s2dAl_vXOtd5C2',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: '.Nop.Culture',
        value: 'c%3Den-US%7Cuic%3Den-US',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
      {
        name: '.Nop.Customer',
        value: 'b340e394-c708-4804-b535-5d0a35a9d7fc',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: '.Nop.RecentlyViewedProducts',
        value: '4%2C45%2C1',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
      {
        name: '.Nop.Session',
        value:
          'CfDJ8OfaiJhnrxxPpGLBmNfpOt6qW%2FGku6PqEsF2gvcDvW0H2WybqPhGbusKVGfEzgvlh5qA2X72g4AtNj4Bh9CYzXkdr3F2tYgag1GkZ80%2FxmC9ng2lw8sYwps9MTvC1svEcuscbIVeepOm2Qa1SlYYfY2qjp9d2vtdvDhB82l01hue',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: '_ga',
        value: 'GA1.1.349616891.1745523966',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
      {
        name: '_ga_2NJTDMQ3JH',
        value: 'GS1.1.1746030550.1.1.1746031204.0.0.0',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
      {
        name: '_ga_GRDMWZ6J3B',
        value: 'GS1.1.1746030827.1.0.1746030827.0.0.0',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
      {
        name: '_ga_SCT41TW89V',
        value: 'GS1.1.1746037287.7.1.1746037671.0.0.0',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
      {
        name: 'cf_clearance',
        value:
          '7pK4NHQT12eMTzzQYzuG0rRfkFD1phJHbVKLKgk.76Q-1746037305-1.2.1.1-2.t397_oPZM4VgrlM2OhS3gW8DVtmi_89IQdoK5i1WVP7vZV2w82Wb_a2IwppxaJFUdRoCcUO2QvC3NKKg5UwFdzQBW6jjHGJDTmtT.EZnt9Trdb7BXpzKkdrNQqZYBK_1tkEt_U_9fKzaooEkTjzPIudh16dMGsKDBpJXwb8piTWxA6m8AaFCdk5gGWn.N1jgQE2MGf1oy4beqIWEQRS1nMk0kp8z_MjxUchDBME1BrgrpI9ZhaJhBcdmB5LKKtHxy3K.FvIyl4_EkMbW.XNzSIL3jbixIgM7Zu15jccr2.cIUH624_.5mGZiRfqTuVe21M9kvzZDxOeR1PVl87bqmY__Tb4AVQlEhuJ2dS42o',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: 'fpestid',
        value:
          '-9RQ_o5x4zNBal8Gy9mFvRMs5_aYMfAMLM94qBtn2bTTrr2Xd7Y65btKJXQEojgmkqRIGw',
        domain: 'demo.nopcommerce.com',
        path: '/',
        httpOnly: false,
        secure: false,
      },
    ],
  });
  await page.goto('https://demo.nopcommerce.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page
    .locator(
      'iframe[src="https\\:\\/\\/challenges\\.cloudflare\\.com\\/cdn-cgi\\/challenge-platform\\/h\\/b\\/turnstile\\/if\\/ov2\\/av0\\/rcv\\/p0r9f\\/0x4AAAAAAADnPIDROrmt1Wwj\\/light\\/fbE\\/new\\/normal\\/auto\\/"]',
    )
    .contentFrame()
    .locator('body')
    .click();
});
