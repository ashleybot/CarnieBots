
$(function(){
	// sets the div to use to display the game and its dimension
	$("#playground").playground({width: 640, height: 480});
	
	// configure the loading bar
	$.loadCallback(function(percent){
		$("#loadBar").width(400*percent);
		$("#loadtext").html(""+percent+"%")
	});
	
	// register the start button and remove the splash screen once the game is ready to starts
	$("#start").click(function(){
		$.playground().startGame(function(){
			 $("#splash").remove();
		});
	});

});