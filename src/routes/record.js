const { Statistic } = require('../model');

const record = (store) => async (req, res) => {
  const statistic = new Statistic(
    req.get('User-Id'),
    req.params.courseId,
    req.body.timeStudied,
    req.body.amount
  );

  await store.save(statistic);

  res.status(201).json({
    status: 'created',
  });
};

module.exports = record;
