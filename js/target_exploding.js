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
    
    self.animateCycle = 0;

    self.tiles = [];

    self.create = function(param) {

		var sounds = [
            'sounds/glass_breaking_2.mp3',
			'sounds/glass_breaking_1.mp3'
		];
		
		var randomSound = Math.round(randomRange(0,1));

		self.sound = new Audio(sounds[randomSound]);
		self.sound.load();

        var img = new Image();
        self.img = img;
        img.src = param.imageSrc;
        img.onload = function() {
            TS.context.drawImage(img, param.posx, param.posy);
        };

        self.posx = param.posx;
        self.posy = param.posy;
        self.width = param.width;
        self.height = param.height;

        self.borderLeft = param.posx;
        self.borderRight = param.posx + param.width;
        self.borderTop = param.posy;
        self.borderBottom = param.posy + param.height;

        TS.targetLocal[self.name] = self;

        self.tileWidth = param.tileW;
        self.tileHeight = param.tileH;

        // Assign random numbers for tile slices
        var sliceW = Math.floor(param.width / 10);
        var sliceH = Math.floor(param.height / 10);
        self.sliceRange = [sliceW, sliceH].sort(numeric);
        
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
        self.referenceCopy.style.top = '450px';
        TS.stage.appendChild(self.referenceCopy);
        self.refContext = document.getElementById(self.name + '_ref').getContext('2d');

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
                tile.width = Math.floor(randomRange(self.sliceRange[0], self.sliceRange[1]));
                tile.height = Math.floor(randomRange(self.sliceRange[0], self.sliceRange[1]));
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
		self.animate();

        TS.context.clearRect(self.posx, self.posy, self.width, self.height);

    };

    self.animate = function() {

        self.copyContext.clearRect(0,0,800, 450);

        for (var i=0; i<self.tiles.length; i++) {
            var tile = self.tiles[i];
            tile.render(self.copyContext, self.referenceCopy);
            tile.update();
        }
        
        if (self.animateCycle < 100) {
            //console.log('cycle' + self.name);
            //setTimeout(function(){
                self.af = requestAnimFrame(self.animate);
            //}, 30);
        } else {
            
            // Remove reference canvas
            TS.stage.removeChild(document.getElementById(self.referenceCopy.id));
            
            // Delete target
            delete TS.targetLocal[self.name];
            
            // Cancel RAF for this objects animation
            cancelRequestAnimFrame(self.af);
        }
        self.animateCycle++;
    };

};