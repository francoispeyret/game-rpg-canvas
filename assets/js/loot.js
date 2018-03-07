

function Loot(type,quantity,x,y,mapX,mapY) {
    this.object = true;
    this.type = type;
    this.quantity = quantity;
    this.x = x;
    this.y = y;
    this.mapX = mapX;
    this.mapY = mapY;

    this.display = function() {
        noStroke();
        fill(232,220,50);
        ellipse(x+3,y+3,10,10);
        ellipse(x+15,y+5,10,10);
        ellipse(x+7,y+10,10,10);
        noFill();

    };

    this.update = function() {

    };


}