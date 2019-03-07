/// <reference path="webgl.d.ts" />

var texture;

let Wall = class {
    constructor(gl, xpos,height) {
        this.picture = 'brick.jpg';
        this.position = [xpos,0,height/2];
        this.dimension = [0,3.5,height];
        this.walls=[];
        var length = 3.5;
        for(var i=-1;i<100;i++)
        {
            let t = new Cube(gl, [xpos,i*length,height/2],this.dimension,this.picture);
            this.walls.push(t);
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        for(var i=0;i<100;i++){
            this.walls[i].draw(gl,projectionMatrix,programInfo,deltaTime);
        }
    }

    tick(){
    }
};

