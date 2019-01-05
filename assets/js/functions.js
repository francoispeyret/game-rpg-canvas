
// tri pour afficher selont la position en y
function sortByY(a,b) {
    if (a.y < b.y)
        return -1;
    if (a.y > b.y)
        return 1;
    return 0;
}

// tri pour afficher selont le calque zindex (exemple : loot < bob)
function sortByZindex(a,b) {
    if (a.zindex < b.zindex)
        return -1;
    if (a.zindex > b.zindex)
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


// detection des obstacles ou des interection avec la map et les entites
function detectPos (o,d) {
    var resultMap = detectMap(o,d);
    var resultEntites = detectEntite(o,d);

    if(resultEntites instanceof Loot) {
        capturerLoot(resultEntites);
    }

    if(resultMap >= 2 && resultMap < 3  && !(resultEntites instanceof Bob)) {
        return true;
    } else if (resultMap instanceof Array && resultMap[0]=='exit') {
        mapping.changeMap(resultMap[1],resultMap[2],mapPositionY,mapPositionX,d);
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
        distance = obj.vel;
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