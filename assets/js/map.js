
function MapGenerator() {

    this.caseWidth  = 50;
    this.caseHeight  = 50;

    this.mapCurrent = [];

    this.entites = [
        [

        ],[
            ['mechant',140,116],
        ],[
            ['mechant',140,76],
            ['mechant2',240,60],
        ], [
            ['mechant3',440,170],
        ], [

        ], [

        ]
    ];

    this.maps = [
        [

    ],[
        [1,1,1,1,2.5,1,1,1,1,1,1,1,1],
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
        [1,2,2,2,2,4,4,4,2,2,2,2,1],
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
    ],[],[
        [1,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,2,2,2,4,4,4,4,2,2,2,1,0],
        [1,2,2,2,4,4,4,4,2,2,2,1,0],
        [1,2,2,2,2,2,2,2,2,2,2,1,0],
        [1,2,2,2,2,2,2,2,2,2,2,1,0],
        [1,2,1,2,2,2,2,2,2,2,2,1,0],
        [1,2,1,2,2,1,2,2,2,2,2,1,0],
        [1,2,2,2,2,1,1,2,2,2,2,1,0],
        [1,2,2,2,2,1,1,1,1,2,2,1,0],
        [1,2,2,2,2,1,0,0,1,2,2,1,0],
        [1,2,2,2,2,1,0,0,1,2,2,1,0],
        [1,1,1,1,2.1,1,0,0,1,1,1,1,0]
    ],
    ];


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
                        image(tree, j*this.caseWidth,i*this.caseHeight);
                        break;
                    case 2:
                       // fill(95,77,54);
                       // rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        image(grass, j*this.caseWidth,i*this.caseHeight);
                        break;
                    case 4:
                        //fill(40);
                        //rect(j*this.caseWidth,i*this.caseHeight,this.caseWidth,this.caseHeight);
                        image(rock, j*this.caseWidth,i*this.caseHeight);
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

    this.loadEntites = function (idMapToLoad) {
        if (typeof idMapToLoad === 'undefined') {
            idMapToLoad = 1;
        }
        entites = [];
        for(i=0;i<this.entites[idMapToLoad].length;i++) {
            //for(e=0;e<this.entites[i].length;e++) {
                if(this.entites[idMapToLoad][i]) {
                    entites.push(
                        new Bob(
                            this.entites[idMapToLoad][i][0],
                            this.entites[idMapToLoad][i][1],
                            this.entites[idMapToLoad][i][2]
                        )
                    );
                }
            //}
        }
        console.log(entites);
    };

    this.changeMap = function (id,oldId,direction) {
        if (typeof id === 'undefined') {
            id = 2.1;
            oldId = 2.1;
        }
        loading = true;
        var int = id;
        var float = Math.floor(id);
        var newId = Math.floor((int - float)*10);
        this.mapCurrent = [];
        this.mapCurrent = this.maps[[newId]];
        this.loadEntites(newId);

        for (i=0;i < this.mapCurrent.length; i++) {
            for (j=0; j < this.mapCurrent[i].length; j++) {
                if(this.mapCurrent[i][j] == oldId) {
                    var x = j;
                    var xOffset = 0;
                    var y = i;
                    var yOffset = 0;
                    switch (direction) {
                        case 'left':
                            x=j-1;
                            xOffset=30;
                            yOffset=12;
                            break;
                        case 'right':
                            x=j+1;
                            yOffset=12;
                            break;
                        case 'up':
                            y=i-1;
                            xOffset=12;
                            yOffset=30;
                            break;
                        case 'down':
                            y=i+1;
                            xOffset=12;
                            break;
                        default:
                            yOffset=12;
                            xOffset=12;
                            break;
                    }
                    bob.x = x*map.caseWidth+xOffset;
                    bob.y = y*map.caseHeight+yOffset;
                }
            }
        }
        mapCurrentId = int;
    };
}




