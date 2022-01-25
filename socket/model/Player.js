const MONEY_PER_PLAYER = 1500;

class Player {
  constructor(name) {
    this.fund = MONEY_PER_PLAYER;
    this.name = name;
  }

  addMoney(amount) {
    this.fund += amount;
  }

  sendMoneyTo(receiver, amount) {
    receiver.addMoney(amount);
  }
}

module.exports = Player;
