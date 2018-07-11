const path = require('path');

const dbPath = (rel) =>
  path.resolve(__dirname, rel);

module.exports = {
  client: process.env.DB_DRIVER,
  useNullAsDefault: true,

  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    filename: process.env.DB_FILENAME,
  },

  migrations: { directory: dbPath('./migrations') },
  seeds: { directory: dbPath('./seeds') },
};
