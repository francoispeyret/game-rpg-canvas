
function Bob(name,x,y) {
    this.name = name;
    if(this.name==undefined)
        this.name = 'entite';
    this.x = x;
    this.y = y;
    this.w = 25;
    this.h = 25;
    this.vitesse = 2;
    this.direction = 'up';

    this.display = function () {
        // console.log('x'+this.x +' y'+this.y);
        noStroke();
        fill(255);
        if(this.name=='mechant' || this.name=='mechant2')
            fill(255,0,0);
        rect(this.x,this.y,this.w,this.h);
    };

    this.update = function () {
        if(!loading) {
            if(this.name=='joueur') {
                for(c=0;c<=this.vitesse;c++) {
                    if (keyIsDown(LEFT_ARROW) && detectPos(this, 'left')) {
                        this.x = this.x - 1;
                    }
                    if (keyIsDown(RIGHT_ARROW) && detectPos(this, 'right')) {
                        this.x = this.x + 1;
                    }
                    if (keyIsDown(UP_ARROW) && detectPos(this, 'up')) {
                        this.y = this.y - 1;
                    }
                    if (keyIsDown(DOWN_ARROW) && detectPos(this, 'down')) {
                        this.y = this.y + 1;
                    }

                }
            }
            else if(this.name=='mechant') {
                if(this.direction == 'up' && detectPos(this, 'up')) {
                    this.y = this.y - 1;
                } else { this.direction='down';}

                if(this.direction == 'down' && detectPos(this, 'down')) {
                    this.y = this.y + 1;
                } else { this.direction='up';}

            }
        }
    };

}