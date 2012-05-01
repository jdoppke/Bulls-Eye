/*

TODO: Fix reset gameloop bug

*/

var GAMELOOP = {

    gameOn: false,
    stopIt: false,
    loop  : null,
    timer : null,

    animationLoop: function() {

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

                    // Check count of targets left to have their effect yet
                    Level.targetEffectCount--;

                    if (Level.targetEffectCount === 0) {
                        GAMELOOP.stopIt = true;
                    }
                }

                target.animCount++;

            }
        }

        console.log(GAMELOOP.gameOn);
        if (!GAMELOOP.gameOn) {
            $('timer').innerHTML = GAMELOOP.playerTime + ' sec';
        } else {
            GAMELOOP.playerTime = ((GAMELOOP.timer - new Date())/1000).toFixed(2) * -1;
            $('timer').innerHTML = GAMELOOP.playerTime + ' sec';
        }

        GAMELOOP.loop = requestAnimFrame(GAMELOOP.animationLoop);

        if (GAMELOOP.stopIt) {
            GAMELOOP.stop();
            // Check for outcome, just in case just pause
            // gets implemented.
            if (GAMELOOP.outcome) {
                UI.showModal(GAMELOOP.outcome);
            }
        }

    },

    start: function() {
        // If already started just return
        if (GAMELOOP.gameOn) {return;}

        GAMELOOP.gameOn = true;
        GAMELOOP.timer = new Date();
        GAMELOOP.animationLoop();
    },

    stop: function() {
        console.log('stop called');
        GAMELOOP.stopIt = false;
        cancelRequestAnimFrame(GAMELOOP.loop);
        GAMELOOP.loop = null;
    }

};