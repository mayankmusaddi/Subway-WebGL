/// <reference path="webgl.d.ts" />

let RoadBlock = class {
    constructor(gl, lane,dist,type) {
        this.dimension = [0.7,0.1,0.4];
        this.position = [lane,dist,0.25*type];
        this.picture = 'roadblock.jpg';
        this.block = new Cube(gl,this.position,this.dimension, this.picture);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            this.block.draw(gl,projectionMatrix,programInfo,deltaTime);            
    }
};

