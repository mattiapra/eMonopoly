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
}

module.exports = new Game();
