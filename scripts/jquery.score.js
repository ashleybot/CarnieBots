// scores are saved in cookies
// cookies are limited per domain because of security stuff
// run the CarnieBots folder as a website to get the cookies to work properly
// if you have python installed (OS X does by default) you can do it this way:
// python -m SimpleHTTPServer 4101
// then navigate to 0.0.0.0:4101 in your favorite web browser

var level;
var key;
$(document).ready(function(){
  // find out which level we are on, EASY or HARD
  setLevel();
  getScores(); // initializes scores if none exist
  initializeModules();

});

// we have two levels for the control panel
function setLevel(){
  var storedLevel = document.cookie["CarnieBotScoreKey"];
  if (storedLevel == null) {
    level = "easy";
    document.cookie = "CarnieBotScoreKey=easy"; // this is for the case when the control panel hasn't been accessed
  }
  if (document.URL.indexOf("easy") >= 0){
    level = "easy";
  }
  else if (document.URL.indexOf("hard") >= 0){
    level = "hard";
    document.cookie = "CarnieBotScoreKey=hard"; // upgrade
  }
  key = "CarnieBotScoreEasy";
  if (level == "hard"){
    key = "CarnieBotScoreHard";
  }
  console.log(level);
}

// save the default state (the scores should be all mixed up here)
// the number is the module number, not the position because position is fixed
function getScores(){
  var balloonPoints = $.JSONCookie(key);
  
  if (balloonPoints == null){
    if (level == "easy"){
      balloonPoints = {"red":"two", "yellow":"one", "blue":"three"};
    }
    else{
      balloonPoints = {"red":"two", "purple":"one", "orange":"three", "green":"four"};
    }
    
    $.JSONCookie(key, balloonPoints, {path: '/'}); 
  }
  console.log("getScores " + JSON.stringify(balloonPoints));
  return balloonPoints;
}

// on initial page load, arrange the modules to match what is in the cookie
function initializeModules(){
  var moduleArrangement = $.JSONCookie(key);
  if (moduleArrangement != null){
    var redModuleListItem = $("#" + moduleArrangement.red);
    var yellowModuleListItem = $("#" + moduleArrangement.yellow);
    var blueModuleListItem = $("#" + moduleArrangement.blue);
    
    // the following positioning is based on the background image
    // if that changes then this needs to be updated
    yellowModuleListItem.insertBefore(blueModuleListItem);
    redModuleListItem.insertBefore(yellowModuleListItem);
  }
}

function setScores(arrayOfItems, movedItem){
  var balloonPoints = getScores();
  // iterate through array and reset cookie
  if (arrayOfItems != null && arrayOfItems.length > 2){
    balloonPoints.red = arrayOfItems[0];
    balloonPoints.yellow = arrayOfItems[1];
    balloonPoints.blue = arrayOfItems[2];
  }
  $.JSONCookie(key, balloonPoints, {path: '/'}); // key is global
}

function addScore(balloonState, color)
{
  var balloonPoints = getScores();
  console.log(JSON.stringify(balloonPoints));
  if (balloonState == 0){
    var point = getInteger(balloonPoints[color]);
    console.log("point " + point);
    $("#scoreboard").append("<p>" + color + " balloon popped " + point + " points.</p>");
    var totalDiv = $("#total");
    var totalScore = parseInt(totalDiv.text());
    totalScore += point;
    
    totalDiv.text(totalScore);
    console.log(totalScore);
  }
}

function getInteger(stringPoints) {
  if (stringPoints == "one"){
    return 1;
  }
  else if (stringPoints == "two"){
    return 2;
  }
  else if (stringPoints == "three"){
    return 3;
  }
  else if (stringPoints == "four"){
    return 4;
  }
  else{
    return 0;
  }
}