var RAD = Math.PI/180;

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
            imageSrc: 'bottle.png'
        });

        var bottle = new Target('bottle2');
        bottle.create({
            posx: 300,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'bottle.png'
        });
        
        var bottle = new Target('bottle3');
        bottle.create({
            posx: 200,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'bottle.png'
        });
        
        var bottle = new Target('bottle4');
        bottle.create({
            posx: 100,
            posy: 200,
            width: 40,
            height: 150,
            imageSrc: 'bottle.png'
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

            if (clickx > target.borderLeft &&
                clickx < target.borderRight &&
                clicky > target.borderTop &&
                clicky < target.borderBottom) {

                console.log('hit');
                target.destroy(clickx, clicky);

                return;
            }
        }

    console.log('miss');

    }

};

var Target = function(name) {

    var self = this;
    self.name = name;

    self.posx;
    self.posy;
    self.width;
    self.height;

    self.borderLeft;
    self.borderRight;
    self.borderTop;
    self.borderBottom;

    self.tiles = [];

    self.create = function(param) {

		var sounds = [
			'http://www.allmusiclibrary.com/free_sound_effects/glass_breaking_2.mp3',
			'http://www.allmusiclibrary.com/free_sound_effects/glass_breaking_1.mp3'
		];
		
		var randomSound = Math.round(randomRange(0,1));

		console.log(randomSound);

		self.sound = new Audio(sounds[randomSound]);
		self.sound.load();

        var img = new Image();
        self.img = img;
        img.src = param.imageSrc;
        img.onload = function() {
            TS.context.drawImage(img, param.posx, param.posy);
        };

//        TS.context.drawImage(self.img, param.posx, param.posy, param.width, param.height);

        self.posx = param.posx;
        self.posy = param.posy;
        self.width = param.width;
        self.height = param.height;

        self.borderLeft = param.posx;
        self.borderRight = param.posx + param.width;
        self.borderTop = param.posy;
        self.borderBottom = param.posy + param.height;

        TS.targetLocal[self.name] = self;

        // TODO: Figure out formula for these numbers.
        self.tileWidth = 10;
        self.tileHeight = 10;

        var horzSliceCount = self.width / self.tileWidth;
        var vertSliceCount = self.height / self.tileHeight;
        var totalTiles = horzSliceCount * vertSliceCount;

        //Create copy for destroy effect.
        self.canvasCopy = document.createElement('canvas');
        self.canvasCopy.id = self.name;
        self.canvasCopy.className = 'effects';
        self.canvasCopy.width = 800;
        self.canvasCopy.height = 450;
        TS.stage.appendChild(self.canvasCopy);
        self.copyContext = document.getElementById(self.name).getContext('2d');

        // Keep reference copy for later
        self.referenceCopy = document.createElement('canvas');
        self.referenceCopy.className = 'reference';
        self.referenceCopy.id = self.name + '_ref';
        self.referenceCopy.width = 800;
        self.referenceCopy.height = 450;
        self.referenceCopy.style.left = '800px';
        TS.stage.appendChild(self.referenceCopy);
        self.refContext = document.getElementById(self.name + '_ref').getContext('2d');

        var tileX = 0;
        var tileY = 0;

        self.createTiles();

    };

    self.createTiles = function() {
        var y = 0;
        var counter_y = 0;
        while (y < self.height) {
            var x = 0;
            var counter_x = 0;
            while (x < self.width) {
                var tile = new Tile();
                tile.posx = self.posx + (counter_x * self.tileWidth);
                tile.posy = self.posy + (counter_y * self.tileHeight);
                tile.originalx = tile.posx;
                tile.originaly = tile.posy;
                tile.width = 10;
                tile.height = 10;
                self.tiles.push(tile);
                x += self.tileWidth;
                counter_x++;
            }
            y += self.tileHeight;
            counter_y++;
        }
    };

    self.makeCopy = function() {
        for (var i=0; i<self.tiles.length; i++) {
            var tile = self.tiles[i];

            self.copyContext.drawImage(
                TS.canvas,
                tile.posx,
                tile.posy,
                tile.width,
                tile.height,
                tile.posx,
                tile.posy,
                tile.width,
                tile.height
            );

            // need to optimize this...
            self.refContext.drawImage(
                TS.canvas,
                tile.posx,
                tile.posy,
                tile.width,
                tile.height,
                tile.posx,
                tile.posy,
                tile.width,
                tile.height
            );

        }

    };

    self.destroy = function(x, y) {

		self.sound.play();

        self.makeCopy();
/*
        setInterval( function () {
            self.animate();
            console.log('called');
        }, 50);
*/
		//requestAnimFrame(self.animate());

		self.animate();
		
        //self.explode(x, y);


        TS.context.clearRect(self.posx, self.posy, self.width, self.height);

        console.log(TS.targetLocal);

        delete TS.targetLocal[self.name];
        console.log('target destroyed');

        console.log(TS.targetLocal);

    };

    self.animate = function() {

        self.copyContext.clearRect(0,0,800, 450);

        for (var i=0; i<self.tiles.length; i++) {
            var tile = self.tiles[i];
            
            tile.render(self.copyContext, self.referenceCopy);
            tile.update();
        }
        
        requestAnimFrame(self.animate);
    };

};

var Tile = function() {

    this.velX = randomRange(-65,65);
    this.velY = randomRange(-65,65);

    this.shrink = 1;
    this.size = 1;

    this.maxSize = -1;
    this.drag = .9;

    this.gravity = 4;

    this.spin = .1;
    this.rotation = 0;

    this.update = function() {
        this.velX *= this.drag;
        this.velY *= this.drag;

        this.velY += this.gravity;

        this.posx += this.velX;
        this.posy += this.velY;

        this.rotation += this.spin;

    };

    this.render = function(canvas, refCanvas) {
        //canvas.save();
        //canvas.translate(this.posx, this.posy);
        //canvas.rotate(1);
        self = this;
        canvas.drawImage(
                refCanvas,
                self.originalx,
                self.originaly,
                self.width,
                self.height,
                self.posx,
                self.posy,
                self.width,
                self.height
            );
        //canvas.restore();
    };

};

function randomRange(min, max)
{
	return ((Math.random()*(max-min)) + min); 
}

window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();