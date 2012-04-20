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

        var bottle = new Target('bottle');
        bottle.create({
            posx: 400,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'images/bottle.png'
        });

        var bottle = new Target('bottle2');
        bottle.create({
            posx: 300,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'images/bottle.png'
        });
        
        var bottle = new Target('bottle3');
        bottle.create({
            posx: 200,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'images/bottle.png'
        });
        
        var bottle = new Target('bottle4');
        bottle.create({
            posx: 100,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'images/bottle.png'
        });

//        var circle = new Target('circle');
//        circle.create(200, 200, 20, 20);

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
            str += ' bottom: ' + target.borderBottem;

            console.log(str);

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