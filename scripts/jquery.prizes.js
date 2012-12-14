var prizeFileNames = ["sunglasses.png","basketball.png","scotty.png","pinguino.png","seuss.png","scooter.png"];

function canGetPrizes(level){
  // easyBalloon, hardBalloon
  
  
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
