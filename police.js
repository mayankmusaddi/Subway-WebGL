/// <reference path="webgl.d.ts" />

var speed = 0.1;

let Police = class {
    constructor(gl, lane,dist) {
        this.picture = 'sky.jpg';
        this.dimension = [0.4,0.3,0.6];

        this.hitdist=0;

        this.s1=false;
        this.s2=false;
        this.s3=false;

        this.position =[lane,dist,this.dimension[2]/2];
        // this.police = new Cube(gl,this.position,this.dimension,this.picture);

        this.headpic = 'head.jpg'; 
        this.bodypic = 'police.jpg';
        this.handpic = 'pant.jpg';
        this.legpic = 'pant.jpg';

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
        this.positionChange();
    }
    chase(){
        this.s1 = true;
        this.position[0]=jake.position[0];
        this.position[1]=jake.position[1]-1;
        this.position[2]=jake.position[2];
    }
};