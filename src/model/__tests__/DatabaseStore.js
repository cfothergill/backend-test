const db = require('../../database');
const DatabaseStore = require('../DatabaseStore');
const Summary = require('../Summary');
const Statistic = require('../Statistic');

beforeEach(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterEach(async () => {
  await db.migrate.rollback();
});

test('fetches a summary of statistics for a course and user', async () => {
  const store = new DatabaseStore(db);
  const res = await store.summary(1, 1);

  expect(res).toBeInstanceOf(Summary);
  expect(res.timeStudied).toEqual(30);
  expect(res.averageScore).toEqual(20);
});

test('records a new statistic', async () => {
  const store = new DatabaseStore(db);
  const statistic = new Statistic(1, 1, 10, 40);
  await store.save(statistic);

  const rows = await db('statistics').where({
    user_id: 1,
    course_id: 1,
    time_studied: 10,
    total: 40,
  });

  expect(rows.length).toEqual(1);
});
