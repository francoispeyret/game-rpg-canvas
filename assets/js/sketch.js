var bob = {};
var mapping = {};
var entites = [];
var entiteIdGlobal = 0;
var mapCurrentId = 2.1;
var loading = true;
var grass, tree, rock, bobimage;

// chargement des assets
function preload() {

    grass = loadImage("assets/images/grass.png");
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

    mapping = new MapGenerator();
    mapping.changeMap();
    bob = new Bob('joueur',75,155);
    entites.push(bob);
    //entites.push(new Bob('mechant',140,75));

    var x = mapping.mapCurrent[[0]].length * mapping.caseWidth;
    var y = mapping.mapCurrent.length * mapping.caseHeight;
    createCanvas(x,y);
    frameRate(60);
    loading = false;

}

function draw() {
    background(255,0,0);
    mapping.display();
    entites.sort(sortForDisplay);

    var i = 0;
    for(i=0;i<entites.length;i++) {
        if(entites[i].vie>0) {
            entites[i].display();
            entites[i].update();
        } else {
            var index = entites.indexOf(entites[i]);
            entites.splice(index, 1);
        }
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

function keyReleased() {
    if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
        bob.marcheStatus=false;
    }
}

function keyPressed() {
    if (keyCode == 32) // barre espace
        bob.attack();
}


// detection des obstacles ou des interection avec la map et les entites
function detectPos (o,d) {
    var resultMap = detectMap(o,d);
    var resultEntites = detectEntite(o,d);

    if(resultMap===2 && resultEntites===true) {
        return true;
    } else if (resultMap > 2 && resultMap < 3 && resultEntites===true) {
        mapping.changeMap(resultMap,mapCurrentId,d);
        loading = false;
        return false;
    } else {
        bob.marcheStatus=false;
        return false;
    }
}

// detection des entietes selont la direction et la distance
function detectEntite(obj,direction,distance) {
    if(distance===undefined)
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

// detection des elements de la map : retourne la valeur de la case pour identifié l'action donné
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
            if(mapValue===mapValueB)
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
            if(mapValue===mapValueB)
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
            if(mapValue===mapValueB)
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
            if(mapValue===mapValueB)
                return mapValue;
            break;
    }
}