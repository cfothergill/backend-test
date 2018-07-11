
const DATA = [
  { user_id: 1, course_id: 1, time_studied: 10, total: 10 },
  { user_id: 1, course_id: 1, time_studied: 10, total: 20 },
  { user_id: 1, course_id: 1, time_studied: 10, total: 30 },
];

exports.seed = (knex) => {
  return Promise.all(
    DATA.map(row => (
      knex('statistics').insert(row)
    ))
  );
};
