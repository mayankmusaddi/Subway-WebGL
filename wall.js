/// <reference path="webgl.d.ts" />

var texture;

let Wall = class {
    constructor(gl, xpos,height, len) {
        this.picture = 'wall.png';
        this.position = [xpos,0,height/2];
        this.dimension = [0,3.5,height];
        this.walls=[];
        this.len = len;
        var length = this.dimension[1];
        for(var i=-1;i<this.len;i++)
        {
            let t = new Walltexture(gl, [xpos,i*length,height/2 - 1],this.dimension,this.picture);
            this.walls.push(t);
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        for(var i=0;i<this.len;i++){
            this.walls[i].draw(gl,projectionMatrix,programInfo,deltaTime);
        }
    }

    tick(){
    }
};

