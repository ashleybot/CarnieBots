// doesn't do much more than control the behavior of the draggable/droppable areas
// this is where we can do cool stuff like highlighting and restricting the draggable area
// or save the entire history of states so that we can provide a tutor if necessary
$(document).ready(function(){
  $("#modules").sortable({
      stop: function( event, ui ) { 
        
        setScores( $(this).sortable('toArray'), ui.item );
        checkWin( $(this).sortable('toArray') );
      }
  });
  $("#modules, .droppable").disableSelection();
});

function checkWin(arrayOfItems){
  if (arrayOfItems.length == 3){
    // EASY level
    // win state = ["one", "three", "two"]
    if (arrayOfItems.toString() == ["one","three","two"].toString()){
      console.log("win");
    }
  }
  else if (arrayOfItems.length == 5){
    // HARD level
    // win state = ["four", "two", "one", "three"]
    if (arrayOfItems.toString() == ["four", "two", "one", "three"].toString()){
      console.log("win");
    }

  }
  
}