function Particule(x, y, direction, settings) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.effect = settings.effect;
    if(typeof settings.vel !== 'undefined')
        this.vel = settings.vel;
    else
        this.vel = 0.1;
    this.vie = random(30, 60); // si grand alors vie moins longtemps
    this.size = random(6, 12);

    this.display = function() {
        noStroke();
        if(typeof settings.effect !== 'undefined' && settings.effect === 'fade') {
            fill(100, 80, 62, this.vie);
        } else {
            fill(100, 80, 62);
        }
        rect(this.x,this.y,this.size,this.size);
        noFill();
    };

    this.update = function() {
        this.vie -= 1;

        switch (this.direction) {
            case 'up':
                this.y += this.vel;
                break;
            case 'right':
                this.x -= this.vel;
                break;
            case 'bottom':
                this.y -= this.vel;
                break;
            case 'left':
                this.x += this.vel;
                break;
        }
    };

}