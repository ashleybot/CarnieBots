// setup; make some variables available to the full scope
// Keeps this code in its own scope
(function () {

  var molePosition; // current popped out mole (1 indexed)
  var currentMolePositionIndex = 0; // current array position of the popped out mole (0 indexed)
  var currentScore = 0; // current player's score
  var molePositions = [2, 1, 0, 3, 4]; // controls order of positions the mole chooses to pop out from
  var isReset = true; // controls animations and cleans up afterward
  //var moleCorrect = false;

  $(document).ready(function () {
    $('body').keypress(function (event) {
      console.log("pressed");
      if (isReset === false) return;
      else {
        isReset = false;
        switch (event.which) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
            whack(String.fromCharCode(event.which));
            break;
          default:
            alert("Ha ha! You missed! Why don't you try picking a number from 0 to 4?");
            animateMole(molePosition, false);
            setTimeout(reset, 1500);
            break;
        }
      }
    });
    moveMole();
    DrawScore();
  });

  // Choose a new mole position; uses the array 'molePositions' and goes in sequence.  After the last index in the
  // array, this wraps around to the first element in the array and starts over
  function moveMole() {
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
  function animateMole(moleNumber, isSuccess) {
    var moleToAnimate = $("#mole" + (moleNumber + 1));
    moleToAnimate.attr('src', "images/wackyMole/mole.png");
    if (moleToAnimate.hasClass('topRowMoleIn')) {
      moleToAnimate.toggleClass('topRowMoleOut', true, 1000).toggleClass('topRowMoleIn', false, 1000);
    }
    else if (moleToAnimate.hasClass('bottomRowMoleIn')) {
      moleToAnimate.toggleClass('bottomRowMoleOut', true, 1000).toggleClass('bottomRowMoleIn', false, 1000);
    }
    else {
      var i = 0, max = 2;
      var slowloop = function () {
        if (i < max && isSuccess) {
          changeState(moleToAnimate, i + 1);
          setTimeout(slowloop, 100);
          i++;
        }
        else {
          var byeByeMole = function () {
            if (moleToAnimate.hasClass('topRowMoleOut')) {
              moleToAnimate.toggleClass('topRowMoleIn', true, 1000).toggleClass('bottomRowMoleOut', false, 1000);
            }
            else {
              moleToAnimate.toggleClass('bottomRowMoleIn', true, 1000).toggleClass('bottomRowMoleOut', false, 1000);
            }
            if (!isSuccess) {
              moleToAnimate.attr('src', "images/wackyMole/mole.png");
            }
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

  function changeState(mole, index) {
    mole.attr('src', "images/wackyMole/mole" + index + ".png");
  }

  function whack(whackyGuess) {
    // var whackyGuess = ($('#whackyGuess').val());

    var guessIsCorrect = (whackyGuess == molePosition);

    if (isEven(whackyGuess)) {
      $('#mallet').addClass('topRowWhack');
    }
    else {
      $('#mallet').addClass('bottomRowWhack');
    }

    $('#mallet').toggleClass('mallet' + whackyGuess, 500).promise().done(function () {
      $('#mallet').addClass('malletRotated');
      setTimeout(animateMole(molePosition, guessIsCorrect), 1000);
    })

    if (guessIsCorrect) {
      currentScore++;
      DrawScore();
    }
    else {
      alert("Ha ha! You missed! You chose hole number " + whackyGuess +
          ", but I'm not in that hole!")
    }



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

  function DrawScore() {
    var scoreContainer = $('#scoreContainer');
    scoreContainer.empty();

    var scoreString = currentScore.toString();

    for (var i = 0; i < scoreString.length; i++) {
      scoreContainer.append("<img src='images/WackyMole/" + scoreString[i] + ".png' />");
    }

  }

})();