const socketio = require('socket.io');
const consola = require('consola');

const { registerSocketEvents } = require('./registerSocketEvents');

const registerSocketServer = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    },
  });

  consola.success(`SocketIO attached`);

  io.on('connection', (socket) => {
    registerSocketEvents(io, socket)
  });
};

module.exports = registerSocketServer;
