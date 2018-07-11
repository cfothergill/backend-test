const validate = require('../util/validate');

class Summary {
  constructor(timeStudied, averageScore) {
    validate.required({
      timeStudied,
      averageScore,
    });

    this._timeStudied = timeStudied;
    this._averageScore = averageScore;
  }

  get timeStudied() { return this._timeStudied }
  get averageScore() { return this._averageScore }
}

module.exports = Summary;
