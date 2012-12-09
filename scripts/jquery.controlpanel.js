$(document).ready(function(){
  $("#modules").sortable({
      stop: function( event, ui ) { setScores(ui.item[0]);}
  });
  $("#modules, .droppable").disableSelection();
  //$(".droppable").disableSelection();
});