var game;
var rollDice;


window.onload = function () {
  game = new DicePoker();
  rollDice = new Dice(6)
}



    var player1Dices = [];
    var player1Numbers;
    var player1Result;
    var player2Dices = [];
    var player2Numbers;
    var player2Result;

    document.getElementById("roll").addEventListener("click", playerRoll);

    function player1RollFirstTurn(){
      for (i=1; i<6; i++){
        var number = rollDice.roll();
        document.getElementById("dice"+i).innerHTML = number;
        player1Dices.push(number);
        document.getElementById("dice"+i).disabled = false;
        document.getElementById("dice"+i).addEventListener("click", player1SaveForNextRoll);
      }
      return player1Dices;
    };

    function player1SaveForNextRoll(){
        var target = event.target;
        for (i=1; i<6; i++){
          if (target.id ==="dice"+i){document.getElementById("dice"+i).disabled = true;}
        }
        game.turn = 2;
    };

    function player1RollSecondTurn(){
      for (i=1; i<6; i++){
        if (document.getElementById("dice"+i).disabled === false){
          var number = rollDice.roll();
          document.getElementById("dice"+i).innerHTML = number;
          player1Dices[i-1] = number;
        }
      }

      document.getElementById("player1").style.backgroundColor = "lightgrey";
      document.getElementById("player2").style.backgroundColor = "orange";
      document.getElementById("dices-player1").style.backgroundColor = "lightgrey";
      document.getElementById("dices-player2").style.backgroundColor = "orange";

      player1Results(player1Dices);
      game.currentPlayer = 2;
      game.turn = 1;
    }

    function player2RollFirstTurn(){
      for (i=6; i<11; i++){
        var number = rollDice.roll();
        document.getElementById("dice"+i).innerHTML = number;
        player2Dices.push(number);
        document.getElementById("dice"+i).disabled = false;
        document.getElementById("dice"+i).addEventListener("click", player2SaveForNextRoll);
      }
      return player2Dices;
    };

    function player2SaveForNextRoll(){
        var target = event.target;
        for (i=6; i<11; i++){
          if (target.id ==="dice"+i){document.getElementById("dice"+i).disabled = true;}
        }
        game.turn = 2;
    };

    function player2RollSecondTurn(){
      for (i=6; i<11; i++){
        if (document.getElementById("dice"+i).disabled === false){
          var number = rollDice.roll();
          document.getElementById("dice"+i).innerHTML = number;
          player2Dices[i-6] = number;
        }
      }

      player2Results(player2Dices);

      whoWins();

      game.currentPlayer = 1;
      game.turn = 1;
    }

  function player1Results(player1Dices){
    var player1Ones = player1Dices.filter(function(value){return value === 1});
    var player1Twos = player1Dices.filter(function(value){return value === 2});
    var player1Trees = player1Dices.filter(function(value){return value === 3});
    var player1Fours = player1Dices.filter(function(value){return value === 4});
    var player1Fives = player1Dices.filter(function(value){return value === 5});
    var player1Sixes = player1Dices.filter(function(value){return value === 6});

    player1Numbers = [
      player1Sixes.length,
      player1Fives.length,
      player1Fours.length,
      player1Trees.length,
      player1Twos.length,
      player1Ones.length ]

    player1Result = player1Numbers.map(function(a) {
      if (a === 1){return a = 0}
      else {return a};
      });

    player1Numbers = player1Result.slice();

    player1Result.sort(function(a, b) {
        return b - a;
      });
  }

  function player2Results(player2Dices){
    var player2Ones = player2Dices.filter(function(value){return value === 1});
    var player2Twos = player2Dices.filter(function(value){return value === 2});
    var player2Trees = player2Dices.filter(function(value){return value === 3});
    var player2Fours = player2Dices.filter(function(value){return value === 4});
    var player2Fives = player2Dices.filter(function(value){return value === 5});
    var player2Sixes = player2Dices.filter(function(value){return value === 6});

    player2Numbers = [
      player2Sixes.length,
      player2Fives.length,
      player2Fours.length,
      player2Trees.length,
      player2Twos.length,
      player2Ones.length ]

    player2Result = player2Numbers.map(function(a) {
        if (a === 1){return a = 0}
        else {return a};
      });
    player2Numbers = player2Result.slice();

    player2Result.sort(function(a, b) {
          return b - a;
        });

        console.log(player1Numbers);
        console.log(player1Result);

        console.log(player2Numbers);
        console.log(player2Result);
  }

  function whoWins(){

    if (player1Result > player2Result){
      console.log("Player 1 wins!");
      var score1 = game.player1.score +=1;
      document.getElementById("js-score1").innerHTML = score1;

    }
    else if (player1Result < player2Result){
      console.log("Player 2 wins!");
      var score2 = game.player2.score +=1;
      document.getElementById("js-score2").innerHTML = score2;
    }
    else {
      if (player1Numbers > player2Numbers){
        console.log("Player 1 wins!");
        var score1 = game.player1.score +=1;
        document.getElementById("js-score1").innerHTML = score1;
      }
      else if (player1Numbers < player2Numbers){
        console.log("Player 2 wins!");
        var score2 = game.player2.score +=1;
        document.getElementById("js-score2").innerHTML = score2;
      }
      else {console.log("Tie!")}
    }
    startNewRound()
  }

  function startNewRound(){
    document.getElementById("next").disabled = false;
    document.getElementById("roll").disabled = true;
    document.getElementById("next").addEventListener("click", ereaseNumbers);
  }

  function ereaseNumbers(){
    for (i=1; i<11; i++){
      document.getElementById("dice"+i).innerHTML = " ";
      document.getElementById("dice"+i).disabled = false;
    }
    if (game.round<7) {
      var round = game.round +=1;
    }
    else {
      return;
    }
    document.getElementById("round").innerHTML = round;
    document.getElementById("roll").disabled = false;
    document.getElementById("next").disabled = true;
}

  // function disableNextButton(){
  //   document.getElementById("next").disabled = true;
  // }

  function playerRoll(){
    if (game.currentPlayer === 1 && game.turn === 1) {
      player1RollFirstTurn();
      console.log("p1t1");
    }
    else if (game.currentPlayer === 1 && game.turn === 2) {
      player1RollSecondTurn();
      console.log("p1t2");
    }
    else if (game.currentPlayer === 2 && game.turn === 1) {
      player2RollFirstTurn();
      console.log("p2t1");
    }
    else if (game.currentPlayer === 2 && game.turn ===2) {
      player2RollSecondTurn();
      console.log("p2t2");
    }
  }
  // function ableRollButton(){
  //   document.getElementById("roll").disabled = false;
  // }
