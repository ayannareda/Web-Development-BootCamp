function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(index){
    if(userClickedPattern[index]==gamePattern[index]){
        if(userClickedPattern.length==gamePattern.length){
            userClickedPattern=[];
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        Level=0;
        gameStarted=false;
        userClickedPattern=[];
        gamePattern=[];
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
    }
}

function nextSequence() {
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    Level+=1;
    $("h1").text("Level "+Level);
}




// Main Code

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var Level = 0;

$(document).on("keydown", function(){
    if(!gameStarted){
        nextSequence();
        gameStarted=true;
    }
});

$(".btn").on("click", function(event){
    if(gameStarted){
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});