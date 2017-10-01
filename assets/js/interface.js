
function Interface() {

    this.interfaceHeight = 100;


    this.display = function() {
        let y = mapping.mapCurrent.length * mapping.caseHeight;
        let width = mapping.mapCurrent[[0]].length * mapping.caseWidth;
        let height = mapping.mapCurrent.length * mapping.caseHeight;

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