
var entites = [];
var mapCurrentId = 2.1;
var loading = true;

function setup() {
    map = new MapGenerator();
    map.mapCurrent = map.maps[1];
    bob = new Bob('joueur',75,75);
    amechant = new Bob('mechant',140,76);
    entites.push(bob);
    entites.push(amechant);

    var x = map.mapCurrent[[0]].length * map.caseWidth;
    var y = map.mapCurrent.length * map.caseHeight;
    createCanvas(x,y);
    frameRate(60);
    loading = false;

    console.log();
}

function draw() {
    //console.log('x='+entites[0].x+';y='+entites[0].y);
    //console.log(mapCurrentId);
    //console.log(entites);
    background(0);
    map.display();
    var c = 0;
    for(c=0;c<entites.length;c++) {
        entites[c].display();
        entites[c].update();
    }

}


function detectPos (o,d) {
    var resultMap = detectMap(o,d);
    var resultEntites = detectEntite(o,d);

    //console.log(resultMap);
    //console.log('resultEntites/'+resultEntites);

    if(resultMap===2 && resultEntites) {
        return true;
    } else if (resultMap > 2 && resultMap < 3 && resultEntites) {
        map.changeMap(resultMap,mapCurrentId,d);
        loading = false;
        return false;
    } else {
        //console.log('null');
    }
}

function detectEntite(obj,direction) {

    switch (direction) {
        case 'left':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name) {
                    if(!collideRectRect(obj.x-1, obj.y, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        break;
        case 'right':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name) {
                    if(!collideRectRect(obj.x+1, obj.y, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        break;
        case 'up':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name) {
                    if(!collideRectRect(obj.x, obj.y-1, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        break;
        case 'down':
            for(e=0;e<entites.length;e++) {
                if(obj.name != entites[e].name) {
                    if(!collideRectRect(obj.x, obj.y+1, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        break;
        default:
            return true;
    }
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