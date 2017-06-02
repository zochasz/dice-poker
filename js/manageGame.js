function DicePoker() {
  this.diceSides = [1,2,3,4,5,6];
  this.turn = 1, /* 1 or 2 */
  this.round = 0, /* 1 to 7 */
    this.player1 = {
      name: "Player1",
      score: 0
    },
    this.player2 = {
      name: "Player2",
      score: 0
    }};

  DicePoker.prototype.whoHasTurn = function(){
    return this.turn;
  }

  DicePoker.prototype.rollOneDice = function(){
    var randomNumber = Math.random();
    randomNumber = randomNumber * this.diceSides.length;
    randomNumber = Math.floor(randomNumber)
    var number = this.diceSides[randomNumber];
    return number;
  };
