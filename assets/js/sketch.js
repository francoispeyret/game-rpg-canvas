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
var environemment, bobimageSprite, gold;

// chargement des assets
function preload() {
    environemment = loadImage("assets/images/environnement.png");
    gold = loadImage("assets/images/gold.png");
    // sprite du joueur
    bobimageSprite = loadImage("assets/images/bob.png");

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
        if(particules[i].life <= 0) {
            particules.splice(i,1);
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
