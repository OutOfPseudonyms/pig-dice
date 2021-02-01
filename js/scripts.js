function PigDice(playerObjectOne, playerObjectTwo) {
  this.playerOne = playerObjectOne;
  this.playerTwo = playerObjectTwo;
  this.currentPlayer = 1;
  this.winningPlayer = 0;
}

PigDice.prototype.currentPlayerRoll = function () {
  const roll = rollDice(1, 6);
  if (this.currentPlayer === 1) {
    if (roll === 1) {
      this.playerOne.currentScore = 0;
      return false;
    } else {
      this.playerOne.currentScore += roll;
      return
    }
  } else if (this.currentPlayer === 2) {
    if (roll === 1) {
      this.playerTwo.currentScore = 0;
      return false;
    } else {
      this.playerTwo.currentScore += roll;
      return
    }
  }
}

PigDice.prototype.endTurn = function () {
  if (this.currentPlayer === 1) {
    this.playerOne.totalScore += this.playerOne.currentScore;
    this.playerOne.currentScore = 0;
    if (this.endGameCheck()) return true;
    this.currentPlayer = 2;
    $("#end-turn").hide();
    return
  } else if (this.currentPlayer === 2) {
    this.playerTwo.totalScore += this.playerTwo.currentScore;
    this.playerTwo.currentScore = 0;
    if (this.endGameCheck()) return true;
    this.currentPlayer = 1;
    $("#end-turn").hide();
    return
  }
}

PigDice.prototype.endGameCheck = function () {
  if (this.playerOne.totalScore >= 100) {
    this.winningPlayer = 1;
    return true;
  } else if (this.playerTwo.totalScore >=100) {
    this.winningPlayer = 2;
    return true;
  } else {
    return
  }
}

function Player(name) {
  this.name = name;
  this.currentScore = 0;
  // remember to reset total to 0
  this.totalScore = 0;
}

function rollDice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//=========================================================================
//User Interface Logic

function switchPlayer(gameObject) {
  if (gameObject.currentPlayer === 1) {
    $('#player-two-current-score').hide();
    $('#player-one-current-score').show();
    $('#player-one').addClass("current-player");
    $('#player-two').removeClass("current-player");
    $('#player-two-total-score').text(`Total Score: ${gameObject.playerTwo.totalScore}`);
  } else if (gameObject.currentPlayer === 2) {
    $('#player-one-current-score').hide();
    $('#player-two-current-score').show();
    $('#player-two').addClass("current-player");
    $('#player-one').removeClass("current-player");
    $('#player-one-total-score').text(`Total Score: ${gameObject.playerOne.totalScore}`);
  }
}

function gameOver(gameObject) {
  $("#roll").hide();
  $("#end-turn").hide();
  $("#player-one-current-score").empty();
  $("#player-two-current-score").empty();
  $("#player-one-total-score").show().text(`Total Score: ${gameObject.playerOne.totalScore}`);
  $("#player-two-total-score").show().text(`Total Score: ${gameObject.playerTwo.totalScore}`);
  if (gameObject.winningPlayer === 1) {
    $("#player-one").removeClass("current-player").addClass("winning-player");
    $("#player-two").removeClass("current-player").addClass("losing-player");
    $("#end-game").text("GAME OVER, Player One WINS!!!");
    $("#end-game").show();
  } else if(gameObject.winningPlayer ===2) {
    $("#player-two").removeClass("current-player").addClass("winning-player");
    $("#player-one").removeClass("current-player").addClass("losing-player");
    $("#end-game").text("GAME OVER, Player Two WINS!!!");
    $("#end-game").show();
  }
}


$(document).ready(function () {
  let userOne;
  let userTwo;
  $("#pig-dice-form").submit(function (event) {
    event.preventDefault();
    let userNameOne = $("#playerNameOne").val();
    let userNameTwo = $("#playerNameTwo").val();
    userOne = new Player(userNameOne);
    userTwo = new Player(userNameTwo);
    $('#pig-dice-form').hide();
    $('#player-names').show();
    $('#player-one-name').text(`Player 1: ${userOne.name}`);
    $('#player-two-name').text(`Player 2: ${userTwo.name}`);
  })
  $("#start-game").click(function () {
    const game = new PigDice(userOne, userTwo);
    $('#player-one').addClass("current-player");
    $('#player-one-current-score').text(`Current Score: ${game.playerOne.currentScore}`);
    $('#player-one-total-score').text(`Total Score: ${game.playerOne.totalScore}`);
    $('#player-two-current-score').text(`Current Score: ${game.playerTwo.currentScore}`);
    $('#player-two-total-score').text(`Total Score: ${game.playerTwo.totalScore}`);
    $('#start-game').hide();
    $('#roll').show();

    $("#roll").click(function () {
      const currentRoll = game.currentPlayerRoll();
      if (currentRoll === false) {
        game.endTurn();
        switchPlayer(game);
      } else {
        $('#player-one-current-score').text(`Current Score: ${game.playerOne.currentScore}`);
        $('#player-two-current-score').text(`Current Score: ${game.playerTwo.currentScore}`);
        $('#end-turn').show();
      }
    });

    $("#end-turn").click(function () {
      const checkScore = game.endTurn();
      if (checkScore) {
        gameOver(game);
      } else {
        switchPlayer(game);
      }
    });
  });
})

// write a prototype called endGameCheck that checks the players total score against 100 points.
// call endGameCheck in the endTurn prototype.
// write logic that tells the users the game is over and who won.