
const summary = (store) => async (req, res) => {
  const summary = await store.summary(
    req.get('User-Id'),
    req.params.courseId
  );

  res.json({
    averageScore: summary.averageScore,
    timeStudied: summary.timeStudied,
  });
};

module.exports = summary;
