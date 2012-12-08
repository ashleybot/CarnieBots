
$(document).ready(function(){
  var balloonPoints;
  if (balloonPoints == null) {
    initializeScores();
  }
  $(".balloon").click(function(){

  });
});

function initializeScores(){
  balloonPoints = {
    "blue":1,
    "green":2,
    "orange":3,
    "pink":4,
    "red":5
  };
}

function setScores(firstItem, secondItem){
  
}

function addScore(balloonState, color)
{
  if (balloonState == 0){
    $("#scoreboard").append("<p>" + color + " balloon popped " + balloonPoints[color] + " points.</p>");
    var totalDiv = $("#total");
    var totalScore = parseInt(totalDiv.text());
    totalScore += balloonPoints[color];
    
    totalDiv.text(totalScore);
    console.log(totalScore);
  }
}