$(document).ready(function(){
  $("#modules").sortable({
      stop: function( event, ui ) { console.log(ui.item[0]);}
  });
  $("#modules, .droppable").disableSelection();
  //$(".droppable").disableSelection();
});