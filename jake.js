/// <reference path="webgl.d.ts" />

var texture;

let Jake = class {
    constructor(gl, position, dimension) {
        this.picture = 'sky.jpg';
        this.position = position;
        this.dimension = dimension;
        this.maxdist=0;
        this.moveflag=false;
        this.speed=[0,0.05,0];
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
            if(this.maxdist==0.5 || this.maxdist==-0.5)
            {
                this.maxdist=0;
                this.moveflag=false;
                this.speed[0]=0;
            }
        }

        if(this.position[2]-this.dimension[2]/2 < ground)
        {
            this.position[2]=ground+this.dimension[2]/2;
            this.speed[2]=0;
        }
    }
    move_left(){
        this.speed[0]= -0.1;
        this.moveflag=true;
    }
    move_right(){
        this.speed[0]= +0.1;
        this.moveflag=true;
    }
    jump(){
        if(this.position[2]-this.dimension[2]/2 <= ground)
            this.speed[2]=0.1;
    }
    duck(){
    }
};

