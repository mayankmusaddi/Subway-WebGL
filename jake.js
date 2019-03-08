/// <reference path="webgl.d.ts" />

var speed = 0.05;

let Jake = class {
    constructor(gl, lane, dist) {
        this.picture = 'sky.jpg';
        this.dimension = [0.15,0.1,0.25];
        this.position = [lane,dist,this.dimension[2]/2];
        this.maxdist=0;
        this.gstate=false;
        this.moveflag=false;
        this.hitimpact = false;
        this.hitdist = 0;
        this.rise = false;
        this.distpo=0;
        this.jumppo=false;
        this.jumpvelocity = 0.1;
        this.lane = 0;
        this.dead = false;
        this.speed=[0,speed,0];
        this.jake = new Cube(gl,this.position,this.dimension,this.picture);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        this.jake.draw(gl,projectionMatrix,programInfo,deltaTime);
    }

    tick(){
        this.gstate = true;

        //normal movement
        this.position[0]+=this.speed[0];
        this.position[1]+=this.speed[1];
        this.position[2]+=this.speed[2];

        //transition effect
        if(this.moveflag)
        {
            this.maxdist+=this.speed[0];
            if(this.maxdist>=1 || this.maxdist<=-1)
            {
                this.lane = this.lane + ((this.maxdist>=1)?1:-1);
                this.position[0] = this.lane;
                this.maxdist=0;
                this.moveflag=false;
                this.speed[0]=0;
            }
        }
        //slowdown effect
        if(this.hitimpact)
        {
            this.hitdist+=this.speed[1];
            if(this.hitdist > 6)
            {
                this.hitdist =0;
                this.hitimpact = false;
                this.speed[1]+=speed/2;
            }
        }
        //jet effect
        if(this.rise){
            this.gstate = false;
            this.position[2]+=0.1;
            this.distpo+=0.05;
            if(this.distpo > 20)
            {
                this.distpo=0;
                this.rise = false;
                this.gstate = true;
            }
            if(this.position[2]>2)
                this.position[2]=2;
        }
        //jump effect
        if(this.jumppo){
            this.jumpvelocity=0.15;
            this.distpo+=0.05;
            if(this.distpo > 20)
            {
                this.distpo=0;
                this.jumppo=false;
                this.jumpvelocity=0.1;
            }
        }

        //gravity effect
        if(this.gstate && (this.position[2]-this.dimension[2]/2>ground))
            this.speed[2]+=gravity;

        //ensure player above ground
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
            this.speed[2]=this.jumpvelocity;
        }
    }
    slowdown(){
        police.chase();
        this.speed[1]-=speed/2;
        if(this.speed[1]==0)
            this.dead = true;
        this.hitimpact = true;
        this.position[0]= 1*this.lane;
        this.speed[0]=0;
        this.maxdist = 0;
        this.moveflag = false;
    }
    hasDied(){
        this.dead= true;
        this.speed[1]=0;
    }
    hasJump(){
        this.distpo=0;
        this.jumppo=true;
    }
    hasJet(){
        this.distpo=0;
        this.rise = true;
    }
    duck(){
    }
};