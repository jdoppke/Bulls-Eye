var Level = {

	ammoCount: 0,
	ammoLeft: 0,
	targetCount: 0,
	shotsFired: 0,

    load: function(on) {

        // Check and remove all unwanted canvas elements
        var unwanted = document.querySelectorAll('.effects, .reference');
        for (var i=0; i<unwanted.length; i++) {
            TS.stage.removeChild(unwanted[i]);
        }

        Level[on].init();
        Status.init();

    }

};

Level['one'] = {

    init: function() {

		Level.ammoCount   = 8;
		Level.ammoLeft    = 8;
		Level.targetCount = Level.targetEffectCount = 5;

        TS.stage.style.backgroundImage = 'url(images/bg1.jpg)';

        var bottle = new Target_exploding('bottle1');
        bottle.create({
            posx: 200,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

        var bottle = new Target_exploding('bottle2');
        bottle.create({
            posx: 300,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

        var bottle = new Target_exploding('bottle3');
        bottle.create({
            posx: 400,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

        var bottle = new Target_exploding('bottle4');
        bottle.create({
            posx: 500,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });
        

        var jar = new Target_exploding('jar1');
        jar.create({
            posx: 269,
            posy: 203,
            width: 20,
            height: 38,
            tileW: 4,
            tileH: 3,
            imageSrc: 'images/target_jar.png',
            leftOverImageSrc: 'images/target_jar_leftover1.png'
        });

    }

};