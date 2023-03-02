var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
//keypress to play the sound
var started = false;
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

//store the id

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);


  playSound(userChosenColor);

  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    gameOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  //random choosen color
  var userChosenColor = buttonColors[randomnumber];

  gamePattern.push(userChosenColor);


  //flash button animate code start here
  $("#" + userChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeIn(100);
  //animatePress(userChosenColor)
  playSound(userChosenColor);
}

//Animate Pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed"), 100;
  });
}

//Play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
