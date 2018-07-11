
exports.up = (knex) => {
  return knex.schema.createTable('statistics', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').unsigned();
    t.integer('course_id').unsigned();
    t.integer('time_studied');
    t.integer('total');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('statistics');
};
