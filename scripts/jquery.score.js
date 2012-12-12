// scores are saved in cookies
// cookies are limited per domain because of security stuff
// run the CarnieBots folder as a website to get the cookies to work properly
// if you have python installed (OS X does by default) you can do it this way:
// python -m SimpleHTTPServer 4101
// then navigate to 0.0.0.0:4101 in your favorite web browser

$(document).ready(function(){
  // find out which level we are on, EASY or HARD
  currentLevel();
  getScores(); // initializes scores if none exist
  initializeModules();

});

// set all cookies to default states
function clearBalloonScores(){
  $.cookie("CarnieBotBalloonLevel", "easy");
  var balloonPointsEasy = {"red":"two", "yellow":"one", "blue":"three"};
  var balloonPointsHard = {"red":"two", "pink":"one", "orange":"three", "green":"four"};
  $.JSONCookie("CarnieBotScoreEasy", balloonPointsEasy, {path: '/'}); 
  $.JSONCookie("CarnieBotScoreHard", balloonPointsHard, {path: '/'}); 
}

function resetCompletedLevels(){
  $.cookie("CarnieBotEasyLevelCompleted","false", {path: '/game'});
  $.cookie("CarnieBotHardLevelCompleted","false", {path: '/game'});
  console.log("reset");
}

// which level are we on? Easy or hard?
// gets and sets (if necessary)
function currentLevel() {
  var level = $.cookie("CarnieBotBalloonLevel");
  // if the cookie hasn't been set it is the first time through and therefore easy
  if (level == null) {
    level = "easy";
  }
  // also test if the user is on the hard control panel, and then set it to upgrade
  if ((document.URL.indexOf("hard") >= 0) || (document.URL.indexOf("level_1.4") >= 0)){
    level = "hard";
  }
  $.cookie("CarnieBotBalloonLevel", level);
  return level;
}

function getScoreKey() {
  var level = currentLevel();
  var key = "CarnieBotScoreEasy";
  if (level == "hard"){
    key = "CarnieBotScoreHard";
  }
  return key;
}

// save the default state (the scores should be all mixed up here)
// the number is the module number, not the position because position is fixed
function getScores(){

  var key = getScoreKey();
  var level = currentLevel();
  var balloonPoints = $.JSONCookie(key);
  console.log("get " + key);
  console.log(JSON.stringify(balloonPoints));
  // default points for each level
  if (balloonPoints == null || JSON.stringify(balloonPoints).length == 2){
    if (level == "easy"){
      balloonPoints = {"red":"two", "yellow":"one", "blue":"three"};
    }
    else{
      balloonPoints = {"red":"two", "pink":"one", "orange":"three", "green":"four"};
    }
    console.log("store default");
    $.JSONCookie(key, balloonPoints, {path: '/'}); 
  }
  console.log("getScores " + level + " " + JSON.stringify(balloonPoints));
  return balloonPoints;
}

// on initial page load, arrange the modules to match what is in the cookie
function initializeModules(){
  
  var moduleArrangement = getScores(); // the module arrangement is the scores
  
  if (JSON.stringify(moduleArrangement).length > 2){
    if (JSON.stringify(moduleArrangement).indexOf("yellow") >= 3) {
      var redModuleListItem = $("#" + moduleArrangement.red);
      var yellowModuleListItem = $("#" + moduleArrangement.yellow);
      var blueModuleListItem = $("#" + moduleArrangement.blue);
      
      // the following positioning is based on the background image
      // if that changes then this needs to be updated
      yellowModuleListItem.insertBefore(blueModuleListItem);
      redModuleListItem.insertBefore(yellowModuleListItem);
    }
    else {
      // this is so complicated because the red balloon is repeated in both puzzles
      var redModule = $("#" + moduleArrangement.red);
      var pinkModule = $("#" + moduleArrangement.pink);
      var orangeModule = $("#" + moduleArrangement.orange);
      var greenModule = $("#" + moduleArrangement.green);
      
      redModule.insertBefore(orangeModule);
      pinkModule.insertBefore(redModule);
      greenModule.insertBefore(pinkModule);
    }
  }
}

function setScores(arrayOfItems, movedItem){
  var balloonPoints = getScores();
  var key = getScoreKey();
  // iterate through array and reset cookie
  if (arrayOfItems != null) {
    if (arrayOfItems.length == 3){
      balloonPoints.red = arrayOfItems[0];
      balloonPoints.yellow = arrayOfItems[1];
      balloonPoints.blue = arrayOfItems[2];
    }
    else if (arrayOfItems.length == 4){
      balloonPoints.green = arrayOfItems[0];
      balloonPoints.pink = arrayOfItems[1];
      balloonPoints.red = arrayOfItems[2];  
      balloonPoints.orange = arrayOfItems[3];  
    }
  }
  $.JSONCookie(key, balloonPoints, {path: '/'}); // key is global
}

function addScore(balloonState, color)
{
  var balloonPoints = getScores();
  console.log("addscore " + JSON.stringify(balloonPoints));
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