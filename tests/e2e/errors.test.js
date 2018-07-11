require('../helpers/resetDatabase');
const request = require('supertest');
const { app } = require('../../src');

test('responds with unauthorized if no user is provided', async () => {
  const res = await request(app).get('/course/1');
  expect(res.status).toBe(401);
});

test('responds with not found for an invalid route', async () => {
  const res = await request(app).get('/asdfasdf').set('User-Id', 1);
  expect(res.status).toBe(404);
});
