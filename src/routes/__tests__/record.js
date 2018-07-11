const express = require('../../../tests/helpers/express');
const record = require('../record');

test('responds when a valid request is made', async () => {
  const res = express.res();
  const req = express.req({
    headers: { 'User-Id': '123' },
    params: { courseId: '246' },
    body: { timeStudied: 10, amount: 20 },
  });

  const store = {
    save: jest.fn().mockResolvedValue(true),
  };

  await record(store)(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});

test('throws if an error occurs', async () => {
  const res = express.res();
  const req = express.req();

  const store = {
    save: jest.fn().mockRejectedValue({
      message: 'Hello world',
    })
  };

  try {
    await record(store)(req, res);
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
