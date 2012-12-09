
$(document).ready(function(){

  var balloonPoints;
  if (balloonPoints == null) {
    initializeScores();
  }
  $(".balloon").click(function(){

  });
});

function initializeScores(){
  var scoreCookie = document.cookie["CarnieBotScore"];
  if (scoreCookie == null){
    balloonPoints = {
      "blue":1,
      "green":2,
      "orange":3,
      "pink":4,
      "red":5
    };
    
    $.JSONCookie("CarnieBotScore", balloonPoints, {path: '/'});  
  }
  var o = $.JSONCookie("CarnieBotScore");
  console.log(JSON.stringify(o));

}

function setScores(movedItem){
  console.log(movedItem);
  $.cookie('the_cookie', 'the_value');
  $.JSONCookie("CarnieBotScore", balloonPoints, {path: '/'}); 
  console.log(document.cookie["CarnieBotScore"]);
  var o = $.JSONCookie("CarnieBotScore");
  console.log(JSON.stringify(o)); 
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