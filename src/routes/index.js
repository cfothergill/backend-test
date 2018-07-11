const { Router } = require('express');
const asyncHandler = require('./asyncHandler');
const summary = require('./summary');
const record = require('./record');

const routes = (db) => {
  return new Router()
    .get('/course/:courseId', asyncHandler(summary(db)))
    .post('/course/:courseId', asyncHandler(record(db)));
};

module.exports = routes;
