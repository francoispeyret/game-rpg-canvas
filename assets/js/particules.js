function Particule(x, y, direction, settings) {
    this.x = x;
    this.y = y;
    if(typeof direction !== 'undefined')
        this.direction = direction;
    else
        this.direction = null;
    this.life = random(30, 60); // si grand alors life moins longtemps
    this.size = random(6, 12);

    if(typeof settings !== 'undefined')
        this.settings = settings;
    else
        this.settings = {};
    if(typeof this.settings.effect === 'undefined')
        this.settings.effect = null;
    if(typeof this.settings.vel === 'undefined')
        this.settings.vel = 0.1;
    if(typeof this.settings.r === 'undefined')
        this.settings.r = 0;
    if(typeof this.settings.g === 'undefined')
        this.settings.g = 0;
    if(typeof this.settings.b === 'undefined')
        this.settings.b = 0;
    if(typeof this.settings.a === 'undefined')
        this.settings.a = this.life;

    this.display = function() {
        noStroke();
        fill(this.settings.r, this.settings.r, this.settings.r, this.settings.a);
        rect(this.x,this.y,this.size,this.size);
        noFill();
    };

    this.update = function() {
        this.life -= 1;

        switch (this.direction) {
            default:
                break;
            case 'up':
                this.y += this.settings.vel;
                break;
            case 'right':
                this.x -= this.settings.vel;
                break;
            case 'bottom':
                this.y -= this.settings.vel;
                break;
            case 'left':
                this.x += this.settings.vel;
                break;
        }

        this.display();
    };

}