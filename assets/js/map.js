
function MapGenerator() {

    this.caseWidth  = 45;
    this.caseHeight  = 45;

    this.mapCurrent = [];

    this.entites = {
		'#1': {
			'#1': [
			    ['mechant',45,45],
			    ['mechant2',150,150],
            ],
		},
	};

    this.maps = {
        '#1': {
            '#1': [],
        },
    };


    this.display = function () {
        noStroke();
        for (i=0;i < this.mapCurrent.length; i++) {
            for (j=0; j < this.mapCurrent[i].length; j++) {
                fill(255);
                switch(this.mapCurrent[i][j]) {
                    case 1:
                        fill(30,64,23);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        image(tree, j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    case 2:
                        image(grass, j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    case 2.1:
                        image(ground, j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    case 3:
                        image(rock, j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    default:
                        fill(20);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                }

                if(debug) {
                    fill(255,0,0);
                    textSize(14);
                    text(this.mapCurrent[i][j], j*this.caseWidth+10,(i*this.caseHeight)+23);
                }

            }
        }

    };

    this.loadEntites = function (idMapToLoad) {
        if (typeof idMapToLoad === 'undefined') {
            idMapToLoad = 1;
        }
        for(i=entites.length-1;i>=0;i--) {
            if(entites[i].name!='joueur') {
                var index = entites.indexOf(entites[i]);
                entites.splice(index, 1);
            }
        }
        for(i=0;i<this.entites[idMapToLoad].length;i++) {
            if(this.entites[idMapToLoad][i]) {
                entites.push(
                    new Bob(
                        this.entites[idMapToLoad][i][0],
                        this.entites[idMapToLoad][i][1],
                        this.entites[idMapToLoad][i][2]
                    )
                );
            }
        }
    };

    this.createMap = function(y,x) {

        if (typeof x === 'undefined') {
            var x = mapPositionX;
            var y = mapPositionY;
        }

        var mapG = [];
        // generation du tableau
        for(a=0;a<=mapHeight;a++) {
            mapG[a] = [];
            for(b=0;b<=mapWidth;b++) {
                if(a==0 || a==mapHeight || b==0 || b==mapWidth) {
                    // generation des sorties
                    if(a==Math.floor(mapHeight/2) && b==0) {
                        mapG[a][b]=[y,'#' + (parseInt(x.substr(1,x.length))-1)];
                    } else if (a==Math.floor(mapHeight/2) && b==mapWidth) {
                        mapG[a][b]=[y,'#' + (parseInt(x.substr(1,x.length))+1)];
                    } else if (a==0 && b==Math.floor(mapWidth/2)) {
                        mapG[a][b]=['#' + (parseInt(y.substr(1,y.length))-1),x];
                    } else if (a==mapHeight && b==Math.floor(mapWidth/2)) {
                        mapG[a][b]=['#' + (parseInt(y.substr(1,y.length))+1),x];
                    } else {
                        // si n'est pas une sortie c'est un buisson
                        mapG[a][b]=1;
                    }
                } else {
                    // si on n'est pas le contour alors creation d'un gazon
                    mapG[a][b]=2;
                }
            }
        }

        // a la creation de la premiere map, si bob n'est pas défini alors on le place aléatoirement dans la map généré
        if(typeof bob === 'undefined') {
            var joueurX = Math.floor(random(2,mapWidth-2));
            var joueurY = Math.floor(random(2,mapHeight-2));
            bob = new Bob('joueur',joueurX*30,joueurY*30);
            entites.push(bob);
            mapG[joueurY][joueurX] = 2.1;
        }

        // sol en terre
        var housePosX = Math.floor(random(2,mapWidth-2));
        var housePosY = Math.floor(random(2,mapHeight-2));
        mapG[housePosY][housePosX] = 2.1;
        mapG[housePosY+1][housePosX+1] = 2.1;
        mapG[housePosY][housePosX+1] = 2.1;
        mapG[housePosY+1][housePosX] = 2.1;

        // bloc de pierre
        mapG[Math.floor(random(2,mapHeight-2))][Math.floor(random(2,mapWidth-2))] = 3;

        // ajout d'entites
        var rand = random(1,4);
		for(var e = 0; e < rand; e++) {
			var entiteName =    'mechant';
			var entiteX =       random(40,mapWidth*30-40);
			var entiteY =       random(40,mapHeight*30-40);
			var entiteMapX =    x;
			var entiteMapY =    y;
			entites.push(new Bob(entiteName,entiteX,entiteY,entiteMapX,entiteMapY));
		}

        if(typeof this.maps[y] == 'undefined')
            this.maps[y] = {};
        this.maps[y][x] = mapG;

    };

    this.changeMap = function (y, x, oldY, oldX, direction) {
        loading = true;
        if (typeof x === 'undefined') {
            x = mapPositionX;
            y = mapPositionY;
            oldY = '#1';
            oldX = '#1';
        }

        if (typeof this.maps[y] === 'undefined' ||
            typeof this.maps[y][x] === 'undefined' ||
            this.maps[y][x].length == 0 ||
            this.maps[y].length == 0) {

            this.createMap(y,x);
        }

        this.mapCurrent = this.maps[y][x];

        mapPositionX = x;
        mapPositionY = y;

        // déplacement de bob dans la bonne entrée
        for (i=0;i < this.mapCurrent.length; i++) {
            for (j=0; j < this.mapCurrent[i].length; j++) {
                if(arraysIdentical(this.mapCurrent[i][j],[oldY,oldX])) {
                    var x = j;
                    var xOffset = 0;
                    var y = i;
                    var yOffset = 0;
                    switch (direction) {
                        case 'left':
                            x=j-1;
                            xOffset=30;
                            yOffset=8;
                            break;
                        case 'right':
                            x=j+1;
                            yOffset=8;
                            break;
                        case 'up':
                            y=i-1;
                            xOffset=8;
                            yOffset=30;
                            break;
                        case 'down':
                            y=i+1;
                            xOffset=8;
                            break;
                        default:
                            yOffset=8;
                            xOffset=8;
                            break;
                    }
                    bob.x = x*mapping.caseWidth+xOffset;
                    bob.y = y*mapping.caseHeight+yOffset;
                }
            }
        }
    };
}
