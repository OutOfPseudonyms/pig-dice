// function PigDice() {
//   this.playerOneScore = 0;
//   this.playerTwoScore = 0;
  
// }
function Player(name) {
  this.name = name;
  this.score = 0;
  
}

// function rollDice(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function TurnOne() {
//   const roll = rollDice(1, 6);
  
// }

//User Interface Logic
$(document).ready(function () {
  $("#pig-dice-form").submit(function (event) {
    event.preventDefault();
    let userNameOne = $("#playerNameOne").val();
    let userNameTwo = $("#playerNameTwo").val();
    const userOne = new Player(userNameOne);
    const userTwo = new Player(userNameTwo);
    console.log(userOne.name);
    $('#pig-dice-form').hide();
    $('#player-names').show();
    $('#player-one-name').text(`Player 1: ${userOne.name}`);
    $('#player-two-name').text(`Player 2: ${userTwo.name}`);
  })
  $("#start-game").click(function() {
    alert( "Start Pig Dice game.");
  });
})