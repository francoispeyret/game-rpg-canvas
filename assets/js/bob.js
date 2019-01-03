function Bob(name, x, y, mapX, mapY) {

    this.name = name;
    if (this.name === undefined)
        this.name = 'entite';

    this.id = entiteIdGlobal + 1;
    entiteIdGlobal++;
    this.type = 'personnage';

    this.zindex = 10;

    this.mapX = mapX;
    if (this.mapX === undefined)
        this.mapX = 0;
    this.mapY = mapY;
    if (this.mapY === undefined)
        this.mapY = 0;

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

    this.attacks = [];

    this.showAttack = 0;
    this.costAttack = 20;

    this.display = function () {

        if (debug) {
            stroke(255);
            strokeWeight(1);
            noFill();
            rect(this.x, this.y, this.w, this.h);
            noStroke();
        }

        if (this.showAttack > 0) {
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
            noFill();
            this.showAttack--;
        }

        noStroke();
        noFill();
        if (this.name == 'joueur' || this.name == 'mechant' || this.name == 'mechant2') {
            switch (this.direction) {
                case 'down':
                    if (this.marcheCycle() == 1 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 0, 0, 50, 50);
                    } else if (this.marcheCycle() == 2 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 0, 50, 50, 50);
                    } else if (this.marcheCycle() == 3 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 0, 100, 50, 50);
                    } else {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 0, 150, 50, 50);
                    }
                    break;
                case 'up':
                    if (this.marcheCycle() == 1 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 150, 0, 50, 50);
                    } else if (this.marcheCycle() == 2 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 150, 50, 50, 50);
                    } else if (this.marcheCycle() == 3 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 150, 100, 50, 50);
                    } else {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 150, 150, 50, 50);
                    }
                    break;
                case 'right':
                    if (this.marcheCycle() == 1 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 100, 0, 50, 50);
                    } else if (this.marcheCycle() == 2 && this.marcheStatus == true) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 100, 50, 50, 50);
                    } else if (this.marcheCycle() == 3 && this.marcheStatus == true) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 100, 100, 50, 50);
                    } else if (this.marcheStatus == true) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 100, 150, 50, 50);
                    }
                    break;
                case 'left':
                    if (this.marcheCycle() == 1 || this.marcheStatus == false) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 50, 0, 50, 50);
                    } else if (this.marcheCycle() == 2 && this.marcheStatus == true) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 50, 50, 50, 50);
                    } else if (this.marcheCycle() == 3 && this.marcheStatus == true) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 50, 100, 50, 50);
                    } else if (this.marcheStatus == true) {
                        image(bobimageSprite, this.x - 10, this.y - 17, 50, 50, 50, 150, 50, 50);
                    }
                    break;
                default:
                    image(bobimage.down1, this.x - 10, this.y - 17, 50, 50);
            }

        } else {
            // fill(255);
            if (this.name == 'mechant' || this.name == 'mechant2')
                fill(30, 30, 190);
            rect(this.x, this.y, this.w, this.h);
        }

        if (this.showPV > 0) {
            // barre de vie
            fill(0);
            stroke(255, 0, 0);
            strokeWeight(1);
            rect(this.x, this.y - 20, 31, 5);
            noStroke();
            fill(230, 0, 0);
            rect(this.x + 1, this.y - 19, map(this.vie, 0, this.vieMax, 0, 30), 4);
            // \\ bare de vie
            this.showPV--;
            noFill();
        }
    };

    this.update = function () {
        if (!loading) {
            if (this.name == 'joueur') {
                if(this.mana <= this.manaMax) {
                    this.mana += 0.1;
                }
                // sprint
                if (keyIsDown(16) && this.energie > 0 && this.marcheStatus == true) {// shift
                    this.vitesse = 2;
                    this.energie -= 0.3;
                } else {
                    this.vitesse = 1;
                    if (this.marcheStatus == false && this.energie < this.energieMax) {
                        this.energie += 0.30;
                    } else if (this.energie < this.energieMax) {
                        this.energie += 0.10;
                    }
                }
                for (c = 0; c <= this.vitesse; c++) {
                    if (keyIsDown(LEFT_ARROW)) {
                        this.direction = 'left';
                        if (detectPos(this, 'left')) {
                            this.x = this.x - 1;
                            this.marche();
                        }
                    } else if (keyIsDown(RIGHT_ARROW)) {
                        this.direction = 'right';
                        if (detectPos(this, 'right')) {
                            this.x = this.x + 1;
                            this.marche();
                        }
                    } else if (keyIsDown(UP_ARROW)) {
                        this.direction = 'up';
                        if (detectPos(this, 'up')) {
                            this.y = this.y - 1;
                            this.marche();
                        }
                    } else if (keyIsDown(DOWN_ARROW)) {
                        this.direction = 'down';
                        if (detectPos(this, 'down')) {
                            this.y = this.y + 1;
                            this.marche();
                        }
                    }

                }
            } else if (this.name == 'mechant') {
                if (this.direction == 'up' && detectPos(this, 'up')) {
                    this.y = this.y - 1;
                    this.deplacement++;
                    this.marcheStatus = true;
                } else {
                    this.direction = 'down';
                }

                if (this.direction == 'down' && detectPos(this, 'down')) {
                    this.y = this.y + 1;
                    this.deplacement++;
                    this.marcheStatus = true;
                } else {
                    this.direction = 'up';
                }

            }
        }
        this.display();

        if (this.attacks.length > 0) {
            for (i = this.attacks.length-1; i > 0; i--) {
                this.attacks[i].update();
            }
            for (i = this.attacks.length -1; i > 0; i--) {
                if(this.attacks[i].life <= 0)
                    this.attacks.splice(i,1);
            }
        }
    };

    this.marcheCycle = function () {
        var cycle = 16;
        if (round(this.deplacement / cycle) % 4 == 0) {
            return 1;
        } else if (round(this.deplacement / cycle) % 4 == 1) {
            return 2;
        } else if (round(this.deplacement / cycle) % 4 == 2) {
            return 3;
        } else if (round(this.deplacement / cycle) % 4 == 3) {
            return 4;
        }
    };

    this.marche = function () {
        this.deplacement++;
        this.marcheStatus = true;
        if (detectMap(this, this.direction) == 2.1)
            this.createParticules();
    };

    this.interact = function () {

        var cible = detectEntite(this, this.direction, 30);
        this.showAttack += 10;
        if (this.energie >= this.costAttack && typeof cible === 'object') {
            this.energie -= this.costAttack;

            cible.vie -= 25;
            cible.showPV = 60;
        }

        this.firebol();

    };

    this.firebol = function () {
        if(this.mana > 20) {
            this.mana -= 20;
            this.attacks.push(new fireBol(this.direction, this.x, this.y));
        }
    };

    this.createParticules = function () {
        var particuleX = this.x + this.w / 3 + random(-10, 10);
        var particuleY = this.y + this.h / 2 + random(-7, 7);
        particules.push(new Particule(particuleX, particuleY, this.direction));
    };

}