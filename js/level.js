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
    
        var bottle = new Target('bottle1');
        bottle.create({
            posx: 200,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

        var bottle = new Target('bottle2');
        bottle.create({
            posx: 300,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

        var bottle = new Target('bottle3');
        bottle.create({
            posx: 400,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

        var bottle = new Target('bottle4');
        bottle.create({
            posx: 500,
            posy: 200,
            width: 20,
            height: 78,
            tileW: 5,
            tileH: 5,
            imageSrc: 'images/target_bottle.png'
        });

    }

};