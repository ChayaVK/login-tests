// API tests: no browser, so they run in milliseconds
import { test, expect } from '@playwright/test';

test('health check returns ok @smoke', async ({ request }) => {
  const res = await request.get('/api/health');
  expect(res.status()).toBe(200);
  expect((await res.json()).status).toBe('ok');
});

test('login API accepts a valid user', async ({ request }) => {
  const res = await request.post('/api/login', { data: { username: 'asha', password: 'demo-pass' } });
  expect(res.status()).toBe(200);
});

test('login API rejects a wrong password', async ({ request }) => {
  const res = await request.post('/api/login', { data: { username: 'asha', password: 'wrong' } });
  expect(res.status()).toBe(401);
});

test('a new user can log in', async ({ request }) => {
  const username = `user-${Date.now()}`; // fresh test data for every run
  const created = await request.post('/api/users', { data: { username, password: 'pass-123' } });
  expect(created.status()).toBe(201);
  const res = await request.post('/api/login', { data: { username, password: 'pass-123' } });
  expect(res.status()).toBe(200);
});
