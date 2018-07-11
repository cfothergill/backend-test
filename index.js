const http = require('http');
const waitPort = require('wait-port');
const { app, db } = require('./src');

(async () => {
  await waitPort({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
  });

  await db.migrate.latest();

  const server = http.createServer(app);
  server.listen(3000, () => console.log('Running...'));
})();
