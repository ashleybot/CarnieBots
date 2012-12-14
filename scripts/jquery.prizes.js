var prizeFileNames = ["sunglasses.png","basketball.png","scotty.png","pinguino.png","seuss.png","scooter.png"];

function canGetPrizes(level){
  // easyBalloon, hardBalloon
  var count = 0;
  if ("easyBalloon"){
    count = parseInt($.cookie("EasyBalloonPrizes"));
    if (count < 4){
      count++;
      $.cookie("EasyBalloonPrizes", count, {path: '/game'});
      return true;
    }
  }
  else if ("hardBalloon"){
    count = parseInt($.cookie("HardBalloonPrizes"));
    if (count < 4){
      count++;
      $.cookie("HardBalloonPrizes", count, {path: '/game'});
      return true;
    }

  }
  return false;
}

function storePrize(filename,index){
  // convert index to x,y
}

function getPrizeFromBoard(index){
}

function getCurrentPrize() {
  
  var fileName = "";
  
  var prizesCollected = $.cookie("PrizesCollected");
  var count = parseInt(prizesCollected);
  
  if (count > -1) {
    fileName = prizesCollected[count];
  }
  
  return fileName;
}

function getNewPrize() {
  var fileName = "";
  
  var prizesCollected = $.cookie("PrizesCollected");
  var count = parseInt(prizesCollected);
  if (count < prizeFileNames.length){
    count++;
    fileName = prizeFileNames[count];
    setPrizesCollected(count);
  }
  
  return fileName;
}

function setPrizesCollected(count){
  $.cookie("PrizesCollected", count, {path: '/game'});
}

function clearPrizes() {
  $.cookie("PrizesCollected", "-1", {path: '/game'});
  $.cookie("EasyBalloonPrizes", "0", {path: '/game'});
  $.cookie("HardBalloonPrizes", "0", {path: '/game'});
}
