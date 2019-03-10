/// <reference path="webgl.d.ts" />

var speed = 0.05;
var audio;

let Jake = class {
    constructor(gl, lane, dist) {
        this.dimension = [0.3,0.2,0.5];
        this.position = [lane,dist,this.dimension[2]/2];
        this.maxdist=0;
        this.gstate=false;
        this.moveflag=false;
        this.hitimpact = false;
        this.hitdist = 0;
        this.rise = false;
        this.distpo=0;
        this.jumppo=false;
        this.magnetpo=false;
        this.duckdist=0;
        this.duckpo=false;
        this.jumpvelocity = 0.1;
        this.lane = 0;
        this.dead = false;
        this.speed=[0,speed,0];

        this.headpic = './textures/head.jpg'; 
        this.bodypic = './textures/shirt.jpg';
        this.handpic = './textures/white.jpg';
        this.legpic = './textures/jeans.jpeg';

        this.body =  new Cube(gl,[this.position[0],this.position[1],this.position[2]+this.dimension[2]/7],                        [3*this.dimension[0]/5,this.dimension[1],3*this.dimension[2]/7],this.bodypic);
        this.head =  new Cube(gl,[this.position[0],this.position[1],this.position[2]+(3*this.dimension[2])/7],                    [this.dimension[0]/5,this.dimension[1]/2,this.dimension[2]/7],this.headpic);
        this.hand1 = new Cube(gl,[this.position[0]-(2*this.dimension[0])/5,this.position[1],this.position[2]+this.dimension[2]/7],[this.dimension[0]/10,this.dimension[1]/2,3*this.dimension[2]/7],this.handpic);
        this.hand2 = new Cube(gl,[this.position[0]+(2*this.dimension[0])/5,this.position[1],this.position[2]+this.dimension[2]/7],[this.dimension[0]/10,this.dimension[1]/2,3*this.dimension[2]/7],this.handpic);
        this.leg1 =  new Cube(gl,[this.position[0]-this.dimension[0]/5,this.position[1],this.position[2]-(2*this.dimension[2])/7],[this.dimension[0]/5,this.dimension[1]/2,3*this.dimension[2]/7],this.legpic);
        this.leg2 =  new Cube(gl,[this.position[0]+this.dimension[0]/5,this.position[1],this.position[2]-(2*this.dimension[2])/7],[this.dimension[0]/5,this.dimension[1]/2,3*this.dimension[2]/7],this.legpic);

    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        this.body.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.head.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.hand1.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.hand2.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.leg1.draw(gl,projectionMatrix,programInfo,deltaTime);
        this.leg2.draw(gl,projectionMatrix,programInfo,deltaTime);
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
            if(this.distpo > 15)
            {
                audio = new Audio('./sound/hurrah_fall.wav');
                audio.play();
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
            if(this.distpo > 15)
            {
                this.distpo=0;
                this.jumppo=false;
                this.jumpvelocity=0.12;
            }
        }
        //magnet effect
        if(this.magnetpo){
            this.distpo+=0.05;
            if(this.distpo > 20)
            {
                this.distpo=0;
                this.magnetpo=false;
            }
        }
        //duck effect
        if(this.duckpo){
            this.duckdist+=0.05;
            this.dimension = [0.3,0.2,0.25];
            if(this.duckdist > 2)
            {
                this.duckdist=0;
                this.duckpo=false;
                this.dimension = [0.3,0.2,0.5];
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

        this.positionChange();
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
        audio = new Audio('./sound/player_hurt_2.wav');
        audio.play();
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
        police.chase();
        this.dead= true;
        this.speed[1]=0;
        document.getElementById('status').innerText = "Player Died! Game Over";
        audio = new Audio('./sound/resurrect.wav');
        audio.play();
    }
    hasJump(){
        this.distpo=0;
        this.jumppo=true;
    }
    hasJet(){
        audio = new Audio('./sound/hurrah_fall.wav');
        audio.play();
        this.distpo=0;
        this.rise = true;
    }
    hasMagnet(){
        this.distpo=0;
        this.magnetpo = true;
    }
    duck(){
        this.distpo=0;
        this.duckpo=true;
    }
};