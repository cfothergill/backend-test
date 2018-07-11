const validate = require('../util/validate');

class Statistic {
  constructor(userId, courseId, timeStudied, total) {
    validate.required({
      userId,
      courseId,
      timeStudied,
      total,
    });

    this._userId = userId;
    this._courseId = courseId;
    this._timeStudied = timeStudied;
    this._total = total;
  }

  get userId() { return this._userId; }
  get courseId() { return this._courseId; }
  get timeStudied() { return this._timeStudied; }
  get total() { return this._total; }
}

module.exports = Statistic;
