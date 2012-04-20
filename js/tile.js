var Tile = function() {

    this.velX = randomRange(-50,50);
    this.velY = randomRange(-50,50);

    this.drag = .95;

    this.gravity = 2;

    this.spin = .1;
    this.rotation = 0.5-Math.random();;

    this.update = function() {
        this.velX *= this.drag;
        this.velY *= this.drag;

        this.velY += this.gravity;

        this.posx += this.velX;
        this.posy += this.velY;

        this.rotation %= 360;

    };

    this.render = function(canvas, refCanvas) {
        //canvas.save();
        //canvas.translate(this.velX, this.velY);
        //canvas.rotate(this.rotation*RAD);
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