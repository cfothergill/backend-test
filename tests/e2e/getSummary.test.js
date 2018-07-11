require('../helpers/resetDatabase');
const request = require('supertest');
const { app } = require('../../src');

test('responds to a valid request', async () => {
  const res = await request(app)
    .get('/course/1')
    .set('User-Id', 1);

  expect(res.status).toBe(200);
  expect(res.body.averageScore).toBe(20);
  expect(res.body.timeStudied).toBe(30);
});
