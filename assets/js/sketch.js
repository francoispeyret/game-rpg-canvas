var debug = false;

var ui = {};
var inventory;
var mapping = {};
var mapHeight = 12;
var mapWidth = 12;
var mapPositionX = '#1';
var mapPositionY = '#1';
var entites = [];
var particules = [];
var entiteIdGlobal = 0;
var loading = true;

// images
var grass, ground, tree, rock, bobimage, gold;

// chargement des assets
function preload() {

    grass = loadImage("assets/images/grass.png");
    ground = loadImage("assets/images/ground.png");
    tree = loadImage("assets/images/tree.png");
    rock = loadImage("assets/images/rock.png");
    gold = loadImage("assets/images/gold.png");
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

    inventory = new Inventory();

    for(var e = 0; e < mapping.entites['#1']['#1'].length; e++) {
		var entiteName = mapping.entites['#1']['#1'][e][0];
		var entiteX = mapping.entites['#1']['#1'][e][1];
		var entiteY = mapping.entites['#1']['#1'][e][2];
		var entiteMapX = '#1';
		var entiteMapY = '#1';
		entites.push(new Bob(entiteName,entiteX,entiteY,entiteMapX,entiteMapY));
    }

    entites.push(
        new Loot('gold',
                    Math.floor(random(10,30)),
                    Math.floor(random(200,300)),
                    Math.floor(random(100,500)),'#1','#1'));
    entites.push(
        new Loot('gold',
                    Math.floor(random(10,30)),
                    Math.floor(random(200,300)),
                    Math.floor(random(100,500)),'#1','#1'));
    entites.push(
        new Loot('gold',
                    Math.floor(random(10,30)),
                    Math.floor(random(200,300)),
                    Math.floor(random(100,500)),'#1','#1'));

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
    entites.sort(sortByY);
    entites.sort(sortByZindex);

    for(var i=0;i<particules.length;i++) {
        particules[i].update();
        particules[i].display();
    }
    for(var i=0; i<particules.length; i++) {
        if(particules[i].vie <= 0) {
            var index = particules.indexOf(particules[i]);
            particules.splice(index, 1);
            continue;
        }
    }
    for(var i=0;i<entites.length;i++) {
        if(entites[i].vie>0 || entites[i].object==true) {
            if(entites[i].name=='joueur') {
				entites[i].update();
                entites[i].display();
            } else {
                if(entites[i].mapX==mapPositionX && entites[i].mapY==mapPositionY) {
					entites[i].update();
                    entites[i].display();
                }
            }
        }
    }
    for(var i=0; i<entites.length; i++) {
        if(entites[i].capturer == true) {
            var index = entites.indexOf(entites[i]);
            entites.splice(index, 1);
            continue;
        }
        if(entites[i].vie <= 0) {
            var index = entites.indexOf(entites[i]);
            entites.splice(index, 1);
            continue;
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
