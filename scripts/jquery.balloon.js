$(document).ready(function(){
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
  balloon.attr('src', "images/" + color + "balloon/" + index + ".png");
  /*balloon.fadeOut('fast', function () {
    balloon.attr('src', "images/" + color + "balloon/" + index + ".png");

    balloon.fadeIn('fast');          
  });*/
}