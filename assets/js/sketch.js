var bob = {};
var map = {};
var entites = [];
var mapCurrentId = 2.1;
var loading = true;
var grass, tree, rock, bobimage;

function preload() {

    grass = loadImage("assets/images/grass.png");
    tree = loadImage("assets/images/tree.png");
    rock = loadImage("assets/images/rock.png");
    bobimage = {
        down1: loadImage("assets/images/bob-down-1.png"),
        down2: loadImage("assets/images/bob-down-2.png"),
        down3: loadImage("assets/images/bob-down-3.png"),
        down4: loadImage("assets/images/bob-down-4.png"),
        up1: loadImage("assets/images/bob-up-1.png"),
        up2: loadImage("assets/images/bob-up-2.png"),
        right1: loadImage("assets/images/bob-right-1.png"),
        right2: loadImage("assets/images/bob-right-2.png"),
        left1: loadImage("assets/images/bob-left-1.png"),
        left2: loadImage("assets/images/bob-left-2.png"),
    };

}

function setup() {

    map = new MapGenerator();
    map.changeMap();
    bob = new Bob('joueur',75,355);
    //entites.push(new Bob('mechant',140,75));

    var x = map.mapCurrent[[0]].length * map.caseWidth;
    var y = map.mapCurrent.length * map.caseHeight;
    createCanvas(x,y);
    frameRate(60);
    loading = false;

}

function draw() {
    background(0);
    map.display();
    bob.display();
    bob.update();
    var i = 0;
    for(i=0;i<entites.length;i++) {
        entites[i].display();
        entites[i].update();
    }

}

function keyReleased() {
    if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
        bob.marcheStatus=false;
    }
}


function detectPos (o,d) {
    var resultMap = detectMap(o,d);
    var resultEntites = detectEntite(o,d);

    if(resultMap===2 && resultEntites) {
        return true;
    } else if (resultMap > 2 && resultMap < 3 && resultEntites) {
        map.changeMap(resultMap,mapCurrentId,d);
        loading = false;
        return false;
    } else {
        return false;
    }
}

function detectEntite(obj,direction) {
    if(entites.length <= 0) {
        return true;
    }
    switch (direction) {
        case 'left':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name && collideRectRect(obj.x-1, obj.y, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return false;
                }
				if(obj.name!='joueur' && collideRectRect(obj.x-1, obj.y, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        case 'right':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name && collideRectRect(obj.x+1, obj.y, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return false;
                }
				if(obj.name!='joueur' && collideRectRect(obj.x+1, obj.y, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        case 'up':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name && collideRectRect(obj.x, obj.y-1, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return false;
                }
				if(obj.name!='joueur' && collideRectRect(obj.x, obj.y-1, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        case 'down':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name) {
                    if(collideRectRect(obj.x, obj.y+1, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                        return false;
                    }
                }
				if(obj.name!='joueur' && collideRectRect(obj.x, obj.y+1, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        default:
            return false;
    }
    return true;
}


function detectMap(obj,direction) {
    switch (direction) {
        case 'left':
            var posX = (obj.x-1) / map.caseWidth; // left
            var mapX = Math.floor(posX);
            var posY = (obj.y) / map.caseHeight;
            var posYB = (obj.y+obj.h) / map.caseHeight;
            var mapY = Math.floor(posY);
            var mapYB = Math.floor(posYB);
            var mapValue = map.mapCurrent[mapY][mapX];
            var mapValueB = map.mapCurrent[mapYB][mapX];
            if(mapValue===mapValueB)
                return mapValue;
            break;
        case 'right':
            var posX = (obj.x+obj.w+1) / map.caseWidth; // right
            var mapX = Math.floor(posX);
            var posY = (obj.y) / map.caseHeight;
            var posYB = (obj.y+obj.h) / map.caseHeight;
            var mapY = Math.floor(posY);
            var mapYB = Math.floor(posYB);
            var mapValue = map.mapCurrent[mapY][mapX];
            var mapValueB = map.mapCurrent[mapYB][mapX];
            if(mapValue===mapValueB)
                return mapValue;
            break;
        case 'up':
            var posX = (obj.x) / map.caseWidth;
            var mapX = Math.floor(posX);
            var posXB = (obj.x+obj.w) / map.caseWidth;
            var mapXB = Math.floor(posXB);
            var posY = (obj.y-1) / map.caseHeight; // up
            var mapY = Math.floor(posY);
            var mapValue = map.mapCurrent[mapY][mapX];
            var mapValueB = map.mapCurrent[mapY][mapXB];
            if(mapValue===mapValueB)
                return mapValue;
            break;
        case 'down':
            var posX = (obj.x) / map.caseWidth;
            var mapX = Math.floor(posX);
            var posXB = (obj.x+obj.w) / map.caseWidth;
            var mapXB = Math.floor(posXB);
            var posY = (obj.y+obj.h+1) / map.caseHeight; // down
            var mapY = Math.floor(posY);
            var mapValue = map.mapCurrent[mapY][mapX];
            var mapValueB = map.mapCurrent[mapY][mapXB];
            if(mapValue===mapValueB)
                return mapValue;
            break;
    }
}
/*
var test = 0;

setInterval(function () {
    var hehe = test/30;
    if(hehe%2 == 0) {
        console.log(hehe+'->pair');
    } else {
        console.log(hehe+'->impair');
    }
    test = test + 1;
},1100);$
*/
