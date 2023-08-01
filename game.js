var buttonColors = ["red", "blue","green", "yellow"];
var gamePattern = [];
var userClickPatter = [];

var started = false;
var level = 0;


$(document).keypress(function(event) {
    if (!started) {
        $("h1").text("Oliver's bilspill " + level);
        nextSquare();
        started = true;
    }
})


function playSound(color) {
    switch (color) {
        
        case 'green':
            var green = new Audio("sounds/green.mp3")
            green.play()
            break;

        case 'red':
            var red = new Audio("sounds/red.mp3")
            red.play()
            break;

        case 'blue':
            var blue = new Audio("sounds/blue.mp3")
            blue.play()
            break;

        case 'yellow':
            var yellow = new Audio("sounds/yellow.mp3")
            yellow.play()
            break;

        case 'wrong':
            var yellow = new Audio("sounds/wrong.mp3")
            yellow.play()
            break;
        
        default:
            console.log("Unknown key " + color);
      }
      
}

function animatePress(eventTarget){
    $(eventTarget).addClass("pressed");
    setTimeout(function () {
        $(eventTarget).removeClass("pressed");
    } , 100);
}

function nextSquare(){
    userClickPatter = [];
    level++;
    $("h1").text("Oliver's bilspill " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randomChoiceColor = buttonColors[randNum];

    gamePattern.push(randomChoiceColor);
    $("#" + randomChoiceColor).fadeOut(100).fadeIn(100);
    playSound(randomChoiceColor)
}

$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickPatter.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(event.target);

    checkAnswer(userClickPatter.length - 1);
})


function checkAnswer(currentLevel) {
    if (userClickPatter[currentLevel] === gamePattern[currentLevel]) {
        if(userClickPatter.length === gamePattern.length) {
            setTimeout(function() {
                nextSquare();
            }, 1000);
        }
    }

    else {
        playSound("wrong")
        startOver()
        $("h1").text("Slutt på spillet! Trykk en tast for å starte over.")
        
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started=false;
}
