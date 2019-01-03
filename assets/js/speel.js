

function fireBol(direction,x,y,bobName) {
    this.direction = direction;
    this.x = x+15;
    this.y = y+15;
    this.life = 100;
    this.vel = 5;

    this.particles = [
        new Particule(this.x, this.y, this.direction),
        new Particule(this.x, this.y, this.direction),
        new Particule(this.x, this.y, this.direction),
    ];

    this.display = function () {
        fill(30,30,255);
        for(i=0; this.particles.length > i; i++) {
            // console.log(i);
            this.particles[i].display();
        }
        // ellipse(this.x,this.y,30);
        noFill();
    };

    this.update = function() {
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
