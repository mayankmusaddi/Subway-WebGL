/// <reference path="webgl.d.ts" />

function makeCircle(position, radius, n) 
{
    positions = [];
    for(var i=0;i<n;i++)
    {
        positions.push(position[0]);
        positions.push(position[1]);
        positions.push(position[2]);

        positions.push(position[0]+(radius*Math.cos(2*Math.PI/n*i)));
        positions.push(position[1]+(radius*Math.sin(2*Math.PI/n*i)));
        positions.push(position[2]);

        positions.push(position[0]+(radius*Math.cos(2*Math.PI/n*(i+1))));
        positions.push(position[1]+(radius*Math.sin(2*Math.PI/n*(i+1))));
        positions.push(position[2]);
    }
    return positions;
} //n*3

function makeCylinder(position,r1,r2,length,n)
{
    positions=[];
    for(i=0;i<n;i++)
    {
        positions.push(position[0]);
        positions.push(position[1]);
        positions.push(position[2]);

        positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*i)));
        positions.push(position[1]);
        positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*i)));

        positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*(i+1))));
        positions.push(position[1]);
        positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*(i+1))));
    }
    for(i=0;i<n;i++)
    {
        positions.push(position[0]);
        positions.push(position[1]+length);
        positions.push(position[2]);

        positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*i)));
        positions.push(position[1]+length);
        positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*i)));

        positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*(i+1))));
        positions.push(position[1]+length);
        positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*(i+1))));
    }
    for(i=0;i<n;i++)
    {
        positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*i)));
        positions.push(position[1]);
        positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*i)));

        positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*(i+1))));
        positions.push(position[1]);
        positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*(i+1))));

        positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*i)));
        positions.push(position[1]+length);
        positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*i)));

        positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*i)));
        positions.push(position[1]+length);
        positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*i)));

        positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*(i+1))));
        positions.push(position[1]+length);
        positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*(i+1))));

        positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*(i+1))));
        positions.push(position[1]);
        positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*(i+1))));
    }
    return positions;
} //n*12

function makeSphere(position,  r, el,n,) 
{
    positions=[];
    for(j=-n/4;j<n/4;j++)
    {
         r1 = (r*Math.cos(2*Math.PI/n*j));
         r2 = (r*Math.cos(2*Math.PI/n*(j+1)));
        for(i=0;i<n;i++)
        {
            positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*i)));
            positions.push(position[1]+el*(r*Math.sin(2*Math.PI/n*j)));
            positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*i)));

            positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*(i+1))));
            positions.push(position[1]+el*(r*Math.sin(2*Math.PI/n*j)));
            positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*(i+1))));

            positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*i)));
            positions.push(position[1]+el*(r*Math.sin(2*Math.PI/n*(j+1))));
            positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*i)));

            positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*i)));
            positions.push(position[1]+el*(r*Math.sin(2*Math.PI/n*(j+1))));
            positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*i)));

            positions.push(position[0]+(r2*Math.cos(2*Math.PI/n*(i+1))));
            positions.push(position[1]+el*(r*Math.sin(2*Math.PI/n*(j+1))));
            positions.push(position[2]+(r2*Math.sin(2*Math.PI/n*(i+1))));

            positions.push(position[0]+(r1*Math.cos(2*Math.PI/n*(i+1))));
            positions.push(position[1]+el*(r*Math.sin(2*Math.PI/n*j)));
            positions.push(position[2]+(r1*Math.sin(2*Math.PI/n*(i+1))));
        }
    }
    return positions;
}