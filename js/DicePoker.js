function DicePoker() {
  this.diceSides = [1,2,3,4,5,6];
  this.currentPlayer = 1; /*1 or 2*/
  this.turn = 1; /* 1 or 2 */
  this.currentBet = 0;
  // this.round = 1; /* 1 to 7 */

  this.player1 = {
    name: "Player1",
    credits: 5
  }

  this.player2 = {
    name: "Player2",
    credits: 5
  }
  };

  // DicePoker.prototype.whoHasTurn = function(){
  //   return this.turn;
  // }
