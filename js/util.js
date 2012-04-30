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