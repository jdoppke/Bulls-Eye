var TS = {

    offsetX: null,
    offsetY: null,

    // Target locations
    targetLocal: {},

    init: function() {

        TS.stage = document.getElementById('stage');
        TS.canvas = document.getElementById('canvas');
        TS.context = TS.canvas.getContext('2d');

        TS.offsetX = TS.stage.offsetLeft;
        TS.offsetY = TS.stage.offsetTop;

        TS.stage.addEventListener('click', TS.fireShot, false);

        Level.load('one');
        
        GAMELOOP();

    },

    fireShot: function(e) {

        var clickx = e.pageX - TS.offsetX;
        var clicky = e.pageY - TS.offsetY;
        var key;

        console.log('e.pageX = ' + e.pageX + ' e.pageY = ' + e.pageY);
        console.log('TS.offsetX = ' + TS.offsetX + ' TS.offsetY = ' + TS.offsetY);
        console.log('fired at: ' + clickx + ', ' + clicky);

        Level.shotsFired++;
        Level.ammoLeft--;

        for (key in TS.targetLocal) {

            var target = TS.targetLocal[key];

			/*
            var str = '';
            str += 'left: ' + target.borderLeft;
            str += ' right: ' + target.borderRight;
            str += ' top: ' + target.borderTop;
            str += ' bottom: ' + target.borderBottom;

            console.log(str);
            console.log('clicked: ' + clickx + ', ' + clicky);
*/
			// If the click was within the target and
			// if the target wasn't already hit
            if (
                clickx > target.borderLeft   &&
                clickx < target.borderRight  &&
                clicky > target.borderTop    &&
                clicky < target.borderBottom &&
                !target.hit
                ) {

                //console.log('hit');
                target.destroy();
                Level.targetCount--;

            }
        }

		if (Level.targetCount === 0) {
			console.log('Great job, you win!');
			// Go to next level
			Status.setStatus();
			return;
		}
		
		if (Level.ammoLeft === 0 && Level.targetCount > 0) {
			console.log('Sorry, you lost');
			// Reset level call here
		}

		//console.log('Ammo: ' + Level.ammoLeft + '/' + Level.ammoCount);
		//console.log('Targets Left: ' + Level.targetCount);
		
		Status.setStatus();

    }

};