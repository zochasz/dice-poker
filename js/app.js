var game;
var rollDice;

window.onload = function () {
  game = new DicePoker();
  rollDice = new Dice(6);
}

    var player1Dices = [];
    var player1MiniDices = [];
    var player1Numbers;
    var player1Result;
    var player2Dices = [];
    var player2MiniDices = [];
    var player2Numbers;
    var player2Result;
    document.getElementById("roll2").disabled = true;
    document.getElementById("roll1").addEventListener("click", player1Roll);
    document.getElementById("roll2").addEventListener("click", player2Roll);

    function player1RollFirstTurn(){
      document.getElementById("roll1").disabled = true;

      for (i=1; i<6; i++){
        var number = rollDice.roll();
        document.getElementById("dices"+i).style.backgroundImage = "url(./img/"+number+".png)";
        document.getElementById("dices"+i).style.backgroundSize = "62px 62px";
        document.getElementById("dices"+i).style.backgroundColor = "#172537";
        document.getElementById("dices"+i).disabled = false;
        player1Dices.push(number);
        document.getElementById("dices"+i).addEventListener("click", whoPlays);
      }
        return player1Dices;
    };

    function player1SaveForNextRoll(){
      var target = event.target;
      var dicesNumber = target.id;
      var targetId = dicesNumber.substr(5, 1);
      document.getElementById(dicesNumber).disabled = true;
      document.getElementById(dicesNumber).style.backgroundColor = "#172537";
      document.getElementById(dicesNumber).style.backgroundImage = "none";
      var number = player1Dices[targetId-1];
      player1MiniDices.push(number);
      document.getElementById("mini-dice"+targetId).style.backgroundImage = "url(./img/"+number+".png)";
      document.getElementById("mini-dice"+targetId).style.backgroundSize = "28px 28px";
      player1Dices[targetId-1]=null;
      game.turn = 1;
      document.getElementById("roll2").disabled = false;
      //game.currentPlayer = 2;
    };

    function whoPlays() {
      if (game.currentPlayer === 1){player1SaveForNextRoll()}
      else if (game.currentPlayer === 2) {player2SaveForNextRoll()}
    };

    function player2RollFirstTurn(){
      document.getElementById("roll2").disabled = true;

      for (i=1; i<6; i++){
        var number = rollDice.roll();
        document.getElementById("dices"+i).style = "background: url(img/"+number+".png)";
        document.getElementById("dices"+i).style.backgroundSize = "100px 100px";
        document.getElementById("dices"+i).style.backgroundColor = "#FDEE92";
        document.getElementById("dices"+i).disabled = false;
        player2Dices.push(number);
      };
        return player2Dices;
    };

    function player2SaveForNextRoll(){
      var target = event.target;
      for (i=1; i<6; i++){
        if (target.id ==="dices"+i){
          document.getElementById("dices"+i).disabled = true;
          document.getElementById("dices"+i).style.backgroundColor = "#172537";
          document.getElementById("dices"+i).style.backgroundImage = "none";
          var number = player2Dices[i-1];
          player2MiniDices.push(number);
          document.getElementById("mini-dice"+(i+5)).style.backgroundImage = "url(./img/"+number+".png)";
          document.getElementById("mini-dice"+(i+5)).style.backgroundSize = "45px 45px";
          player2Dices[i-1]=null;
        }
      }
      document.getElementById("roll1").disabled = false;
      game.currentPlayer = 1;
      game.turn = 2;
    };

    function player1RollSecondTurn(){
      for (i=0; i<6; i++){
        if (player1Dices[i]===null){
          var number = rollDice.roll();
          document.getElementById("dices"+i).style.backgroundImage = "url(img/"+number+".png)";
          document.getElementById("dices"+i).style.backgroundSize = "100px 100px";
          player1Dices[i] = number;
          document.getElementById("mini-dice"+i).style.backgroundImage = "url(img/"+number+".png)";
          document.getElementById("mini-dice"+i).style.backgroundSize = "45px 45px";
        }
      }
      game.currentBet += 2;
      game.player1.credits -=2;
      player1Results(player1Dices);
      game.currentPlayer = 2;
      game.turn = 2;
      document.getElementById("roll2").disabled = false;
    }

    function player2RollSecondTurn(){
      for (i=1; i<6; i++){
        if (document.getElementById("dices"+i).disabled === false){
          var number = rollDice.roll();
          document.getElementById("dices"+i).style = "background: url(img/"+number.toString()+".png); background-size: 100px 100px";
          player2Dices[i-6] = number;
        }
      }
      game.currentBet += 2;
      game.player1.credits -= 2;

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
        var credits1 = game.player1.credits += game.currentBet;
        game.currentBet = 0;
        document.getElementById("js-credits1").innerHTML = credits1;
      }
      else if (player1Result < player2Result){
        console.log("Player 2 wins!");
        var credits2 = game.player2.credits += game.currentBet;
        game.currentBet = 0;
        document.getElementById("js-credits2").innerHTML = credits2;
      }
      else {
        if (player1Numbers > player2Numbers){
          console.log("Player 1 wins!");
          var credits1 = game.player1.credits += game.currentBet;
          game.currentBet = 0;
          document.getElementById("js-credits1").innerHTML = credits1;
        }
        else if (player1Numbers < player2Numbers){
          console.log("Player 2 wins!");
          var credits2 = game.player2.credits += game.currentBet;
          game.currentBet = 0;
          document.getElementById("js-credits2").innerHTML = credits2;
        }
        else {console.log("Tie!")}
      }
      startNewRound()
    }

  function startNewRound(){
    document.getElementById("next").disabled = false;
    document.getElementById("roll1").disabled = true;
    document.getElementById("roll2").disabled = true;
    document.getElementById("next").addEventListener("click", ereaseNumbers);
  }

  function ereaseNumbers(){
    var player1Dices = [];
    var player1MiniDices = [];
    var player1Numbers;
    var player1Result;
    var player2Dices = [];
    var player2MiniDices = [];
    var player2Numbers;
    var player2Result;

    for (i=1; i<11; i++){
      document.getElementById("dices"+i).style.backgroundImage = "none";
      document.getElementById("dices"+i).disabled = false;
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

  function player1Roll(){
    if (game.currentPlayer === 1 && game.turn === 1) {
      player1RollFirstTurn();
      console.log("p1t1");
      console.log(player1Dices);
      console.log(player2Dices);
    }
    else if (game.currentPlayer === 1 && game.turn === 2) {
      player1RollSecondTurn();
      console.log("p1t2");
      console.log(player1Dices);
      console.log(player2Dices);}
  }

  function player2Roll(){
    if (game.currentPlayer === 2 && game.turn === 1) {
      player2RollFirstTurn();
      console.log("p2t1");
      console.log(player1Dices);
      console.log(player2Dices);}
    else if (game.currentPlayer === 2 && game.turn ===2) {
      player2RollSecondTurn();
      console.log("p2t2");
      console.log(player1Dices);
      console.log(player2Dices);}
  }
