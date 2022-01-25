const PORT = process.env.PORT || 3000;

const consola = require('consola');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

const registerSocketServer = require('./socket');

consola.wrapAll();

app.use(cors());
app.use(bp.json());

registerSocketServer(server);

server.listen(PORT, () => {
  consola.success(`Server is listening`);
});
