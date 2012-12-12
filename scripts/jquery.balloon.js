var speechBubbleMax = 8;
var speechBubblePosition = 1;
$(document).ready(function(){
  $("#tryItButton").css('visibility', 'hidden');
  $("#backButton").css('visiblity', 'hidden');
  
  $(".balloon").click(function(){
    
      var balloon = $(this);
      var src = balloon.attr('src');
      var color = getColor(src);
      var balloonState = getIndex(src);
      
      if (balloonState == 0){
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
    if (speechBubblePosition > 1){
      $("#tryItButton").css('visibility', 'hidden');
      $("#backButton").css('visiblity', 'visible');
    }
    if (speechBubblePosition < speechBubbleMax){
      speechBubblePosition++;
    }
    else{
      $("#tryItButton").css('visibility', 'visible');
      $("#backButton").css('visiblity', 'hidden');
    }
    $(".speechBubbles").css("background","url('/images/characters/BalloonDartsSpeechBubbles.png') 0 " + top + "px");
  });
  
  $(".speechBack").click(function(){
    if (speechBubblePosition > 1){
      speechBubblePosition--;
    }
    var top = -200 * speechBubblePosition;
    $(".speechBubbles").css("background","url('/images/characters/BalloonDartsSpeechBubbles.png') 0 " + top + "px");
    console.log("back");
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