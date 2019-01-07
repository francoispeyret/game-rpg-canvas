

function fireBol(direction,x,y) {
    this.origin = direction;
    switch (direction) {
        default:
            this.targetDirection = 'up';
        break;
        case 'up':
            this.targetDirection = 'bottom';
        break;
        case 'bottom':
            this.targetDirection = 'up';
        break;
        case 'right':
            this.targetDirection = 'left';
        break;
        case 'left':
            this.targetDirection = 'right';
        break;
    }
    this.x = x+15;
    this.y = y+15;
    this.w = 5;
    this.h = 5;
    this.life = 100;
    this.vel = 5;

    this.color = [255,151,28];

    this.particles = [
        new Particule(this.x-3, this.y-5, this.targetDirection,{
                r:this.color[0],
                g:this.color[1],
                b:this.color[2],
                a: 255,
                life: this.life,
                vel: this.vel*0.99,
            }),
        new Particule(this.x, this.y, this.targetDirection,{
                r:this.color[0],
                g:this.color[1],
                b:this.color[2],
                a: 255,
                life: this.life,
                vel: this.vel,
            }),
        new Particule(this.x+5, this.y-3, this.targetDirection,{
                r:this.color[0],
                g:this.color[1],
                b:this.color[2],
                a: 255,
                life: this.life,
                vel: this.vel*0.99,
            }),
    ];

    this.display = function () {
        fill(30,30,255);
        stroke(255,0,0);
        strokeWeight(5)
        rect(this.x,this.y,this.w,this.w);
        noStroke();
        for(i=0; this.particles.length > i; i++) {
            this.particles[i].update();
        }
        // ellipse(this.x,this.y,30);
        noFill();
    };

    this.update = function() {

        this.life -= 1;

        if(this.origin==='up') {
            this.y -= this.vel;
        }
        if(this.origin ==='down') {
            this.y += this.vel;
        }
        if(this.origin ==='left') {
            this.x -= this.vel;
        }
        if(this.origin ==='right') {
            this.x += this.vel;
        }

        let resultMap = detectMap(this,this.origin);
        console.log(resultMap);
        if(resultMap === false) {
            this.life = 0;
        } else {
            this.display();
        }
    };


}
