const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const { DatabaseStore } = require('./model');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();
const store = new DatabaseStore(db);

app.use(bodyParser.json());
app.use(middleware.auth());
app.use(routes(store));
app.use(middleware.notFound());
app.use(middleware.errorHandler());

module.exports = app;
