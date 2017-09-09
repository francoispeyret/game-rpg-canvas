
function MapGenerator() {

    this.caseWidth  = 50;
    this.caseHeight  = 50;

    this.mapCurrent = [];

    this.maps = [[],[
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,4,2.4,4,4,2,2,2,1,1,1],
        [1,2,2,4,4,4,4,2,2,2,2,2,1],
        [1,2,2,4,4,4,4,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2.2],
        [1,2,2,2,2,4,4,4,4,4,2,2,1],
        [1,2,2,2,2,4,4,4,4,4,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],[
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,2,2,2,4,4,4,2,2,2,2,1],
        [1,1,2,2,2,4,4,4,2,2,2,2,1],
        [1,2,2,2,2,4,4,4,2,2,2,2,1],
        [1,2,2,2,2,4,4,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,1],
        [2.1,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,1,2,2,2,1],
        [1,2,2,2,2,1,1,1,1,2,2,2,1],
        [1,2,2,2,2,1,0,0,1,2,2,2,1],
        [1,1,1,1,1,1,0,0,1,1,1,1,1]
    ],[
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,4,4,2.1,4,4,4,4,4,4,4,0,0],
        [0,4,2,2,2,4,2,2,2,2,4,0,0],
        [0,4,2,2,2,2,2,2,2,2,4,0,0],
        [0,4,2,2,2,4,2,2,2,2,4,0,0],
        [0,4,4,4,4,4,4,4,4,4,4,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]];


    this.display = function () {
        noStroke();
        //stroke(30);
        for (i=0;i < this.mapCurrent.length; i++) {
            for (j=0; j < this.mapCurrent[i].length; j++) {
                fill(255);
                switch(this.mapCurrent[i][j]) {
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

    this.changeMap = function (id,oldId,direction) {
        loading = true;
        var int = id;
        var float = Math.floor(id);
        var newId = Math.floor((int - float)*10);
        this.mapCurrent = [];
        this.mapCurrent = this.maps[[newId]];

        for (i=0;i < this.mapCurrent.length; i++) {
            for (j=0; j < this.mapCurrent[i].length; j++) {
                if(this.mapCurrent[i][j] == oldId) {
                    var x = j;
                    var y = i;
                    switch (direction) {
                        case 'left':
                            x=j-1;
                            break;
                        case 'right':
                            x=j+1;
                            break;
                        case 'up':
                            y=i-1;
                            break;
                        case 'down':
                            y=i+1;
                            break;
                    }
                    bob.x = x*map.caseWidth+10;
                    bob.y = y*map.caseHeight+10;
                }
            }
        }
        mapCurrentId = int;
    }
}




