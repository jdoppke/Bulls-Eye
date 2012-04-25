var Level = {

	ammoCount: 0,
	ammoLeft: 0,
	targetCount: 0,
	shotsFired: 0,

    load: function(on) {

        Level[on].init();
        Status.init();
    
    }

};

Level['one'] = {

    init: function() {

		Level.ammoCount   = 8;
		Level.ammoLeft    = 8;
		Level.targetCount = 4;
    
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
            posx: 600,
            posy: 300,
            width: 20,
            height: 38,
            tileW: 3,
            tileH: 3,
            imageSrc: 'images/target_jar.png',
            leftOverImageSrc: 'images/target_jar_leftover1.png'
        });

    }

};