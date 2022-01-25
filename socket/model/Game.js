const Player = require('./Player')

class Game {
  constructor() {
    this.players = [];
  }

  addPlayer(id) {
    const p = new Player(id);
    this.players.push(p);
    return p;
  }

  transferMoney(fromId, toId, amount) {
    const from = this.players.find(p => p.equals(fromId));
    const to = this.players.find(p => p.equals(toId));

    from.addMoney(-amount);
    to.addMoney(amount);

    return {
      from: from.money,
      to: to.money
    }
  }
}

module.exports = new Game();
