

function Loot(type,quantity,x,y,mapX,mapY) {
    this.object = true;
    this.zindex = 0;
    this.type = type;
    this.quantity = quantity;
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 24;
    this.mapX = mapX;
    this.mapY = mapY;
    this.capturer = false;

    this.display = function() {
        noStroke();
        noFill();
        image(gold, this.x, this.y, this.w, this.h);

    };

    this.update = function() {

    };


}

function capturerLoot(loot) {
    loot.capturer = true;
    if(loot.type=="gold"){
        inventory.goldQuantity += loot.quantity;
    }
    loot.quantity = 0;

}