const asyncHandler = require('../asyncHandler');

test('passes error onto next handler', async () => {
  const err = new Error('test');
  const handler = async () => { throw err };
  const next = jest.fn();

  await asyncHandler(handler)(null, null, next);
  expect(next).toHaveBeenCalledWith(err);
});
