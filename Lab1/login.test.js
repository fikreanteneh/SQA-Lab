// import { expect, test } from '@playwright/test';

// test.describe('Reqres Login API ', () => {
//   const baseUrl = 'https://reqres.in/api';

//   const loginTestCases = [
//     {
//       validity: true,
//       description: 'Valid email and password',
//       payload: { email: 'eve.holt@reqres.in', password: 'pistol' },
//       expectedStatus: 200,
//       expectedOutput: {
//         token: 'QpwL5tke4Pnpja7X4',
//       },
//     },
//     {
//       validity: false,
//       description: 'Missing password',
//       payload: { email: 'eve.holt@reqres.in' },
//       expectedStatus: 400,
//       expectedOutput: {
//         error: 'Missing password',
//       },
//     },
//     {
//       validity: false,
//       description: 'Missing email',
//       payload: { password: 'pistol' },
//       expectedStatus: 400,
//     },
//     {
//       validity: false,
//       description: 'Invalid email format',
//       payload: { email: 'bademail', password: 'pistol' },
//       expectedStatus: 400,
//     },
//     {
//       validity: false,
//       description: 'Empty payload',
//       payload: {},
//       expectedStatus: 400,
//     },
//   ];

//   for (const testCase of loginTestCases) {
//     test(testCase.description, async ({ request }) => {
//       const response = await request.post(`${baseUrl}/login`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': 'reqres-free-v1',
//         },
//         data: testCase.payload,
//       });
//       expect(response.status()).toBe(testCase.expectedStatus);
//     });
//   }
// });
