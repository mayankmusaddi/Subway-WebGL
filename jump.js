/// <reference path="webgl.d.ts" />

let Jump = class {
    constructor(gl, lane,dist) {
        this.dimension = [0.2,0.2,0.2];
        this.position = [lane,dist,this.dimension[2]/2];
        this.picture = 'jump.jpg';
        this.sole = new Cube(gl,[this.position[0],this.position[1],this.position[2]-this.dimension[2]/4],[this.dimension[0],this.dimension[1],this.dimension[2]/2], this.picture);
        this.ankle = new Cube(gl,[this.position[0]-this.dimension[0]/4,this.position[1],this.position[2]+this.dimension[2]/4],[this.dimension[0]/2,this.dimension[1]/2,this.dimension[2]/2], this.picture);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            this.sole.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.ankle.draw(gl,projectionMatrix,programInfo,deltaTime);            
    }
};

