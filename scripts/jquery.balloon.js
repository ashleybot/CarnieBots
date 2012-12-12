var speechBubbleMax = 13;
var speechBubblePosition = 1;
$(document).ready(function(){
      var snd = new Audio("/audio/Pop.mp3"); // buffers automatically when created

  $(".balloon").click(function(){
    
      var balloon = $(this);
      var src = balloon.attr('src');
      var color = getColor(src);
      var balloonState = getIndex(src);
      
      if (balloonState == 0){
        snd.currentTime = 0;
        snd.play();
        var i = 0, max = 3;
        var slowloop = function (){
          if (i++ < max){
            changeState(balloon, color, i);
            setTimeout(slowloop, 100);
          }
        };
        slowloop();
        addScore(balloonState, color);
      }
  });
  
  $(".speechNext").click(function(){
    var top = -200 * speechBubblePosition;
    if (speechBubblePosition < speechBubbleMax){
      speechBubblePosition++;
    }
    $(".speechBubbles").css("background","url('/images/characters/BalloonDartsSpeechBubbles.png') 0 " + top + "px");
  });
});

function getColor(src){
  var color;
  if (src.indexOf("blue") >= 0){
    color = "blue";
  }
  else if(src.indexOf("green") >= 0){
    color = "green";
  }
  else if(src.indexOf("orange") >= 0){
    color = "orange";
  }
  else if(src.indexOf("pink") >= 0){
    color = "pink";
  }
  else if(src.indexOf("red") >= 0){
    color = "red";
  }
  else if(src.indexOf("yellow") >= 0){
    color = "yellow";
  }
  else{
    color = "";
  }
  return color;
}

function getIndex(src){
  return src.match(/\d+/);
  /*number++;
  if (number < 4){
    balloon.attr('src', "images/" + color + "balloon/" + number + ".png");
  }*/
}

function changeState(balloon, color, index){
  // maybe more realistic without fading?
  balloon.attr('src', "/images/" + color + "balloon/" + index + ".png");
  /*balloon.fadeOut('fast', function () {
    balloon.attr('src', "images/" + color + "balloon/" + index + ".png");

    balloon.fadeIn('fast');          
  });*/
}