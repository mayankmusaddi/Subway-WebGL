/// <reference path="webgl.d.ts" />

let Coin = class {
    constructor(gl, lane,dist) {

        this.rotationx = 0;
        this.rotationy = 0;
        this.rotationz = 0;
        this.picture = './textures/coin.jpg';
        this.radius = 0.1;
        this.length = 0.05;
        this.dimension=[this.radius*2,this.length,this.radius*2];
        this.position = [lane,dist,0.25];
        this.sides = 10;
        this.v = 12;

        //POSITION
        this.positions = makeCylinder([0,0,0],this.radius,this.radius,this.length,this.sides);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        //TEXTURE
        // Load texture
        var textureCoordinates=[];
        for(var i=0;i<this.sides*this.v;i++)
        {
            textureCoordinates.push(0.0);
            textureCoordinates.push(0.0);
            textureCoordinates.push(1.0);
            textureCoordinates.push(0.0);
            textureCoordinates.push(1.0);
            textureCoordinates.push(1.0);
            textureCoordinates.push(0.0);
            textureCoordinates.push(1.0);
        }
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);

        //NORMAL
        var vertexNormals=[];
        for(var i=0;i<this.sides;i++)
        {
            vertexNormals.push(0.0);
            vertexNormals.push(-1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(-1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(-1.0);
            vertexNormals.push(0.0);
        }
        for(var i=0;i<this.sides;i++)
        {
            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);
        }
        for(var i=0;i<this.sides;i++)
        {
            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);

            vertexNormals.push(0.0);
            vertexNormals.push(1.0);
            vertexNormals.push(0.0);
        }
        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),gl.STATIC_DRAW);
        
        //INDICES
        
        var indices = [];
        for(var i=0;i<this.sides*this.v;i++)
            indices.push(i);
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        
        this.buffer = {
            position: positionBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
        }
        this.texture = loadTexture(gl, this.picture);        
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix,modelViewMatrix,this.position);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotationx,[1, 0, 0]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotationy,[0, 1, 0]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotationz,[0, 0, 1]);

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }
        
        // tell webgl how to pull out the texture coordinates from buffer
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
            gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
        }

        // Tell WebGL how to pull out the normals from the normal buffer into the vertexNormal attribute.
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal,numComponents,type,normalize,stride,offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
        }
        
        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        // Tell WebGL to use our program when drawing
        gl.useProgram(programInfo.program);
        // Set the shader uniforms
        gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix,false,normalMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,projectionMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);

        // Specify the texture to map onto the faces.
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexCount = this.sides*this.v;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }

    tick(){
        this.rotationz+=0.1;
    }
};

