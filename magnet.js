/// <reference path="webgl.d.ts" />

let Magnet = class {
    constructor(gl, lane,dist) {
        this.dimension = [0.2,0.1,0.2];
        this.position = [lane,dist,this.dimension[2]/2];
        this.picture = './textures/top.jpg';
        this.base = new Cube(gl,[this.position[0],this.position[1],this.position[2]-this.dimension[2]/3],[this.dimension[0],this.dimension[1],this.dimension[2]/3], this.picture);
        this.pole1 = new Cube(gl,[this.position[0]-this.dimension[0]/3,this.position[1],this.position[2]+this.dimension[2]/6],[this.dimension[0]/3,this.dimension[1],2*this.dimension[2]/3], this.picture);
        this.pole2 = new Cube(gl,[this.position[0]+this.dimension[0]/3,this.position[1],this.position[2]+this.dimension[2]/6],[this.dimension[0]/3,this.dimension[1],2*this.dimension[2]/3], this.picture);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            this.base.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.pole1.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.pole2.draw(gl,projectionMatrix,programInfo,deltaTime);            
    }
};

