var Level_one = {

	ammoCount: 8,
	targetCount: 4,

    init: function() {
    
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

var Level = {

	ammoCount: 0,
	ammoLeft: 0,
	targetCount: 0,
	shotsFired: 0,

    load: function(level) {

		for (var key in TS.targetLocal) {
				
			console.log('sdfs' + key);
			// Stop animation, delete ref and actual obj
			var target = TS.targetLocal[key];
			
			console.log(target.af);
			cancelRequestAnimFrame(target.af);
			TS.stage.removeChild($(target.referenceCopy.id));
        	delete TS.targetLocal[target.name];
			
		}
		TS.targetLocal = {};

    	Level.ammoCount   = 8;
    	Level.ammoLeft    = 8;
    	Level.targetCount = 4;
        Level_one.init();
        Status.init();
    
    }

};