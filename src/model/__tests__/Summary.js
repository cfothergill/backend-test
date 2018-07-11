const Summary = require('../Summary');

test('instantiates when valid', () => {
  const summary = new Summary(10, 20);
  expect(summary.timeStudied).toEqual(10);
  expect(summary.averageScore).toEqual(20);
});

test('throws when timeStudied is invalid', () => {
  expect(() => {
    new Summary(null, 20);
  }).toThrow();
});

test('throws when averageScore is invalid', () => {
  expect(() => {
    new Summary(10, null);
  }).toThrow();
});
