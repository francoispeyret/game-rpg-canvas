
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
    this.attackStatus = false;

    this.vie = 100;
    this.vieMax = 100;
    this.showPV = 0;
    this.energie = 100;
    this.energieMax = 100;
    this.mana = 100;
    this.manaMax = 100;

    this.showAttack = 0;
    this.costAttack = 20;

    this.display = function () {

        if(this.showAttack > 0) {
            noStroke();
            fill(255, 0, 0);

            switch (this.direction) {
                case 'down':
                    rect(this.x, this.y + 30, 30, 30);
                    break;
                case 'up':
                    rect(this.x, this.y - 30, 30, 30);
                    break;
                case 'right':
                    rect(this.x + 30, this.y, 30, 30);
                    break;
                case 'left':
                    rect(this.x - 30, this.y, 30, 30);
                    break;
            }
            this.showAttack--;
        }

        noStroke();
        noFill();
        if(this.name=='joueur' || this.name=='mechant' || this.name=='mechant2') {
            switch (this.direction) {
                case 'down':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.down1, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==2 || this.marcheStatus==false) {
                        image(bobimage.down2, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==3 || this.marcheStatus==false) {
                        image(bobimage.down3, this.x-10,this.y-17,50,50);
                    } else {
                        image(bobimage.down4, this.x-10,this.y-17,50,50);
                    }
                    break;
                case 'up':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.up1, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==2 || this.marcheStatus==false) {
                        image(bobimage.up2, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==3 || this.marcheStatus==false) {
                        image(bobimage.up3, this.x-10,this.y-17,50,50);
                    } else {
                        image(bobimage.up4, this.x-10,this.y-17,50,50);
                    }
                    break;
                case 'right':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.right1, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==2 && this.marcheStatus==true) {
                        image(bobimage.right2, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==3 && this.marcheStatus==true) {
                        image(bobimage.right3, this.x-10,this.y-17,50,50);
                    } else if(this.marcheStatus==true) {
                        image(bobimage.right4, this.x-10,this.y-17,50,50);
                    }
                    break;
                case 'left':
                    if(this.marche()==1 || this.marcheStatus==false) {
                        image(bobimage.left1, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==2 && this.marcheStatus==true) {
                        image(bobimage.left2, this.x-10,this.y-17,50,50);
                    } else if(this.marche()==3 && this.marcheStatus==true) {
                        image(bobimage.left3, this.x-10,this.y-17,50,50);
                    } else if(this.marcheStatus==true){
                        image(bobimage.left4, this.x-10,this.y-17,50,50);
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

        if(this.showPV > 0) {
            // barre de vie
            fill(0);
            stroke(255,0,0);
            rect(this.x,this.y-20,31,5);
            noStroke();
            fill(230,0,0);
            rect(this.x+1,this.y-19,map(this.vie,0,this.vieMax,0,30),4);
            // \\ bare de vie
            this.showPV--;
        }
    };

    this.update = function () {
        if(!loading) {
            if(this.name=='joueur') {
                // sprint
                if (keyIsDown(16) && this.energie > 0 && this.marcheStatus == true) {// shift
                    this.vitesse = 2;
                    this.energie -= 0.3;
                } else {
                    this.vitesse = 1;
                    if(this.marcheStatus == false && this.energie < this.energieMax) {
                        this.energie += 0.15;
                    } else if(this.energie < this.energieMax) {
                        this.energie += 0.05;
                    }
                }
                for(c=0;c<=this.vitesse;c++) {
                    if (keyIsDown(LEFT_ARROW)) {
                        this.direction = 'left';
                        if( detectPos(this, 'left')) {
                            this.x = this.x - 1;
                            this.deplacement++;
                            this.marcheStatus= true;
                        }
                    }
                    else if (keyIsDown(RIGHT_ARROW)) {
                        this.direction = 'right';
                        if(detectPos(this, 'right')) {
                            this.x = this.x + 1;
                            this.deplacement++;
                            this.marcheStatus= true;
                        }
                    }
                    else if (keyIsDown(UP_ARROW)) {
                        this.direction = 'up';
                        if(detectPos(this, 'up')) {
                            this.y = this.y - 1;
                            this.deplacement++;
                            this.marcheStatus= true;
                        }
                    }
                    else if (keyIsDown(DOWN_ARROW)) {
                        this.direction = 'down';
                        if(detectPos(this, 'down')) {
                            this.y = this.y + 1;
                            this.deplacement++;
                            this.marcheStatus= true;
                        }
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
        var cycle = 16;
        if(round(this.deplacement/cycle)%4==0) {return 1;}
        else if(round(this.deplacement/cycle)%4==1) {return 2;}
        else if(round(this.deplacement/cycle)%4==2) {return 3;}
        else if(round(this.deplacement/cycle)%4==3) {return 4;}
    };

    this.attack = function () {
        this.attackStatus = true;
        if(this.energie >= this.costAttack) {
            this.energie -= this.costAttack;
            this.showAttack = 10;
            if(typeof detectEntite(this,this.direction,30) === 'object') {
                var cible = detectEntite(this,this.direction,30);
                cible.vie -= 25;
                cible.showPV = 60;
            }
        }

    };

}