/// <reference path="webgl.d.ts" />

var speed = 0.1;

let Police = class {
    constructor(gl, lane,dist) {
        this.picture = 'sky.jpg';
        this.dimension = [1,0.1,0.1];

        this.hitdist=0;

        this.s1=false;
        this.s2=false;
        this.s3=false;

        this.position =[lane,dist,this.dimension[2]/2];
        this.police = new Cube(gl,this.position,this.dimension,this.picture);
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        this.police.draw(gl,projectionMatrix,programInfo,deltaTime);
    }

    tick(){
        if(this.s1)
        {
            this.position[0]=jake.position[0];
            this.position[1]+=0.1;
            this.position[2]=jake.position[2];

            this.hitdist+=0.1;
            if(this.hitdist > 0.5)
            {
                this.hitdist =0;
                this.s1 = false;
                this.s2 = true;
            }
        }

        if(this.s2)
        {
            this.position[0]=jake.position[0];
            this.position[2]=jake.position[2];
            this.position[1]+=jake.speed[1];

            if(!jake.hitimpact)
            {
                this.s2 = false;
                this.s3 = true;
            }
        }

        if(this.s3)
        {
            this.position[0]=jake.position[0];
            this.position[2]=jake.position[2];

            this.hitdist+=0.1;
            if(this.hitdist > 1)
            {
                this.hitdist =0;
                this.s3 = false;
            }
        }
    }
    chase(){
        this.s1 = true;
        this.position[0]=jake.position[0];
        this.position[1]=jake.position[1]-1;
        this.position[2]=jake.position[2];
    }
};