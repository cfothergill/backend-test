const auth = require('../auth');
const express = require('../../../tests/helpers/express');

test('allows authorized requests past', () => {
  const req = express.req({
    headers: { 'User-Id': '123' }
  });

  const res = jest.fn();
  const next = jest.fn();

  auth()(req, res, next);

  expect(next).toHaveBeenCalled();
});

test('disallows unauthorized requests past', () => {
  const req = express.req();
  const res = express.res();

  auth()(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
});
