const express = require('../../../tests/helpers/express');
const errorHandler = require('../errorHandler');

test('handles errors correctly', () => {
  const err = { message: 'hello world' };
  const req = express.req();
  const res = express.res();

  errorHandler()(err, req, res, () => {});

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalled();
});
