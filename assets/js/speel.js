

function fireBol(direction,x,y) {
    this.direction = direction;
    this.x = x+15;
    this.y = y+15;
    this.life = 100;
    this.vel = 5;

    this.display = function () {
        fill(30,30,255);
        ellipse(this.x,this.y,30);
        noFill();
    };

    this.update = function() {
        if(this.life <= 0) {
            return this.die();
        }
        if(this.direction==='up') {
            this.y -= this.vel;
        }
        if(this.direction==='down') {
            this.y += this.vel;
        }
        if(this.direction==='left') {
            this.x -= this.vel;
        }
        if(this.direction==='right') {
            this.x += this.vel;
        }

        this.life -= 1;
        if(this.life <= 0)
            this.die();

        this.display();
    };
    
    this.die = function () {
        
    };

}
