/// <reference path="webgl.d.ts" />

var texture;
var speed = 0.05;

let Jake = class {
    constructor(gl, position, dimension) {
        this.picture = 'sky.jpg';
        this.position = position;
        this.dimension = dimension;
        this.maxdist=0;
        this.moveflag=false;
        this.hitimpact = false;
        this.hitdist = 0;
        this.lane = 0;
        this.dead = false;
        this.speed=[0,speed,0];
        this.jake = new Cube(gl,position,dimension,this.picture);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        this.jake.draw(gl,projectionMatrix,programInfo,deltaTime);
    }

    tick(){
        if(this.position[2]-this.dimension[2]/2>ground)
            this.speed[2]+=gravity;

        this.position[0]+=this.speed[0];
        this.position[1]+=this.speed[1];
        this.position[2]+=this.speed[2];

        if(this.moveflag)
        {
            this.maxdist+=this.speed[0];
            if(this.maxdist>=0.5 || this.maxdist<=-0.5)
            {
                this.lane = this.lane + ((this.maxdist>=0.5)?1:-1);
                this.maxdist=0;
                this.moveflag=false;
                this.speed[0]=0;
            }
        }
        if(this.hitimpact)
        {
            this.hitdist+=this.speed[1];
            if(this.hitdist > 2)
            {
                this.hitdist =0;
                this.hitimpact = false;
                this.speed[1]+=speed/2;
            }
        }

        if(this.position[2]-this.dimension[2]/2 < ground)
        {
            this.position[2]=ground+this.dimension[2]/2;
            this.speed[2]=0;
        }
    }
    move_left(){
        if(!this.dead){
            this.speed[0]= -0.1;
            this.moveflag=true;
        }
    }
    move_right(){
        if(!this.dead){
            this.speed[0]= +0.1;
            this.moveflag=true;
        }
    }
    jump(){
        if(!this.dead){
            if(this.position[2]-this.dimension[2]/2 <= ground)
            this.speed[2]=0.1;
        }
    }
    slowdown(){
        this.speed[1]-=speed/2;
        if(this.speed[1]==0)
            this.dead = true;
        this.hitimpact = true;
        this.position[0]= 0.5*this.lane;
        this.speed[0]=0;
        this.maxdist = 0;
        this.moveflag = false;
    }
    dead(){
        this.dead= true;
        this.speed[1]=0;
    }
    duck(){
    }
};

