var map = '';

function MapGenerator() {

    this.caseWidth  = 40;
    this.caseHeight  = 40;

    this.map1 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,4,4,4,4,2,2,2,1,1,1],
        [1,2,2,4,4,4,4,2,2,2,2,2,1],
        [1,2,2,4,4,4,4,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2.2],
        [1,2,2,2,2,4,4,4,4,4,2,2,1],
        [1,2,2,2,2,4,4,4,4,4,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    this.display = function () {
        noStroke();
        //stroke(30);
        for (i=0;i < this.map1.length; i++) {
            for (j=0; j < this.map1[i].length; j++) {
                fill(255);
                switch(this.map1[i][j]) {
                    case 1:
                        fill(30,64,23);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    case 2:
                        fill(95,77,54);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    case 4:
                        fill(40);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                    // spawn entite
                    /*case 4:
                        if(first==true) {
                            var entite = new Blob('entite'+i+''+j, j*this.caseWidth+12.5,i*this.caseHeight+12.5);
                            entites.push(entite);
                        }
                        fill(70);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        break;
                        */
                    default:
                        fill(0);
                        rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                }

            }
        }

    };
}


function detectWall(obj,direction) {
    switch (direction) {
        case 'left':
            var posX = (obj.x-1) / map.caseWidth; // left
            var mapX = Math.floor(posX);
            var posY = (obj.y) / map.caseHeight;
            var posYB = (obj.y+obj.h) / map.caseHeight;
            var mapY = Math.floor(posY);
            var mapYB = Math.floor(posYB);
            var mapValue = Math.floor(map.map1[mapY][mapX]);
            var mapValueB = Math.floor(map.map1[mapYB][mapX]);
            if(mapValue==2 && mapValueB==2)
                return true;
            break;
        case 'right':
            var posX = (obj.x+obj.w+1) / map.caseWidth; // right
            var mapX = Math.floor(posX);
            var posY = (obj.y) / map.caseHeight;
            var posYB = (obj.y+obj.h) / map.caseHeight;
            var mapY = Math.floor(posY);
            var mapYB = Math.floor(posYB);
            var mapValue = Math.floor(map.map1[mapY][mapX]);
            var mapValueB = Math.floor(map.map1[mapYB][mapX]);
            if(mapValue==2 && mapValueB==2)
                return true;
            break;
        case 'up':
            var posX = (obj.x) / map.caseWidth;
            var mapX = Math.floor(posX);
            var posXB = (obj.x+obj.w) / map.caseWidth;
            var mapXB = Math.floor(posXB);
            var posY = (obj.y-1) / map.caseHeight; // up
            var mapY = Math.floor(posY);
            var mapValue = Math.floor(map.map1[mapY][mapX]);
            var mapValueB = Math.floor(map.map1[mapY][mapXB]);
            if(mapValue==2 && mapValueB==2)
                return true;
            break;
        case 'down':
            var posX = (obj.x) / map.caseWidth;
            var mapX = Math.floor(posX);
            var posXB = (obj.x+obj.w) / map.caseWidth;
            var mapXB = Math.floor(posXB);
            var posY = (obj.y+obj.h+1) / map.caseHeight; // down
            var mapY = Math.floor(posY);
            var mapValue = Math.floor(map.map1[mapY][mapX]);
            var mapValueB =Math.floor( map.map1[mapY][mapXB]);
            if(mapValue==2 && mapValueB==2)
                return true;
            break;
        default:
            return false;
    }
}

