const consola = require('consola');
const Player = require('../model/Player');

const Game = require('../model/Game');

module.exports = {
  registerSocketEvents: (io, socket) => {
    const init = () => {
      consola.info('Player connected');
      const p = new Player(socket.id);

      socket.broadcast.emit('game:new-player')
    };

    const onDisconnect = async () => {
      socket.broadcast.emit('game:player-left')
      console.log('user disconnected', socket.id, socket.table);
    };

    socket.on('disconnect', onDisconnect);
    socket.on('game:')

    init();
  },
};
