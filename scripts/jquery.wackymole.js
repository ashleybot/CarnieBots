$(document).ready(function () {
  $('#whackButton').click(function (){
    whack();
  });
  moveMole();
});

var molePosition;
var molePositions = [2, 1, 2, 3, 4];

var currentMolePositionIndex = 0;

function moveMole(){
  molePosition = molePositions[currentMolePositionIndex];
  animateMole(molePosition);

  if (molePositions.Length === currentMolePositionIndex - 1) {
    currentMolePositionIndex++;
  }
  else {
    currentMolePositionIndex = 0;
  }
  return molePosition;
}

function animateMole(moleNumber) {
  var moleToAnimate = $("#mole" + (moleNumber + 1));
  if (moleToAnimate.hasClass('topRowMoleOut') || moleToAnimate.hasClass('topRowMoleIn')) {
    moleToAnimate.toggleClass('topRowMoleOut', 1000).toggleClass('topRowMoleIn', 1000);
  }
  else{
    moleToAnimate.toggleClass('bottomRowMoleOut', 1000).toggleClass('bottomRowMoleIn', 1000);
  }  
}

function whack() {
  var whackyGuess = ($('#whackyGuess').val() );
  alert(whackyGuess);
  if (whackyGuess == molePosition) {
    moveMole();
  }
}
