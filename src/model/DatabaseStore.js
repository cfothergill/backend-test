const Summary = require('./Summary');

class DatabaseStore {
  constructor(db) {
    this.db = db;
  }

  async summary(userId, courseId) {
    const res = await this.db('statistics')
      .where({ user_id: userId, course_id: courseId })
      .sum('time_studied as timeStudied')
      .avg('total as averageScore')
      .first();

    return new Summary(
      res.timeStudied || 0,
      res.averageScore || 0
    );
  }

  async save(statistic) {
    await this.db('statistics').insert({
      user_id: statistic.userId,
      course_id: statistic.courseId,
      time_studied: statistic.timeStudied,
      total: statistic.total,
    });
  }
}

module.exports = DatabaseStore;
