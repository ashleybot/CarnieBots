var prizeFileNames = ["sunglasses.png","basketball.png","scotty.png","pinguino.png","seuss.png","scooter.png"];

function canGetPrizes(level){
  // easyBalloon, hardBalloon
  var count = 0;
  if ("easyBalloon"){
    count = parseInt($.cookie("EasyBalloonPrizes"));
    if (count < 3){
      count++;
      $.cookie("EasyBalloonPrizes", count, {path: '/game'});
      return true;
    }
  }
  else if ("hardBalloon"){
    count = parseInt($.cookie("HardBalloonPrizes"));
    if (count < 3){
      count++;
      $.cookie("HardBalloonPrizes", count, {path: '/game'});
      return true;
    }

  }
  return false;
}

function displayPrizes() {
  // 300, 80
  // 500, 200
  // 100, 450
  // 400, 600
  // 600, 500
  // 280, 870
  
  var currentlyStoredPrizes = $.JSONCookie("CurrentlyStoredPrizes");
  if (currentlyStoredPrizes.zero.length > 0){
    
  }
}

function storePrize(filename,index){
  // convert index to x,y
  if ((index > -1) && (index < 6)){
    console.log("Storing prize");
  }
  else{
    //show a message that it can't be stored
  }
  
  
  var storedPrizes = {"zero":"", "one":"", "two":"", "three":"", "four":"", "five":""};
  $.JSONCookie("CurrentlyStoredPrizes", storedPrizes, {path: '/game'}); 
}

function getPrizeFromBoard(index){
}

function storeCurrentPrize(index){
  var currentPrize = getCurrentPrize();
  storePrize(currentPrize, index);
}

function getCurrentPrize() {
  
  var fileName = "";
  
  var prizesCollected = $.cookie("PrizesCollected");
  var count = parseInt(prizesCollected);
  
  if (count > -1) {
    fileName = prizeFileNames[count];
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
  
  var storedPrizes = {"zero":"", "one":"", "two":"", "three":"", "four":"", "five":""};
  $.JSONCookie("CurrentlyStoredPrizes", storedPrizes, {path: '/game'});
}
