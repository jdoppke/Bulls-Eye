/*
Global helpers that are used throughout.
*/

var RAD = Math.PI/180;
var ANIM_LIMIT = 100;

var $ = function(id) {
	return document.getElementById(id);
};

var randomRange = function(min, max) {
	return ((Math.random()*(max-min)) + min); 
};

var numeric = function(a, b) {
    return (a - b);
};

window.requestAnimFrame = (function(callback){
    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

window.cancelRequestAnimFrame = (function() {
    return (
        window.cancelAnimationFrame              ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame    ||
        window.oCancelRequestAnimationFrame      ||
        window.msCancelRequestAnimationFrame     ||
        clearTimeout
    );
})();

var GAMELOOP = function() {

	// Loop through targets to to update if needed.
	for (var key in TS.targetLocal) {
	
		var target = TS.targetLocal[key];

		// If the target is hit, update
		if (target.hit) {

			target.copyContext.clearRect(0,0,800, 450);

			// Update each tile
        	for (var i=0; i<target.tiles.length; i++) {
            	var tile = target.tiles[i];
            	tile.render(target.copyContext, target.referenceCopy);
            	tile.update();
        	}

			if (target.animCount > ANIM_LIMIT) {
				 // Remove reference canvas
            	TS.stage.removeChild($(target.referenceCopy.id));

	            // Delete target
    	        delete TS.targetLocal[target.name];
			}

			target.animCount++;

		}

	}

	//setTimeout(function(){
		requestAnimFrame(GAMELOOP);
	//}, 10);

};