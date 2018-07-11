const Statistic = require('../Statistic');

test('instantiates when valid', () => {
  const record = new Statistic(1, 2, 3, 4);
  expect(record.userId).toEqual(1);
  expect(record.courseId).toEqual(2);
  expect(record.timeStudied).toEqual(3);
  expect(record.total).toEqual(4);
});

test('throws when userId is invalid', () => {
  expect(() => {
    new Statistic(null, 2, 3, 4);
  }).toThrow();
});

test('throws when courseId is invalid', () => {
  expect(() => {
    new Statistic(1, null, 3, 4);
  }).toThrow();
});

test('throws when timeStudied is invalid', () => {
  expect(() => {
    new Statistic(1, 2, null, 4);
  }).toThrow();
});

test('throws when total is invalid', () => {
  expect(() => {
    new Statistic(1, 2, 3, null);
  }).toThrow();
});
