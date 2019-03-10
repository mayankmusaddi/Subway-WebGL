/// <reference path="webgl.d.ts" />

let Obstacle = class {
    constructor(gl, lane,dist,type) {
        this.type = type;
        if(type == 1)
        {
            this.dimension = [0.7,0.2,0.2];
            this.position = [lane,dist,this.dimension[2]/2];
            this.picture = './textures/log.jpg';
            this.log = new Cube(gl,this.position,this.dimension, this.picture);
        }
        else
        {
            this.dimension = [0.1,0.1,0.8];
            this.position = [lane,dist,this.dimension[2]/2];
            this.stoppic = './textures/stop.jpg';
            this.rodpic = './textures/steel.jpg';
            this.stop = new Cube(gl,[this.position[0],this.position[1],this.position[2]+this.dimension[2]/3],[this.dimension[0]*3,this.dimension[1]*3,this.dimension[2]/3],this.stoppic);
            this.rod = new Cube(gl,[this.position[0],this.position[1],this.position[2]-this.dimension[2]/6],[this.dimension[0],this.dimension[1],2*this.dimension[2]/3],this.rodpic);
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
            if(this.type==1)
            this.log.draw(gl,projectionMatrix,programInfo,deltaTime);
            else
            { 
                this.stop.draw(gl,projectionMatrix,programInfo,deltaTime);
                this.rod.draw(gl,projectionMatrix,programInfo,deltaTime);
            }
    }
};

