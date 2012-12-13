// Keeps this code in its own scope
(function () {

  // setup; make some variables available to the full scope

  var currentScore = 0; // current player's score

  var molePosition; // current popped out mole's position
  var molePositionsSequence = [2, 1, 0, 3, 4]; // controls order of positions the mole chooses to pop out from
  var currentMolePositionIndex = 0; // current index of the molePositionsSequence array being used to control order of mole positions

  var isReset = true; // controls animations and cleans up afterward

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

  // Choose a new mole position; uses the array 'molePositionsSequence' and goes in sequence.  After the last index in the
  // array, this wraps around to the first element in the array and starts over
  function moveMole() {
    molePosition = molePositionsSequence[currentMolePositionIndex];
    console.log("Array index: " + molePosition);
    animateMole(molePosition);

    console.log("Positions: " + molePositionsSequence.length);
    if ((molePositionsSequence.length - 1) > currentMolePositionIndex) {
      console.log("Advancing to position " + (currentMolePositionIndex + 1) + " out of " + molePositionsSequence.length);
      currentMolePositionIndex++;
    }
    else {
      console.log("All array elements used; restarting with index 0");
      currentMolePositionIndex = 0;
    }
    return molePosition;
  }

  // animates the specified mole
  function animateMole(moleNumber, isSuccess) {
    var moleToAnimate = $("#mole" + (moleNumber + 1)); //Mole numbers are 1-indexed so add one to the index to get the appropriate mole

    // make sure the correct image is used
    moleToAnimate.attr('src', "images/wackyMole/mole.png");

    if (moleToAnimate.hasClass('topRowMoleIn')) { // this case handles popping a new top row mole out of a hole
      moleToAnimate.toggleClass('topRowMoleOut', true, 1000).toggleClass('topRowMoleIn', false, 1000);
    }
    else if (moleToAnimate.hasClass('bottomRowMoleIn')) { // this case handles popping a new bottom row mole out of a hole
      moleToAnimate.toggleClass('bottomRowMoleOut', true, 1000).toggleClass('bottomRowMoleIn', false, 1000);
    }
    else { // this case handles moles going back down into their holes
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
  }

  // handles animation of moles when whacked by the mallet
  function changeState(mole, index) {
    mole.attr('src', "images/wackyMole/mole" + index + ".png");
  }

  // animates the mallet and dispatches actions for whether or not the player's entry was correct
  function whack(whackyGuess) {
    var guessIsCorrect = (whackyGuess == molePosition);

    // handles the 'top' and 'z-index' of the mallet for better layering effect
    if (isEven(whackyGuess)) {
      $('#mallet').addClass('topRowWhack');
    }
    else {
      $('#mallet').addClass('bottomRowWhack');
    }

    // animate the mallet
    $('#mallet').toggleClass('mallet' + whackyGuess, 500).promise().done(function () {
      $('#mallet').addClass('malletRotated');
      // this instructs javascript to wait, essentially because we are using CSS3 to rotate the mallet and CSS3 isn't in the execution path of our javascript
      // putting this code in the promise event of the previous animation allows the previous animation to complete, and gives CSS3 time to rotate the mallet
      // so the mole doesn't flatten early and the score isn't incremented too early
      setTimeout(animateMole(molePosition, guessIsCorrect), 1000);

      if (guessIsCorrect) {
        currentScore++;
        DrawScore();
      }
      else {
        alert("Ha ha! You missed! You chose hole number " + whackyGuess +
            ", but I'm not in that hole!")
      }
    })

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

  // uses images for numerals to generate HTML for the score container div
  function DrawScore() {
    var scoreContainer = $('#scoreContainer');
    scoreContainer.empty();

    var scoreString = currentScore.toString();

    for (var i = 0; i < scoreString.length; i++) {
      scoreContainer.append("<img src='images/WackyMole/" + scoreString[i] + ".png' />");
    }

  }

})();