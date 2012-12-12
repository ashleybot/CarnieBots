// setup; make some variables available to the full scope and set up the button.
$(document).ready(function () {
  $('#whackButton').click(function (){
    whack();
  });
  moveMole();
});

var molePosition;
var molePositions = [2, 1, 0, 3, 4];

var currentMolePositionIndex = 0;

// Choose a new mole position; uses the array 'molePositions' and goes in sequence.  After the last index in the
// array, this wraps around to the first element in the array and starts over
function moveMole(){
  molePosition = molePositions[currentMolePositionIndex];
  console.log("Array index: " + molePosition);
  animateMole(molePosition);

  console.log("Positions: " + molePositions.length);
  if ((molePositions.length - 1) > currentMolePositionIndex) {
    console.log("Advancing to position " + (currentMolePositionIndex + 1) + " out of " + molePositions.length);
    currentMolePositionIndex++;
  }
  else {
    console.log("All array elements used; restarting with index 0");
    currentMolePositionIndex = 0;
  }
  return molePosition;
}

// animates the specified mole (mole numbers are 1-indexed!)
function animateMole(moleNumber) {
  var moleToAnimate = $("#mole" + (moleNumber + 1));
  if (moleToAnimate.hasClass('topRowMoleOut') || moleToAnimate.hasClass('topRowMoleIn')) {
    moleToAnimate.toggleClass('topRowMoleOut', 1000).toggleClass('topRowMoleIn', 1000);
  }
  else{
    moleToAnimate.toggleClass('bottomRowMoleOut', 1000).toggleClass('bottomRowMoleIn', 1000);
  }  
}

// animates the mallet and dispatches actions for whether or not the player's entry was correct
function whack() {
  var whackyGuess = ($('#whackyGuess').val());

  if (isEven(whackyGuess)) {
    $('#mallet').addClass('topRowWhack');
  }
  else {
    $('#mallet').addClass('bottomRowWhack');
  }

  $('#mallet').toggleClass('mallet' + whackyGuess, 500).promise().done(function () {
    $('#mallet').addClass('malletRotated');
  })

  if (whackyGuess == molePosition) {
    //do something with score here
  }
  animateMole(molePosition);


  setTimeout(reset, 1500);

}

// resets mallet and starts next 'round' which calls out the next mole
function reset() {
  $('#mallet').removeClass().addClass('mallet gamePiece');
  moveMole();
}

// determines if specified number is even
function isEven(n) {
  return (n % 2 == 0);
}