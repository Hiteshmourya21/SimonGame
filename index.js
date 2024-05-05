var buttonColours  = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;

$(document).on("keypress touchstart",function(){
    if(gameStarted==false){
        
        $("#level-title").text("Level "+level)
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").on("click",function(){
    var userChosenColour  = this.id;
    userClickedPattern.push(userChosenColour);

    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
        if (userClickedPattern.length === gamePattern.length){
  
            setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text( "Game Over, Press Any Key to Restart");
        startOver();
      }
    }

function nextSequence(){
    $("#level-title").text("Level "+level)
    level++;
    userClickedPattern = [];

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);



}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function startOver(){
    gameStarted = false;
    level = 0;
    gamePattern.length =0;
    userClickedPattern.length=0;

}