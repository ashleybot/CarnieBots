$(document).ready(function () {

  var molePositions = [0, 1, 2, 3, 4];
  var currentMolePositionIndex = 0;
  var molePosition;
  moveMole();
});

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
  var moleToAnimate = "#mole" + moleNumber;
  $(moleToAnimate).toggleClass('topRowMoleOut bottomRowMoleOut', 1000).toggleClass('topRowMoleIn bottomRowMoleIn', 1000);
}
