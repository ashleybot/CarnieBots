var balloonPoints = {
  "blue":1,
  "green":2,
  "orange":3,
  "pink":4,
  "red":5
};

$(document).ready(function(){
  $(".balloon").click(function(){

  });
});

function addScore(balloonState, color)
{
    
    if (balloonState == 0){
      $("#scoreboard").append("<p>" + color + " balloon popped " + balloonPoints[color] + " points.</p>");
    }
}