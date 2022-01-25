const consola = require('consola');
const Game = require('../model/Game');

module.exports = {
  registerSocketEvents: (io, socket) => {
    const pendingTransaction = [];

    const init = () => {
      consola.info('Player connected');
      socket.player = Game.addPlayer(socket.id);

      socket.broadcast.emit('game:new-player')
    };

    const onSendMoney = (receiverId, amount) => {
      const { from, to } = Game.transferMoney(socket.id, receiverId, amount);
      socket.emit('game:update-money', from);
      socket.broadcast.to(receiverId).emit('game:update-money', to);
    }

    const onAskMoney = (amount) => {
      const hash = Date.now().toString();

      pendingTransaction.push({
        from: socket.id,
        amount,
        hash
      });
      socket.emit('bank:need-confirm', hash);
      socket.broadcast.emit('bank:request-amount', socket.id, amount, hash);
    }

    const onBankConfirm = (hash) => {
      const transaction = pendingTransaction.find(t => t.hash === hash);
      socket.player.addMoney(transaction.amount);
      socket.broadcast.to(transaction.from).emit('bank:confirmed', transaction.amount, hash, socket.player.money);
    }

    const onDisconnect = async () => {
      socket.broadcast.emit('game:player-left')
      console.log('user disconnected', socket.id, socket.table);
    };

    socket.on('disconnect', onDisconnect);
    socket.on('money:send', onSendMoney)
    socket.on('money:ask', onAskMoney);
    socket.on('bank:confirmed', onBankConfirm);

    init();
  },
};
