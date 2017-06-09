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

    rollActivate(1);
    rollDisable(2);
    document.getElementById("roll1").addEventListener("click", player1Roll);
    document.getElementById("roll2").addEventListener("click", player2Roll);
    document.getElementById("stand1").addEventListener("click", player1Stand);
    document.getElementById("stand2").addEventListener("click", player2Stand);
    document.getElementById("next").addEventListener("click", _nextButtonControls);
    // document.addEventListener("keydown", _nextButtonControls)
    // var keyCode = 32;

    function _nextButtonControls(){
      if (game.round%2!==0){
        if(game.currentPlayer===1 && game.turn===1){
          game.currentPlayer = 2;
          clearDices();
          rollActivate(2);
        }
        else if (game.currentPlayer===2 && game.turn===1){
          game.currentPlayer = 1;
          game.turn = 2;
          clearDices();
          rollActivate(1);
          standActivate(1);
        }
        else if (game.turn===2){
          _initializeControls();
          game.round+=1;
          game.turn=1
          clearDices();
          game.currentPlayer = 2;
        }
      }
      else if (game.round%2===0){
        if (game.currentPlayer===1 && game.turn===1){
          game.currentPlayer = 2;
          game.turn = 2;
          clearDices();
          rollActivate(2);
          standActivate(2);
        }
        else if (game.currentPlayer===2 && game.turn===1){
          game.currentPlayer = 1;
          clearDices();
          rollActivate(1);
        }
        else if (game.turn===2){
          _initializeControls();
          game.round+=1;
          game.turn=1;
          game.currentPlayer = 1;
        }
      }
    }

    function rollActivate(num){
      document.getElementById("roll"+num).disabled = false;
      document.getElementById("roll"+num).style.backgroundImage = "url(./img/glass_active.png)";
    }

    function rollDisable(num){
      document.getElementById("roll"+num).disabled = true;
      document.getElementById("roll"+num).style.backgroundImage = "url(./img/glass_disabled.png)";
    }

    function standActivate(num){
      document.getElementById("stand"+num).disabled = false;
      document.getElementById("stand"+num).style.backgroundImage = "url(./img/stand_active.png)";
    }

    function standDisable(num){
      document.getElementById("stand"+num).disabled = true;
      document.getElementById("stand"+num).style.backgroundImage = "url(./img/stand_disabled.png)";
    }

    function player1RollFirstTurn(){
      rollDisable(1);

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
      document.getElementById("next").disabled = false;
    };

    function whoPlays(){
      if (game.currentPlayer === 1){player1SaveForNextRoll()}
      else if (game.currentPlayer === 2) {player2SaveForNextRoll()}
    };

    function player2RollFirstTurn(){
      document.getElementById("next").disabled = true;
      rollDisable(2);
      for (i=1; i<6; i++){
        var number = rollDice.roll();
        document.getElementById("dices"+i).style.backgroundImage = "url(./img/"+number+".png)";
        document.getElementById("dices"+i).style.backgroundSize = "62px 62px";
        document.getElementById("dices"+i).style.backgroundColor = "#172537";
        document.getElementById("dices"+i).disabled = false;
        player2Dices.push(number);
      };
        return player2Dices;
    };

    function player2SaveForNextRoll(){
      var target = event.target;
      var dicesNumber = target.id;
      var targetId = parseInt(dicesNumber.substr(5, 1))+5;
      document.getElementById(dicesNumber).disabled = true;
      document.getElementById(dicesNumber).style.backgroundColor = "#172537";
      document.getElementById(dicesNumber).style.backgroundImage = "none";
      var number = player2Dices[targetId-6];
      player2MiniDices.push(number);
      document.getElementById("mini-dice"+targetId).style.backgroundImage = "url(./img/"+number+".png)";
      document.getElementById("mini-dice"+targetId).style.backgroundSize = "28px 28px";
      player2Dices[targetId-6]=null;
      document.getElementById("next").disabled = false;
    };

    function player1RollSecondTurn(){
      for (i=1; i<6; i++){
        if (player1Dices[i-1]!==null){
          var number = rollDice.roll();
          document.getElementById("dices"+i).style.backgroundImage = "url(img/"+number+".png)";
          document.getElementById("dices"+i).style.backgroundSize = "62px 62px";
          player1Dices[i-1] = number;
          document.getElementById("mini-dice"+i).style.backgroundImage = "url(img/"+number+".png)";
          document.getElementById("mini-dice"+i).style.backgroundSize = "28px 28px";
          player1MiniDices.push(number);
        }
      }
      game.currentBet += 2;
      game.player1.credits -=2;
      var credits1 = game.player1.credits;
      document.getElementById("js-credits1").innerHTML = credits1+" ";

      player1Results();

      if (game.round%2!==0){
        document.getElementById("next").disabled = true;
        rollActivate(2);
        standActivate(2);
        game.currentPlayer=2;
      }
      else if (game.round%2===0){
        document.getElementById("next").disabled = false;
      }
      clearDices();

      if (game.round%2===0){
        whoWins();
      }
    }

    function player2RollSecondTurn(){
      for (i=1; i<6; i++){
        if (player2Dices[i-1]!==null){
          var number = rollDice.roll();
          document.getElementById("dices"+i).style.backgroundImage = "url(img/"+number+".png)";
          document.getElementById("dices"+i).style.backgroundSize = "62px 62px";
          player2Dices[i-1] = number;
          document.getElementById("mini-dice"+(i+5)).style.backgroundImage = "url(img/"+number+".png)";
          document.getElementById("mini-dice"+(i+5)).style.backgroundSize = "28px 28px";
          player2MiniDices.push(number);
        }
      }
      game.currentBet += 2;
      console.log(game.currentBet);
      game.player2.credits -= 2;
      var credits2 = game.player2.credits;
      document.getElementById("js-credits2").innerHTML = credits2+" ";

      player2Results();

      if (game.round%2!==0){
        whoWins();
      }

      if (game.round%2!==0){
        document.getElementById("next").disabled = false;
      }
      else if (game.round%2===0){
        rollActivate(1);
        standActivate(1);
        document.getElementById("next").disabled = true;
        game.currentPlayer=1;
      }
      clearDices();
    }

    function player1Results(){
      var player1Ones = player1MiniDices.filter(function(value){return value === 1});
      var player1Twos = player1MiniDices.filter(function(value){return value === 2});
      var player1Trees = player1MiniDices.filter(function(value){return value === 3});
      var player1Fours = player1MiniDices.filter(function(value){return value === 4});
      var player1Fives = player1MiniDices.filter(function(value){return value === 5});
      var player1Sixes = player1MiniDices.filter(function(value){return value === 6});

      player1Numbers = [
        player1Sixes.length,
        player1Fives.length,
        player1Fours.length,
        player1Trees.length,
        player1Twos.length,
        player1Ones.length
      ]


      if (player1Numbers.toString()==="1,1,1,1,1,0"){
        player1Result = [2,3,3,0,0,0];
      }
      else if (player1Numbers.toString()==="0,1,1,1,1,1"){
        player1Result = [2,3,2,0,0,0];
      }
      else {
        player1Result = player1Numbers.map(function(a) {
          if (a === 1){return a = 0}
          else {return a};
        });
        player1Numbers = player1Result.slice();

        player1Result.sort(function(a, b) {
            return b - a;
        });
      }
    }

    function player2Results(){
      var player2Ones = player2MiniDices.filter(function(value){return value === 1});
      var player2Twos = player2MiniDices.filter(function(value){return value === 2});
      var player2Trees = player2MiniDices.filter(function(value){return value === 3});
      var player2Fours = player2MiniDices.filter(function(value){return value === 4});
      var player2Fives = player2MiniDices.filter(function(value){return value === 5});
      var player2Sixes = player2MiniDices.filter(function(value){return value === 6});

      player2Numbers = [
        player2Sixes.length,
        player2Fives.length,
        player2Fours.length,
        player2Trees.length,
        player2Twos.length,
        player2Ones.length ]

      if (player2Numbers.toString()==="1,1,1,1,1,0"){
          player2Result = [2, 3, 3, 0, 0, 0];
      }
      else if (player2Numbers.toString()==="0,1,1,1,1,1"){
          player2Result = [2, 3, 2, 0, 0, 0];
      }
      else {
          player2Result = player2Numbers.map(function(a) {
            if (a === 1){return a = 0}
            else {return a};
          });

          player2Numbers = player2Result.slice();

          player2Result.sort(function(a, b) {
                return b - a;
          });
      };
    }

    function gameOver(){
      if (game.player1.credits <= 0){
        document.getElementById("winner").style.backgroundImage = "url(img/winner2.png)";
        document.getElementById("who_wins").innerHTML = "PLAYER 2 WINS THIS GAME";
      }
       else if (game.player2.credits <= 0){
         document.getElementById("winner").style.backgroundImage = "url(img/winner1.png)";
         document.getElementById("who_wins").innerHTML = "PLAYER 1 WINS THIS GAME";
      }
    }

    function player1Wins(){
      document.getElementById("winner").style.backgroundImage = "url(img/winner1.png)";
      document.getElementById("who_wins").innerHTML = "PLAYER 1 WINS THIS ROUND";
      var credits1 = game.player1.credits;
      game.player1.credits += game.currentBet;
      credits1 += game.currentBet;
      game.currentBet = 0;
      document.getElementById("js-credits1").innerHTML = credits1+" ";
      console.log(player1Numbers);
      console.log(player1Result);
      console.log(player2Numbers);
      console.log(player2Result);
    }

    function player2Wins(){
      document.getElementById("winner").style.backgroundImage = "url(img/winner2.png)";
      document.getElementById("who_wins").innerHTML = "PLAYER 2 WINS THIS ROUND";
      var credits2 = game.player2.credits;
      game.player2.credits += game.currentBet;
      credits2 += game.currentBet;
      game.currentBet = 0;
      document.getElementById("js-credits2").innerHTML = credits2+" ";
      console.log(player1Numbers);
      console.log(player1Result);
      console.log(player2Numbers);
      console.log(player2Result);
    }

    function whoWins(){
      if (player1Result > player2Result){
        player1Wins();
      }
      else if (player1Result < player2Result){
        player2Wins();
      }
      else {
        if (player1Numbers > player2Numbers){
          player1Wins();
        }
        else if (player1Numbers < player2Numbers){
          player2Wins();
        }
        else {console.log("Tie!")}
      }
      startNewRound()
    }

    function startNewRound(){
      document.getElementById("next").disabled = false;
      rollDisable(1);
      rollDisable(2);
      standDisable(1);
      standDisable(2);
    }

    function _initializeControls(){
    player1Dices = [];
    player1MiniDices = [];
    player1Numbers = [];
    player1Result = [];
    player2Dices = [];
    player2MiniDices = [];
    player2Numbers = [];
    player2Result = [];

    clearDices();
    clearMiniDices();

    document.getElementById("next").disabled = true;
    if (game.round%2!==0){rollActivate(2);}
    else if (game.round%2===0){rollActivate(1);}
    document.getElementById("winner").style.backgroundImage = "none";
    document.getElementById("who_wins").innerHTML = " ";
  }

    function player1Roll(){
      if (game.currentPlayer === 1 && game.turn === 1) {
        player1RollFirstTurn();
      }
      else if (game.currentPlayer === 1 && game.turn === 2) {
        player1RollSecondTurn();
      }
    }

    function player2Roll(){
      if (game.currentPlayer === 2 && game.turn === 1) {
        player2RollFirstTurn();
      }
      else if (game.currentPlayer === 2 && game.turn ===2) {
        player2RollSecondTurn();
        }
      }

    function player1Stand(){
      game.currentBet += 1;
      game.player1.credits -=1;
      var credits1 = game.player1.credits;
      document.getElementById("js-credits1").innerHTML = credits1+" ";
      player2Wins();
      startNewRound();
    }

    function player2Stand(){
      game.currentBet += 1;
      game.player2.credits -=1;
      var credits2 = game.player2.credits;
      document.getElementById("js-credits2").innerHTML = credits2+" ";
      player1Wins();
      startNewRound();
    }

    function clearDices(){
    for (i=1; i<6; i++){
      document.getElementById("dices"+i).style.backgroundImage = "none";
      document.getElementById("dices"+i).disabled = true;
    }
  }

    function clearMiniDices(){
    for (i=1; i<11; i++){
      document.getElementById("mini-dice"+i).style.backgroundImage = "none";
      document.getElementById("mini-dice"+i).disabled = true;
    }
  }
