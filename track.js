/// <reference path="webgl.d.ts" />

var texture;

let Track = class {
    constructor(gl, xpos,width) {
        this.picture = 'track.jpg';
        this.tracks=[];
        var length = 3.5;
        for(var i=-1;i<50;i++)
        {
            let t = new Cube(gl, [xpos,i*length,0],[width,3.5,0],this.picture);
            this.tracks.push(t);
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        for(var i=0;i<50;i++){
            this.tracks[i].draw(gl,projectionMatrix,programInfo,deltaTime);
        }
    }

    tick(){
    }
};

