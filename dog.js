/// <reference path="webgl.d.ts" />

var speed = 0.1;

let Dog = class {
    constructor(gl, lane,dist) {
        this.dimension = [0.4,0.3,0.6];

        this.position =[lane,dist,this.dimension[2]/2];

        this.bodypic = 'police.jpg';
        this.headpic = 'head.jpg'; 
        this.tailpic = 'pant.jpg';

        this.body =  new Cube(gl,this.position,this.dimension,this.bodypic);
        this.head =  new Cube(gl,[this.position[0],this.position[1]+this.pos,this.position[2]+(3*this.dimension[2])/7],                    [this.dimension[0]/5,this.dimension[1]/2,this.dimension[2]/7],this.headpic);
        this.tail =  new Cube(gl,[this.position[0]+this.dimension[0]/5,this.position[1],this.position[2]-(2*this.dimension[2])/7],[this.dimension[0]/5,this.dimension[1]/2,3*this.dimension[2]/7],this.legpic);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        this.body.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.head.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.tail.draw(gl,projectionMatrix,programInfo,deltaTime);
    }

    positionChange()
    {
        this.body.position=[this.position[0],this.position[1],this.position[2]+this.dimension[2]/7];
        this.head.position=[this.position[0],this.position[1],this.position[2]+(3*this.dimension[2])/7];                    
        this.hand1.position=[this.position[0]-(2*this.dimension[0])/5,this.position[1],this.position[2]+this.dimension[2]/7];
        this.hand2.position=[this.position[0]+(2*this.dimension[0])/5,this.position[1],this.position[2]+this.dimension[2]/7];
        this.leg1.position=[this.position[0]-this.dimension[0]/5,this.position[1],this.position[2]-(2*this.dimension[2])/7];
        this.leg2.position=[this.position[0]+this.dimension[0]/5,this.position[1],this.position[2]-(2*this.dimension[2])/7];

        this.hand1.rotationx+=0.1;
        this.hand2.rotationx-=0.1;
        this.leg1.rotationx+=0.1;
        this.leg2.rotationx-=0.1;
    }


    tick(){
    }
};