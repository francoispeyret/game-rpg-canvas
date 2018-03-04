var debug = false;

var ui = {};
var mapping = {};
var mapHeight = 12;
var mapWidth = 12;
var mapID = 1;
var mapPositionX = '#1';
var mapPositionY = '#1';
//var bob = {};
var entites = [];
var entiteIdGlobal = 0;
var mapCurrentId = 2.1;
var loading = true;

// images
var grass, ground, tree, rock, bobimage;

// chargement des assets
function preload() {

    grass = loadImage("assets/images/grass.png");
    ground = loadImage("assets/images/ground.png");
    tree = loadImage("assets/images/tree.png");
    rock = loadImage("assets/images/rock.png");
    // sprite du joueur
    bobimage = {
        down1: loadImage("assets/images/bob-down-1.png"),
        down2: loadImage("assets/images/bob-down-2.png"),
        down3: loadImage("assets/images/bob-down-3.png"),
        down4: loadImage("assets/images/bob-down-4.png"),
        up1: loadImage("assets/images/bob-up-1.png"),
        up2: loadImage("assets/images/bob-up-2.png"),
        up3: loadImage("assets/images/bob-up-3.png"),
        up4: loadImage("assets/images/bob-up-4.png"),
        right1: loadImage("assets/images/bob-right-1.png"),
        right2: loadImage("assets/images/bob-right-2.png"),
        right3: loadImage("assets/images/bob-right-3.png"),
        right4: loadImage("assets/images/bob-right-4.png"),
        left1: loadImage("assets/images/bob-left-1.png"),
        left2: loadImage("assets/images/bob-left-2.png"),
        left3: loadImage("assets/images/bob-left-3.png"),
        left4: loadImage("assets/images/bob-left-4.png"),
    };

}

function setup() {

    ui  = new Interface();
    mapping = new MapGenerator();
    mapping.createMap();
    mapping.changeMap();

    for(var e = 0; e < mapping.entites['#1']['#1'].length; e++) {
		var entiteName = mapping.entites['#1']['#1'][e][0];
		var entiteX = mapping.entites['#1']['#1'][e][1];
		var entiteY = mapping.entites['#1']['#1'][e][2];
		var entiteMapX = '#1';
		var entiteMapY = '#1';
		entites.push(new Bob(entiteName,entiteX,entiteY,entiteMapX,entiteMapY));
    }

    var x = mapping.mapCurrent[[0]].length * mapping.caseWidth + ui.interfaceWidth;
    var y = mapping.mapCurrent.length * mapping.caseHeight;
    createCanvas(x,y);
    frameRate(60);
    loading = false;

}

function draw() {
    noSmooth();
    background(255,0,0);

    mapping.display();
    entites.sort(sortForDisplay);

    for(var i=0;i<entites.length;i++) {
        if(entites[i].vie>0) {
            if(entites[i].name=='joueur') {
				entites[i].display();
				entites[i].update();
            } else {
                if(entites[i].mapX==mapPositionX && entites[i].mapY==mapPositionY) {
					entites[i].display();
					entites[i].update();
                }
            }
        } else {
            var index = entites.indexOf(entites[i]);
            entites.splice(index, 1);
        }
    }
    ui.display();

    if(debug) {
        fill(0,0,255);
        textSize(18);
        text(mapPositionY, 300, 310);
        text(mapPositionX, 300, 290);
    }

}

// tri pour afficher selont la position en y
function sortForDisplay(a,b) {
    if (a.y < b.y)
        return -1;
    if (a.y > b.y)
        return 1;
    return 0;
}

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function keyReleased() {
    if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
        bob.marcheStatus=false;
    }

    switch (keyCode) {
        case 32: // espace
            ui.spaceKeyPressed = false;
            break;
        case 39: // droite
            ui.rightKeyPressed = false;
            break;
        case 40: // bas
            ui.downKeyPressed = false;
            break;
        case 37: // gauche
            ui.leftKeyPressed = false;
            break;
        case 38: // haut
            ui.topKeyPressed = false;
            break;
    }
}

function keyPressed() {
    switch (keyCode) {
        case 32: // espace
            bob.attack();
            ui.spaceKeyPressed = true;
            break;
        case 39: // droite
            ui.rightKeyPressed = true;
            break;
        case 40: // bas
            ui.downKeyPressed = true;
            break;
        case 37: // gauche
            ui.leftKeyPressed = true;
            break;
        case 38: // haut
            ui.topKeyPressed = true;
            break;
    }
}


// detection des obstacles ou des interection avec la map et les entites
function detectPos (o,d) {
    var resultMap = detectMap(o,d);
    var resultEntites = detectEntite(o,d);

    if(resultMap >= 2 && resultMap < 3  && resultEntites === true) {
        return true;
    } else if (typeof resultMap === 'object' && resultMap[0].substr(0,1)=='#' && resultEntites===true) {
        mapping.changeMap(resultMap[0],resultMap[1],mapPositionY,mapPositionX,d);
        loading = false;
        return false;
    } else {
        bob.marcheStatus=false;
        return false;
    }
}

// detection des entietes selont la direction et la distance
function detectEntite(obj,direction,distance) {
    if(distance==null)
		distance = 1;
    if(entites.length <= 0) {
        return true;
    }
    switch (direction) {
        case 'left':
            for(e=0;e<entites.length;e++) {
                if(obj.name!=entites[e].name && collideRectRect(obj.x-distance, obj.y, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return entites[e];
                }
				if(obj.name!='joueur' && collideRectRect(obj.x-distance, obj.y, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        case 'right':
            for(e=0;e<entites.length;e++) {
                if(obj.name!=entites[e].name && collideRectRect(obj.x+distance, obj.y, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return entites[e];
                }
				if(obj.name!='joueur' && collideRectRect(obj.x+distance, obj.y, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        case 'up':
            for(e=0;e<entites.length;e++) {
                if(obj.name!=entites[e].name && collideRectRect(obj.x, obj.y-distance, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return entites[e];
                }
				if(obj.name!='joueur' && collideRectRect(obj.x, obj.y-distance, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        case 'down':
            for(e=0;e<entites.length;e++) {
                if(obj.name!=entites[e].name && collideRectRect(obj.x, obj.y+distance, obj.w, obj.h, entites[e].x, entites[e].y, entites[e].w, entites[e].h)) {
                    return entites[e];
                }
				if(obj.name!='joueur' && collideRectRect(obj.x, obj.y+distance, obj.w, obj.h, bob.x, bob.y, bob.w, bob.h)) {
					return false;
				}
            }
        break;
        default:
            return false;
    }
    return true;
}

// detection des elements de la map : retourne la valeur de la case a une distance de 1px
function detectMap(obj,direction) {
    switch (direction) {
        case 'left':
            var posX = (obj.x-1) / mapping.caseWidth; // left
            var mapX = Math.floor(posX);
            var posY = (obj.y) / mapping.caseHeight;
            var posYB = (obj.y+obj.h) / mapping.caseHeight;
            var mapY = Math.floor(posY);
            var mapYB = Math.floor(posYB);
            var mapValue = mapping.mapCurrent[mapY][mapX];
            var mapValueB = mapping.mapCurrent[mapYB][mapX];
            if(typeof mapValue==='object' && typeof mapValueB==='object')
                return mapValue;
            if(Math.floor(mapValue)===Math.floor(mapValueB))
                return mapValue;
            break;
        case 'right':
            var posX = (obj.x+obj.w+1) / mapping.caseWidth; // right
            var mapX = Math.floor(posX);
            var posY = (obj.y) / mapping.caseHeight;
            var posYB = (obj.y+obj.h) / mapping.caseHeight;
            var mapY = Math.floor(posY);
            var mapYB = Math.floor(posYB);
            var mapValue = mapping.mapCurrent[mapY][mapX];
            var mapValueB = mapping.mapCurrent[mapYB][mapX];
            if(typeof mapValue==='object' && typeof mapValueB==='object')
                return mapValue;
            if(Math.floor(mapValue)===Math.floor(mapValueB))
                return mapValue;
            break;
        case 'up':
            var posX = (obj.x) / mapping.caseWidth;
            var mapX = Math.floor(posX);
            var posXB = (obj.x+obj.w) / mapping.caseWidth;
            var mapXB = Math.floor(posXB);
            var posY = (obj.y-1) / mapping.caseHeight; // up
            var mapY = Math.floor(posY);
            var mapValue = mapping.mapCurrent[mapY][mapX];
            var mapValueB = mapping.mapCurrent[mapY][mapXB];
            if(typeof mapValue==='object' && typeof mapValueB==='object')
                return mapValue;
            if(Math.floor(mapValue)===Math.floor(mapValueB))
                return mapValue;
            break;
        case 'down':
            var posX = (obj.x) / mapping.caseWidth;
            var mapX = Math.floor(posX);
            var posXB = (obj.x+obj.w) / mapping.caseWidth;
            var mapXB = Math.floor(posXB);
            var posY = (obj.y+obj.h+1) / mapping.caseHeight; // down
            var mapY = Math.floor(posY);
            var mapValue = mapping.mapCurrent[mapY][mapX];
            var mapValueB = mapping.mapCurrent[mapY][mapXB];
            if(typeof mapValue==='object' && typeof mapValueB==='object')
                return mapValue;
            if(Math.floor(mapValue)===Math.floor(mapValueB))
                return mapValue;
            break;
    }
    return false;
}