import { expect, test } from '@playwright/test';

test.describe('Reqres Register API - Full Equivalence Partitioning Tests', () => {
  const baseUrl = 'https://reqres.in/api';

  const testCases = [
    {
      classType: 'Valid',
      description: 'Valid email and password',
      payload: { email: 'eve.holt@reqres.in', password: 'ABcd@1234' },
      expectedStatus: 200,
    },
    {
      classType: 'Invalid',
      description: 'Missing password',
      payload: { email: 'eve.holt@reqres.in' },
      expectedStatus: 400,
    },
    {
      classType: 'Invalid',
      description: 'Missing email',
      payload: { password: 'ABcd@1234' },
      expectedStatus: 400,
    },
    {
      classType: 'Invalid',
      description: 'Invalid email format',
      payload: { email: '12345678', password: 'ABcd' },
      expectedStatus: 400,
    },
    {
      classType: 'Invalid',
      description: 'Empty payload',
      payload: {},
      expectedStatus: 400,
    },
    {
      classType: 'Invalid',
      description: 'Password too short',
      payload: { email: 'eve.holt@reqres.in', password: 'AB' },
      expectedStatus: 400, // Note: Reqres still returns 200 even if password is short!
    },
  ];

  for (const testCase of testCases) {
    test(`${testCase.classType}: ${testCase.description}`, async ({
      request,
    }) => {
      const response = await request.post(`${baseUrl}/register`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
        data: testCase.payload,
      });

      expect(response.status()).toBe(testCase.expectedStatus);
    });
  }

  // Special test for Not Valid JSON
  test('Invalid: Not Valid JSON format', async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
      // send string instead of object -> to simulate invalid JSON
      data: 'this is not a valid json',
    });

    expect(response.status()).toBe(400);
  });
});
