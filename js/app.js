var game;

window.onload = function () {
  game = new DicePoker();
}


document.getElementById("roll").addEventListener("click", rollFirstTurn);

var array1 = [];
function rollFirstTurn(){
  for (i=1; i<6; i++){
    var number = game.rollOneDice();
    document.getElementById("dice"+i).innerHTML = number;
    array1.push(number);
  }
};

var player1Dice1 = {
  value: 0,
  status: true
};
var player1Dice2 = {
  value: 0,
  status: true
};
var player1Dice3 = {
  value: 0,
  status: true
};
var player1Dice4 = {
  value: 0,
  status: true
};
var player1Dice5 = {
  value: 0,
  status: true
};
