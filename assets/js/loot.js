

function Loot(type,quantity,x,y,mapX,mapY) {
    this.object = true;
    this.zindex = 0;
    this.type = type;
    this.quantity = quantity;
    this.x = x;
    this.y = y;
    this.mapX = mapX;
    this.mapY = mapY;

    this.display = function() {
        noStroke();
        noFill();
        image(gold, x, y, 22, 20);

    };

    this.update = function() {

    };


}