var programInfo;
var programInfoNormal;
var programInfoGrayscale;
var map = {65 : false, 68 : false, 32 : false};
var keypress = false;
var switchShader = false;

var progress = 0;
var camx=0.0,camz=1.5;
var pause=false;

var ground = 0;
var gravity = -0.005;
var state;

var jake;
var police;
var track1;
var track2;
var track3;
var wall1;
var wall2;

var trains=[];
var roadblocks=[];
var coins=[];
var jets=[];
var jumps=[];
var magnets=[];
var obstacles=[];

function detect_collision(a,b){
  var colx = (Math.abs(a.position[0] - b.position[0]) *2 < a.dimension[0]+b.dimension[0]);
  var coly = (Math.abs(a.position[1] - b.position[1]) *2 < a.dimension[1]+b.dimension[1]);
  var colz = (Math.abs(a.position[2] - b.position[2]) *2 < a.dimension[2]+b.dimension[2]);
  return [colx,coly,colz];
}

main();

function initGL(gl){
  // jake = new Cube(gl, [0, 0, -0.5],[1,100,0],'cubetexture.jpg');
  track1 = new Track(gl, 0, 1);
  track2 = new Track(gl, -1, 1);
  track3 = new Track(gl,1,1);
  wall1 = new Wall(gl,-2, 4);
  wall2 = new Wall(gl, 2, 4);

  trains.push(new Train(gl,0,40));
  roadblocks.push(new RoadBlock(gl,-1,40,2));
  coins.push(new Coin(gl,[0,3,0.25]));
  jets.push(new Jet(gl,[1,20,0.25]));
  jumps.push(new Jump(gl,-1,20));
  magnets.push(new Magnet(gl,0,20));
  obstacles.push(new Obstacle(gl,1,35,2));

  jake = new Jake(gl,0,1);
  police = new Police(gl,0,0);
}
// Draw the scene.
function draw(gl, programInfo, deltaTime) {
  gl.clearColor(0.72, 0.79, 0.83, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas before we start drawing on it.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 50.0;
  const projection = mat4.create();
  mat4.perspective(projection,fieldOfView,aspect,zNear,zFar);

  var eye = [camx,progress-3,camz];
  var target = [camx,progress,camz-0.3];
  var up = [0, 0, 1];
  var view = mat4.create();
  mat4.lookAt(view, eye, target, up);

  var VP = mat4.create();
  mat4.multiply(VP,projection,view);

  //DRAW ALL ELEMENTS HERE
  for(i=0;i<coins.length;i++)
    coins[i].draw(gl,VP, programInfo, deltaTime);
  wall1.draw(gl, VP, programInfo, deltaTime);
  wall2.draw(gl, VP, programInfo, deltaTime);
  for(i=0;i<jets.length;i++)
    jets[i].draw(gl,VP, programInfo, deltaTime);
  
  jake.draw(gl, VP, programInfo, deltaTime);
  police.draw(gl, VP, programInfo, deltaTime);
  
  track1.draw(gl, VP, programInfo, deltaTime);
  track2.draw(gl, VP, programInfo, deltaTime);
  track3.draw(gl, VP, programInfo, deltaTime);
  
  for(i=0;i<trains.length;i++)
    trains[i].draw(gl, VP, programInfo, deltaTime);
  for(i=0;i<roadblocks.length;i++)
    roadblocks[i].draw(gl, VP, programInfo, deltaTime);
  for(i=0;i<jumps.length;i++)
    jumps[i].draw(gl,VP, programInfo, deltaTime);
  for(i=0;i<magnets.length;i++)
    magnets[i].draw(gl,VP, programInfo, deltaTime);
  for(i=0;i<obstacles.length;i++)
    obstacles[i].draw(gl,VP, programInfo, deltaTime);
}

function tick_elements(){
  if(!pause)
  {
    ground = 0;

    for(i=0;i<coins.length;i++)
      coins[i].tick();
    for(i=0;i<jets.length;i++)
      jets[i].tick();
    for(i=0;i<trains.length;i++)
      trains[i].tick();

    //COLLISION DETECTION

    //WALL
    var collide = detect_collision(jake,wall1);
    if(collide[0])
      jake.slowdown();
    collide = detect_collision(jake,wall2);
    if(collide[0])
      jake.slowdown();

    //TRAIN
    for(i=0;i<trains.length;i++)
    {
      collide = detect_collision(jake,trains[i]);
      if(collide[0] && collide[1] && collide[2])
      {
        if(state[0] && state[1])
        {
          //ON TOP
          jake.speed[2]=0;
          ground = trains[i].position[2]+trains[i].dimension[2]/2;
        }
        if(state[1] && state[2])
        {
          //FROM SIDE
          jake.slowdown();
        }
        if(state[0] && state[2])
        {
          //FROM FRONT
          jake.hasDied();
        }
      }
      state = collide;
    }

    //PLAYER MOVEMENT
    jake.tick(); //always keep it below collision of train
    camx = jake.position[0]*0.6;
    progress+=jake.speed[1];

    police.tick();
  }
}

onkeydown = onkeyup = function (event) {
  map[event.keyCode] = event.type == 'keydown';
  if(event.type == 'keyup')
  keypress = false;
}
function tick_input(){
  if(map[65] && !keypress){jake.move_left();keypress=true;}
  if(map[68] && !keypress){jake.move_right();keypress=true;}
  if(map[87] && !keypress){jake.jump();keypress=true;}
  if(map[81] && !keypress){ pause = !pause ;keypress=true;}
  if(map[90] && !keypress){switchShader = !switchShader;keypress=true;}
  programInfo = (switchShader)?programInfoGrayscale:programInfoNormal;

  if(map[74]){camx-=0.1;}
  if(map[76]){camx+=0.1;}
  if(map[75]){camz-=0.1;}
  if(map[73]){camz+=0.1;}
  if(map[79]){progress+=0.1;}
  if(map[80]){progress-=0.1;}
}

function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  makeShader(gl);

  initGL(gl);

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers
  
  // Draw the scene repeatedly
  var then = 0;
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    draw(gl, programInfo, deltaTime);
    tick_elements();
    tick_input();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//SHADERS
function makeShader(gl){
  const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;

    // Apply lighting effect

    highp vec3 ambientLight = vec3(0.9, 0.9, 0.9);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
  }
  `;
  const fsSource = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    // precision highp float;
    // vec4 color = texture2D(uSampler, vTextureCoord);
    // float gray = dot(color.rgb,vec3(0.299,0.587,0.114));
    // gl_FragColor = vec4(vec3(gray),1.0);
  }
  `;
  const fsSourceGrayscale = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    precision highp float;
    vec4 color = texture2D(uSampler, vTextureCoord);
    float gray = dot(color.rgb,vec3(0.299,0.587,0.114));
    gl_FragColor = vec4(vec3(gray),1.0);
  }
  `;
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgramGrayscale = initShaderProgram(gl, vsSource, fsSourceGrayscale);

  programInfoNormal = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  programInfoGrayscale = {
    program: shaderProgramGrayscale,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramGrayscale, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgramGrayscale, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgramGrayscale, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramGrayscale, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramGrayscale, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgramGrayscale, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramGrayscale, 'uSampler'),
    },
  };
  programInfo = programInfoNormal;
}
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn off mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}
function isPowerOf2(value) {
return (value & (value - 1)) == 0;
}