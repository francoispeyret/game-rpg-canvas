var coordX = 0;
var coordY = 0;
var entites = [];
var first = true;

function setup() {
    map = new MapGenerator();
    blob = new Blob('joueur',75,75);
    entites.push(blob);

    var x = map.map1[0].length * map.caseWidth;
    var y = map.map1.length * map.caseHeight;
    createCanvas(x,y);
}

function draw() {
    //console.log(entites);
    background(0);
    map.display(first);
    if(first==true)
        first=false;

    for(c=0;c<entites.length;c++) {
        entites[c].display();
        entites[c].update();
    }



}

function Blob(name,x,y) {
    this.name = name;
    if(this.name==undefined)
        this.name = 'entite';
    this.x = x;
    this.y = y;
    this.w = 25;
    this.h = 25;
    this.vitesse = 2;

    this.display = function () {
       // console.log('x'+this.x +' y'+this.y);
        noStroke();
        fill(255);
        rect(this.x,this.y,this.w,this.h);
    };

    this.update = function () {
        if(this.name=='joueur') {
            for(c=0;c<=this.vitesse;c++) {
                if (keyIsDown(LEFT_ARROW) && detectWall(this, 'left')) {
                    this.x = this.x - 1;
                }
                if (keyIsDown(RIGHT_ARROW) && detectWall(this, 'right')) {
                    this.x = this.x + 1;
                }
                if (keyIsDown(UP_ARROW) && detectWall(this, 'up')) {
                    this.y = this.y - 1;
                }
                if (keyIsDown(DOWN_ARROW) && detectWall(this, 'down')) {
                    this.y = this.y + 1;
                }

            }
        }
    };

}