/// <reference path="webgl.d.ts" />

var texture;

let Train = class {
    constructor(gl, position, dimension) {
        this.position = position;
        this.dimension = dimension;
        this.backpic = 'trainback.jpg';
        this.sidepic = 'trainside.jpg';
        this.toppic = 'trainside.jpg';
        var width = dimension[0];
        var breadth = dimension[1];
        var height = dimension[2];

        this.back  = new Cube(gl, [this.position[0],this.position[1]-breadth/2,this.position[2]], [ width, 0 , height], this.backpic);
        this.side1 = new Cube(gl, [this.position[0]+width/2,this.position[1],this.position[2]],[0, breadth, height], this.sidepic);
        this.side2 = new Cube(gl, [this.position[0]-width/2,this.position[1],this.position[2]],[0, breadth, height], this.sidepic);
        this.top = new Cube(gl, [this.position[0],this.position[1],this.position[2]+height/2],[width, breadth, 0], this.sidepic);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            this.back.draw(gl,projectionMatrix,programInfo,deltaTime);
            this.side1.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.side2.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.top.draw(gl,projectionMatrix,programInfo,deltaTime);            
    }

    tick(){
    }
};

