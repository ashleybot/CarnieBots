$(document).ready(function(){
  $("#controlpanel").sortable({
      stop: function( event, ui ) { console.log(ui.item);}
  });
  $("#controlpanel").disableSelection();
  $(".droppable").disableSelection();
});