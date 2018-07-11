require('../helpers/resetDatabase');
const request = require('supertest');
const { app, db } = require('../../src');

test('responds to a valid request', async () => {
  const res = await request(app)
    .post('/course/1')
    .set('User-Id', 1)
    .send({ timeStudied: 10, amount: 40 });
    
  const rows = await db('statistics').where({
    user_id: 1,
    course_id: 1,
    time_studied: 10,
    total: 40,
  });

  expect(res.status).toBe(201);
  expect(rows.length).toBe(1);
});
