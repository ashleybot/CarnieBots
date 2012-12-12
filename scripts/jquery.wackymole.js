// setup; make some variables available to the full scope and set up the button.
$(document).ready(function () {
	$('body').keypress(function(event) {
		console.log("pressed");
		if (isReset === false) return;
		else{
			isReset = false;
			switch(event.which){
				case 48:
					whack(0);
					break;
				case 49:
					whack(1);
					break;
				case 50:
					whack(2);
					break;
				case 51:
					whack(3);
					break;
				case 52:
					whack(4);
					break;
				default:
					alert("Ha ha! You missed! Why don't you try picking a number from 0 to 4?");
					animateMole(molePosition);
					setTimeout(reset, 1500);
					break;
			}
		}
	});
	moveMole();
});

var molePosition;
var molePositions = [2, 1, 0, 3, 4];
var isReset = true;
var currentMolePositionIndex = 0;
var moleCorrect = false;
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
	if (moleToAnimate.hasClass('topRowMoleIn')){
	    moleToAnimate.toggleClass('topRowMoleOut', 1000).toggleClass('topRowMoleIn', 1000);
	}
	else if (moleToAnimate.hasClass('bottomRowMoleIn')){
		moleToAnimate.toggleClass('bottomRowMoleOut', 1000).toggleClass('bottomRowMoleIn', 1000);
	}
	else{
		var i = 0, max = 2;
		var slowloop = function (){
			if (i < max){
				changeState(moleToAnimate, i+1);
				setTimeout(slowloop, 100);
				i++;
			}
			else{
				var byeByeMole = function(){
					if(moleToAnimate.hasClass('topRowMoleOut')){
						moleToAnimate.toggleClass('topRowMoleOut', 1000).toggleClass('topRowMoleIn', 1000);
					}
					else{
						moleToAnimate.toggleClass('bottomRowMoleOut', 1000).toggleClass('bottomRowMoleIn', 1000);
					}
					moleToAnimate.attr('src', "images/wackyMole/mole.png");
				}
				setTimeout(byeByeMole, 400);
			}
		};
		slowloop();
	}

/*  if (moleToAnimate.hasClass('topRowMoleOut') || moleToAnimate.hasClass('topRowMoleIn')) {
    moleToAnimate.toggleClass('topRowMoleOut', 1000).toggleClass('topRowMoleIn', 1000);
  }
  else{
    moleToAnimate.toggleClass('bottomRowMoleOut', 1000).toggleClass('bottomRowMoleIn', 1000);
  }  */
}

// animates the mallet and dispatches actions for whether or not the player's entry was correct

function changeState(mole, index){
    mole.attr('src', "images/wackyMole/mole" + index + ".png");
}

function whack(whackyGuess) {
 // var whackyGuess = ($('#whackyGuess').val());

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
  else{
	alert("Ha ha! You missed! You chose hole number "+whackyGuess+  
			", but I'm not in that hole!")
  }
  animateMole(molePosition);


  setTimeout(reset, 1500);

}

// resets mallet and starts next 'round' which calls out the next mole
function reset() {
  $('#mallet').removeClass().addClass('mallet gamePiece');
  moveMole();
  isReset = true;
}

// determines if specified number is even
function isEven(n) {
  return (n % 2 == 0);
}