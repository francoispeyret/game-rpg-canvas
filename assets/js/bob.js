
function Bob(name,x,y) {
    this.id = entiteIdGlobal+1;
    entiteIdGlobal++;
    this.name = name;
    if(this.name===undefined)
        this.name = 'entite';
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.vitesse = 1;
    this.direction = 'down';
    this.deplacement = 0;
    this.marcheStatus = false;
    this.vie = 100;
    this.vieMax = 100;
    this.attackIncrement = 0;

    this.display = function () {
        noStroke();
        if(this.name=='joueur' || this.name=='mechant' || this.name=='mechant2') {
            switch (this.direction) {
                case 'down':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.down1, this.x-10,this.y-17,50,50);
                    } else {
                        image(bobimage.down4, this.x-10,this.y-17,50,50);
                    }
                    break;
                case 'up':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.up1, this.x-10,this.y-17,50,50);
                    } else {
                        image(bobimage.up2, this.x-10,this.y-17,50,50);
                    }
                    break;
                case 'right':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.right1, this.x-10,this.y-17,50,50);
                    } else {
                        image(bobimage.right2, this.x-10,this.y-17,50,50);
                    }
                    break;
                case 'left':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.left1, this.x-10,this.y-17,50,50);
                    } else {
                        image(bobimage.left2, this.x-10,this.y-17,50,50);
                    }
                    break;
                default:
                    image(bobimage.down1, this.x-10,this.y-17,50,50);
            }

        } else {
           // fill(255);
            if(this.name=='mechant' || this.name=='mechant2')
                fill(30,30,190);
            rect(this.x,this.y,this.w,this.h);
        }

        // barre de vie
        fill(0);
        stroke(255,0,0);
        rect(this.x,this.y-20,31,5);
        noStroke();
        fill(230,0,0);
        rect(this.x+1,this.y-19,map(this.vie,0,this.vieMax,0,30),4);
        // \\ bare de vie

        if(this.attackIncrement > 0) {

            noFill();
            stroke(255,0,0);

            switch (this.direction) {
                case 'down':
                    rect(this.x,this.y+30,30,30);
                    break;
                case 'up':
                    rect(this.x,this.y-30,30,30);
                    break;
                case 'right':
                    rect(this.x+30,this.y,30,30);
                    break;
                case 'left':
                    rect(this.x-30,this.y,30,30);
                    break;
            }

            this.attackIncrement--;
        }

    };

    this.update = function () {
        if(!loading) {
            if(this.name=='joueur') {
                for(c=0;c<=this.vitesse;c++) {
                    if (keyIsDown(LEFT_ARROW) && detectPos(this, 'left')) {
                        this.x = this.x - 1;
                        this.direction = 'left';
                        this.deplacement++;
                        this.marcheStatus= true;
                    }
                    else if (keyIsDown(RIGHT_ARROW) && detectPos(this, 'right')) {
                        this.x = this.x + 1;
                        this.direction = 'right';
                        this.deplacement++;
                        this.marcheStatus= true;
                    }
                    else if (keyIsDown(UP_ARROW) && detectPos(this, 'up')) {
                        this.y = this.y - 1;
                        this.direction = 'up';
                        this.deplacement++;
                        this.marcheStatus= true;
                    }
                    else if (keyIsDown(DOWN_ARROW) && detectPos(this, 'down')) {
                        this.y = this.y + 1;
                        this.direction = 'down';
                        this.deplacement++;
                        this.marcheStatus= true;
                    }

                }
            }
            else if(this.name=='mechant') {
                if(this.direction == 'up' && detectPos(this, 'up')) {
                    this.y = this.y - 1;
                    this.deplacement++;
                    this.marcheStatus= true;
                } else { this.direction='down';}

                if(this.direction == 'down' && detectPos(this, 'down')) {
                    this.y = this.y + 1;
                    this.deplacement++;
                    this.marcheStatus= true;
                } else { this.direction='up';}

            }
        }
    };

    this.marche = function() {
        if(round(this.deplacement/18)%2==0) {return 1;}
        else {return 2;}
    };

    this.attack = function () {
        this.attackIncrement = 10;
        if(typeof detectEntite(this,this.direction,30) === 'object') {
            var cible = detectEntite(this,this.direction,30);
            cible.vie -= 25;
        }

    };

}