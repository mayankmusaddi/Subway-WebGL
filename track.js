/// <reference path="webgl.d.ts" />

var texture;

let Track = class {
    constructor(gl, xpos,width,len) {
        this.picture = 'track.jpg';
        this.tracks=[];
        var length = 3.5;
        this.len = len;
        for(var i=-1;i<this.len;i++)
        {
            let t = new Cube(gl, [xpos,i*length,0],[width,length,0],this.picture);
            this.tracks.push(t);
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        for(var i=0;i<this.len;i++){
            this.tracks[i].draw(gl,projectionMatrix,programInfo,deltaTime);
        }
    }

    tick(){
    }
};

