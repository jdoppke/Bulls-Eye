var Tile = function() {

    this.velX = randomRange(-30,30);
    this.velY = randomRange(-30,30);

    this.drag = .95;
    //this.drag = 1.4;

    //this.gravity = 0;
	this.gravity = 1.9;
	this.gravity = 1;

	this.gravity = randomRange(1,2);

    this.spin = .1;
    this.rotation = 0;
    this.rotateAmount = .036;

    this.tranX = this.tranY = 0;
    
    this.update = function() {
        this.velX *= this.drag;
        this.velY *= this.drag;

        this.velY += this.gravity;

        this.posx += this.velX;
        this.posy += this.velY;

        this.rotation += this.rotateAmount;

    };

    this.render = function(canvas, refCanvas) {

        var self = this;
    
        canvas.save();
        //canvas.translate(this.posx, this.posy);
        //canvas.rotate(this.rotation);
        //console.log(this.rotation);
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
        canvas.restore();
    };

};