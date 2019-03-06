/// <reference path="webgl.d.ts" />

let cube = class {
    constructor(gl, position,dimension) {
        this.rotationx = 0;
        this.rotationy = 0;
        this.rotationz = 0;
        this.position = position;
        var w = dimension[0]/2;
        var h = dimension[1]/2;
        var d = dimension[2]/2;

        //POSITION
        this.positions = [
            // Front face
            -w, -h,  d,
            w, -h,  d,
            w,  h,  d,
            -w,  h,  d,
            
            // Back face
            -w, -h, -d,
            -w,  h, -d,
            w,  h, -d,
            w, -h, -d,
            
            // Top face
            -w,  h, -d,
            -w,  h,  d,
            w,  h,  d,
            w,  h, -d,
            
            // Bottom face
            -w, -h, -d,
            w, -h, -d,
            w, -h,  d,
            -w, -h,  d,
            
            // Right face
            w, -h, -d,
            w,  h, -d,
            w,  h,  d,
            w, -h,  d,
            
            // Left face
            -w, -h, -d,
            -w, -h,  d,
            -w,  h,  d,
            -w,  h, -d,
        ];        
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        //COLOR
        this.faceColors = [
            [ Math.random(),  Math.random(),  Math.random(),  Math.random()],    // Left face: purple
            [ Math.random(), Math.random(), Math.random(), Math.random()], // Left face: purple
            [ Math.random(), Math.random(), Math.random(), Math.random()], // Left face: purple
            [ Math.random(), Math.random(), Math.random(), Math.random()], // Left face: purple
            [ Math.random(), Math.random(), Math.random(), Math.random()], // Left face: purple
            [ Math.random(), Math.random(), Math.random(), Math.random()], // Left face: purple

        ];
        var colors = [];
        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];
            colors = colors.concat(c, c, c, c);
        }
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        //INDICES
        const indices = [
            0, 1, 2,    0, 2, 3, // front
            4, 5, 6,    4, 6, 7,
            8, 9, 10,   8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23, 
        ];
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: positionBuffer,
            color: colorBuffer,
            indices: indexBuffer,
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix,modelViewMatrix,this.position);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotationx,[1, 0, 0]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotationy,[0, 1, 0]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotationz,[0, 0, 1]);

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
        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }
        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);
        // Tell WebGL to use our program when drawing
        gl.useProgram(programInfo.program);
        // Set the shader uniforms
        gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,projectionMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);
        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }

    tick(){
        this.rotationx+=0.01;
        this.rotationy+=0.01;
        this.rotationz+=0.01;
    }

    move_right(){
        this.position[0]+=1;
    }
    move_left(){
        this.position[0]-=1;
    }
};