/// <reference path="webgl.d.ts" />

let RoadBlock = class {
    constructor(gl, lane,dist,type) {
        this.dimension = [0.7,0.1,0.4];
        this.position = [lane,dist,0.25*type];
        this.picture = './textures/roadblock.jpg';
        this.block = new Cube(gl,this.position,this.dimension, this.picture);
        this.leg1 = new Cube(gl,[this.position[0]-(2*this.dimension[0])/5,this.position[1],this.position[2]-this.dimension[2]],[this.dimension[0]/5,this.dimension[1],this.dimension[2]],'./textures/steel.jpg');
        this.leg2 = new Cube(gl,[this.position[0]+(2*this.dimension[0])/5,this.position[1],this.position[2]-this.dimension[2]],[this.dimension[0]/5,this.dimension[1],this.dimension[2]],'./textures/steel.jpg');
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            this.block.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.leg1.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.leg2.draw(gl,projectionMatrix,programInfo,deltaTime);            
    }
};

