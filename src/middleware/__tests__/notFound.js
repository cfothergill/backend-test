const express = require('../../../tests/helpers/express');
const notFound = require('../notFound');

test('responds correctly', () => {
  const req = express.req();
  const res = express.res();

  notFound()(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalled();
});
