var game;

window.onload = function () {
  game = new DicePoker();
}


document.getElementById("roll").addEventListener("click", player1RollFirstTurn);

var array1 = [];
function player1RollFirstTurn(){
  for (i=1; i<6; i++){
    var number = game.rollOneDice();
    document.getElementById("dice"+i).innerHTML = number;
    array1.push(number);
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
      array1[i-1] = number;
    }
    document.getElementById("roll").removeEventListener("click", player1RollSecondTurn);
    document.getElementById("roll").addEventListener("click", player2RollFirstTurn);
  }
}


var array2 = [];
function player2RollFirstTurn(){
  for (i=6; i<11; i++){
    var number = game.rollOneDice();
    document.getElementById("dice"+i).innerHTML = number;
    array2.push(number);
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
      array2[i-6] = number;
    }
    document.getElementById("roll").removeEventListener("click", player2RollSecondTurn);
  }
}
