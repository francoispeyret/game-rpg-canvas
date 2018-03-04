
function Interface() {

    this.interfaceHeight = 100;
    this.interfaceWidth = 120;

    this.spaceKeyPressed = false;
    this.rightKeyPressed = false;
    this.downKeyPressed = false;
    this.leftKeyPressed = false;
    this.topKeyPressed = false;

    this.display = function () {

        var x = mapping.mapCurrent.length * mapping.caseWidth;
        var width = mapping.mapCurrent[[0]].length * mapping.caseWidth;
        var height = mapping.mapCurrent.length * mapping.caseHeight;

        //background
        stroke(51,47,38);
        strokeWeight(8);
        rect(0,0,width,height);
        fill(41,37,30);
        line(width,0,width,height);
        noStroke();
        rect(width,0,this.interfaceWidth,height);
        stroke(51,47,38);

        // santé
        noStroke();
        fill(0);
        rect(x+10,20,bob.vieMax,10);
        fill(216, 33, 33);
        text('SANTÉ',x+10,15);
        rect(x+10,20,bob.vie,10);

        // énergie
        noStroke();
        fill(0);
        rect(x+10,50,bob.energieMax,10);
        fill(122, 232, 45);
        text('ÉNERGIE',x+10,45);
        rect(x+10,50,bob.energie,10);

        // MANA
        noStroke();
        fill(0);
        rect(x+10,80,bob.manaMax,10);
        fill(39, 161, 255);
        text('MANA',x+10,75);
        rect(x+10,80,bob.mana,10);

        // bare espace
        stroke(60,55,47);
        strokeWeight(1);
        if(this.spaceKeyPressed)
            fill(90,85,77);
        else
            noFill();
        rect(x+5,550,46,20);
        fill(90,85,77);
        noStroke();
        text('SPACE',x+8,565);

        //droite
        stroke(60,55,47);
        if(this.rightKeyPressed)
            fill(90,85,77);
        else
            noFill();
        rect(x+95,550,20,20);
        fill(90,85,77);
        text('►',x+100,566);

        //gauche
        stroke(60,55,47);
        if(this.leftKeyPressed)
            fill(90,85,77);
        else
            noFill();
        rect(x+55,550,20,20);
        fill(90,85,77);
        text('◄',x+60,566);

        //bas
        stroke(60,55,47);
        if(this.downKeyPressed)
            fill(90,85,77);
        else
            noFill();
        rect(x+75,550,20,20);
        fill(90,85,77);
        text('▼',x+80,566);

        //haut
        stroke(60,55,47);
        if(this.topKeyPressed)
            fill(90,85,77);
        else
            noFill();
        rect(x+75,530,20,20);
        fill(90,85,77);
        text('▲',x+80,546);


    };

    this.displayHorizontal = function() {
        var y = mapping.mapCurrent.length * mapping.caseHeight;
        var width = mapping.mapCurrent[[0]].length * mapping.caseWidth;
        var height = mapping.mapCurrent.length * mapping.caseHeight;

        //background
        stroke(51,47,38);
        strokeWeight(8);
        rect(0,0,width,height);
        fill(41,37,30);
        line(0,y,width,y);
        noStroke();
        rect(0,y,width,this.interfaceHeight);
        stroke(51,47,38);

        // santé
        noStroke();
        fill(0);
        rect(10,y+20,bob.vieMax,10);
        fill(216, 33, 33);
        text('SANTÉ',10,y+15);
        rect(10,y+20,bob.vie,10);

        // énergie
        noStroke();
        fill(0);
        rect(10,y+50,bob.energieMax,10);
        fill(122, 232, 45);
        text('ÉNERGIE',10,y+45);
        rect(10,y+50,bob.energie,10);

        // MANA
        noStroke();
        fill(0);
        rect(10,y+80,bob.manaMax,10);
        fill(39, 161, 255);
        text('MANA',10,y+75);
        rect(10,y+80,bob.mana,10);

        // touches
        noFill();
        stroke(51,47,38);
        strokeWeight(4);
        if (keyIsDown(UP_ARROW))
            fill(30);
        rect(width - 87,y+13,33,33);
        line(width-80,y+35,width-70,y+22);
        line(width-61,y+35,width-70,y+22);
        noFill();
        if (keyIsDown(DOWN_ARROW))
            fill(30);
        rect(width - 87,y+53,33,33);
        line(width-80,y+65,width-70,y+76);
        line(width-61,y+65,width-70,y+76);
        noFill();
        if (keyIsDown(RIGHT_ARROW))
            fill(30);
        rect(width - 47,y+53,33,33);
        line(width-35,y+60,width-25,y+69);
        line(width-35,y+77,width-25,y+69);
        noFill();
        if (keyIsDown(LEFT_ARROW))
            fill(30);
        rect(width - 127,y+53,33,33);
        line(width-105,y+60,width-115,y+69);
        line(width-105,y+77,width-115,y+69);
        noFill();
        if (keyIsDown(16))
            fill(30);
        rect(width - 47,y+13,33,33);

    };

}