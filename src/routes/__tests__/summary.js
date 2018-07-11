const express = require('../../../tests/helpers/express');
const summary = require('../summary');

test('responds when a valid request is made', async () => {
  const res = express.res();
  const req = express.req({
    headers: { 'User-Id': '123' },
    params: { courseId: '246' },
  });

  const store = {
    summary: jest.fn().mockResolvedValue({
      timeStudied: 10,
      averageScore: 10,
    }),
  };

  await summary(store)(req, res);

  expect(res.json).toHaveBeenCalledWith({
    timeStudied: 10,
    averageScore: 10,
  });
});

test('throws if an error occurs', async () => {
  const res = express.res();
  const req = express.req();

  const store = {
    summary: jest.fn().mockRejectedValue({
      message: 'Hello world',
    })
  };

  try {
    await summary(store)(req, res);
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
