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

        Level.load('Level_one');

    },

    fireShot: function(e) {

        var clickx = e.pageX - TS.offsetX;
        var clicky = e.pageY - TS.offsetY;
        var key;

        for (key in TS.targetLocal) {

            var target = TS.targetLocal[key];

            var str = '';
            str += 'left: ' + target.borderLeft;
            str += ' right: ' + target.borderRight;
            str += ' top: ' + target.borderTop;
            str += ' bottom: ' + target.borderBottom;

            console.log(str);
            console.log('clicked: ' + clickx + ', ' + clicky);

            if (clickx > target.borderLeft  &&
                clickx < target.borderRight &&
                clicky > target.borderTop   &&
                clicky < target.borderBottom) {

                console.log('hit');
                target.destroy(clickx, clicky);

                return;
            }
        }

        console.log('miss');

    }

};