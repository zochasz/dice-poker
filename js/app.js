var game;

window.onload = function () {
  game = new DicePoker();
}


document.getElementById("roll").addEventListener("click", player1RollFirstTurn);

var player1Dices = [];
function player1RollFirstTurn(){
  for (i=1; i<6; i++){
    var number = game.rollOneDice();
    document.getElementById("dice"+i).innerHTML = number;
    player1Dices.push(number);
    document.getElementById("dice"+i).disabled = false;
    document.getElementById("dice"+i).addEventListener("click", player1SaveForNextRoll);
  }
  document.getElementById("roll").removeEventListener("click", player1RollFirstTurn);
};

function player1SaveForNextRoll(){
    var target = event.target;
    for (i=1; i<6; i++){
      if (target.id ==="dice"+i){document.getElementById("dice"+i).disabled = true;}
    }

    document.getElementById("roll").addEventListener("click", player1RollSecondTurn);
};

function player1RollSecondTurn(){
  for (i=1; i<6; i++){
    if (document.getElementById("dice"+i).disabled === false){
      var number = game.rollOneDice();
      document.getElementById("dice"+i).innerHTML = number;
      player1Dices[i-1] = number;
    }
  }
  document.getElementById("roll").removeEventListener("click", player1RollSecondTurn);
  document.getElementById("roll").addEventListener("click", player2RollFirstTurn);
  document.getElementById("player1").style.backgroundColor = "lightgrey";
  document.getElementById("player2").style.backgroundColor = "orange";
  document.getElementById("dices-player1").style.backgroundColor = "lightgrey";
  document.getElementById("dices-player2").style.backgroundColor = "orange";

  player1Dices.sort(function(a, b) {
    return a - b;
  });
}


var player2Dices = [];
function player2RollFirstTurn(){
  for (i=6; i<11; i++){
    var number = game.rollOneDice();
    document.getElementById("dice"+i).innerHTML = number;
    player2Dices.push(number);
    document.getElementById("dice"+i).disabled = false;
    document.getElementById("dice"+i).addEventListener("click", player2SaveForNextRoll);
  }
  document.getElementById("roll").removeEventListener("click", player2RollFirstTurn);
};

function player2SaveForNextRoll(){
    var target = event.target;
    for (i=6; i<11; i++){
      if (target.id ==="dice"+i){document.getElementById("dice"+i).disabled = true;}
    }

    document.getElementById("roll").addEventListener("click", player2RollSecondTurn);
};

function player2RollSecondTurn(){
  for (i=6; i<11; i++){
    if (document.getElementById("dice"+i).disabled === false){
      var number = game.rollOneDice();
      document.getElementById("dice"+i).innerHTML = number;
      player2Dices[i-6] = number;
    }
  }
  document.getElementById("roll").removeEventListener("click", player2RollSecondTurn);
  player2Dices.sort(function(a, b) {
    return a - b;
  });


var player1Ones = player1Dices.filter(function(value){return value === 1});
var player1Twos = player1Dices.filter(function(value){return value === 2});
var player1Trees = player1Dices.filter(function(value){return value === 3});
var player1Fours = player1Dices.filter(function(value){return value === 4});
var player1Fives = player1Dices.filter(function(value){return value === 5});

console.log(player1Ones);
console.log(player1Twos);
console.log(player1Trees);
console.log(player1Fours);
console.log(player1Fives);
}
