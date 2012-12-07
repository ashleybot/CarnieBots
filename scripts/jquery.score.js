var balloonPoints = {
  "blue":1,
  "green":2,
  "orange":3,
  "pink":4,
  "red":5
};

$(document).ready(function(){
  $(".balloon").click(function(){
    var balloon = $(this);
    var src = balloon.attr('src');
    var color = getColor(src);
    
    $("#scoreboard").append("<p>" + color + " balloon popped " + balloonPoints[color] + " points.</p>");
  });
});