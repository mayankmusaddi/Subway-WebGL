/// <reference path="webgl.d.ts" />

let Train = class {
    constructor(gl, lane, dist) {
        this.dimension = [0.8,7,1];
        this.position = [lane,dist,this.dimension[2]/2];
        this.backpic = 'front.jpg';
        this.sidepic = 'side.jpg';
        this.toppic = 'top.jpg';
        var width = this.dimension[0];
        var breadth = this.dimension[1];
        var height = this.dimension[2];

        this.back  = new Cube(gl, [this.position[0],this.position[1]-breadth/2,this.position[2]], [ width, 0 , height], this.backpic);
        this.side1 = new Cube(gl, [this.position[0]+width/2,this.position[1],this.position[2]],[0, breadth, height], this.sidepic);
        this.side2 = new Cube(gl, [this.position[0]-width/2,this.position[1],this.position[2]],[0, breadth, height], this.sidepic);
        this.top = new Cube(gl, [this.position[0],this.position[1],this.position[2]+height/2],[width, breadth, 0], this.toppic);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            this.back.draw(gl,projectionMatrix,programInfo,deltaTime);
            this.side1.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.side2.draw(gl,projectionMatrix,programInfo,deltaTime);            
            this.top.draw(gl,projectionMatrix,programInfo,deltaTime);            
    }

    tick(){
        this.position[1]-=0.1;
        this.back.position[1]-=0.1;
        this.side1.position[1]-=0.1;
        this.side2.position[1]-=0.1;
        this.top.position[1]-=0.1;
    }
};

