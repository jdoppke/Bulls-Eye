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

var GAMELOOP = {

	loop: null,
	gameOn: false,
	timer: null,

	animationLoop: function() {

    	console.log('game looping');

		// Loop through targets to to update if needed.
    	for (var key in TS.targetLocal) {

	        var target = TS.targetLocal[key];

        	// If the target is hit, update
    	    if (target.hit) {

	            target.copyContext.clearRect(0,0,800, 450);

            	// Update each tile
            	for (var i=0; i<target.tiles.length; i++) {
                	var tile = target.tiles[i];
                	tile.update();
                	tile.render(target.copyContext, target.referenceCopy);
                
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

		requestId = requestAnimFrame(GAMELOOP.animationLoop);
    
    	if (!GAMELOOP.gameOn) {
    		if (GAMELOOP.cancel) {
    			GAMELOOP.playerTime = ((GAMELOOP.timer - new Date())/1000).toFixed(2) * -1;
    			$('timer').innerHTML = GAMELOOP.playerTime;
    		}
    		// Wait for any more animations to finish, then
    		// call stop()
    		GAMELOOP.stop();
    		//GAMELOOP.cancel = setTimeout(function(){GAMELOOP.stop();}, 1000);
    	} else {
    		$('timer').innerHTML = ((GAMELOOP.timer - new Date())/1000).toFixed(2) * -1;
    	}
	},

	start: function() {
		// If already started just return
		if (GAMELOOP.gameOn) {return;}
		
		GAMELOOP.cancel = null;
		GAMELOOP.gameOn = true;
		GAMELOOP.animationLoop();
		GAMELOOP.timer = new Date();
	},

	stop: function() {
		console.log((GAMELOOP.playerTime/1000).toFixed(2) * -1);
		console.log('stop called');
		GAMELOOP.gameOn = false;
		cancelRequestAnimFrame(requestId);
	}

};

var Player = {

	gameOn   : false,
	levelOver: false

};

var UI = {

	closeModal: function(id) {

		$('overlay').className = '';
		$(id).className = 'menu-ui';

	},
	
	showModal: function(id, message) {
	
		$('overlay').className = 'show';

		var modal = $(id);
		//modal.innerHTML = '<p>' + message + '</p>';
		modal.className = 'menu-ui prep show';
	
	}

};