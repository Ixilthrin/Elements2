var drawCount1 = 0;
var frustum = new Frustum();
var rotationY = .1;
var shaderProgram;
var vPosition;
var vTexCoord;
var mMatrix = frustum.identity;
mMatrix = frustum.transform;
var pMatrix = frustum.getProjectionMatrix();
var coords3d = new Array();
var polyBuffer;
var triangleVertexBuffer;
var triangleTexBuffer;
var squareVertexBuffer;
var squareTexBuffer;
var textureObject;
var screenWidth;
var screenHeight;
var viewCanvas;

function createContext3d(canvas) {
	var gl;
	viewCanvas = canvas;
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		screenWidth = canvas.width;
		screenHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialize webGL");
	}
	
	viewCanvas.addEventListener("mousewheel", function(e) {
	    frustum.moveForward(e.wheelDelta / 2000);
	});
	
	
	return gl;
}

var acanvas;
var acontext;
var tex;

function initializeView3d(gl) {
	//frustum.moveForward(-.02);
	initShaders(gl);
	initBuffers(gl);
	gl.clearColor(1, 1, 1, 1);
	gl.enable(gl.DEPTH_TEST);
    var image = new Image();
	image.src = "nextpage.jpg";
	image.onload = function()
	{
	    createTexture(gl, image);
	/*
	acanvas = document.createElement('canvas');
    acanvas.width = 100;
    acanvas.height = 100;
    acontext = acanvas.getContext('2d');
    acontext.clearRect(0, 0, backCanvas.width, backCanvas.height);
        acontext.beginPath();
        acontext.lineWidth = 10;
        acontext.strokeStyle = "#990000";
        acontext.moveTo(0, 0);
        acontext.lineTo(100, 100);
        acontext.stroke();
	textureObject = gl.createTexture();
	var data = acontext.getImageData(0, 0, 100, 100);
	createTextureFromImageData(gl, data);
	*/
	}
}

function createTextureFromImageData(gl, data)
{
    //gl.deleteTexture(tex);
	tex = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
	//gl.bindTexture(gl.TEXTURE_2D, null);
}

function createTexture(gl, image)
{
	textureObject = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureObject);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	//gl.bindTexture(gl.TEXTURE_2D, null);
}

function initShaders(gl) {
	var fragmentShader = getShader(gl, "shader-fs");
	
	var vertexShader = getShader(gl, "shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialize shaders");
	}

	gl.useProgram(shaderProgram);

	vPosition = gl.getAttribLocation(shaderProgram, "vPosition");
	gl.enableVertexAttribArray(vPosition);

	vTexCoord = gl.getAttribLocation(shaderProgram, "vTexCoord");
	gl.enableVertexAttribArray(vTexCoord);
	
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "pMatrix");
	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "mMatrix");
}

function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	str = shaderScript.innerHTML;

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function initBuffers(gl) {
	triangleVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
	var vertices = [
		 0.0,  .5,  -5,
		-.5, -.5,  -5,
		 .5, -.5,  -5
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	triangleVertexBuffer.itemSize = 3;
	triangleVertexBuffer.numItems = 3;

	triangleTexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleTexBuffer);
	var texcoords3d = [
		 0.5,  0,
		 0, 1,
		 1, 1
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords3d), gl.STATIC_DRAW);

	triangleTexBuffer.itemSize = 2;
	triangleTexBuffer.numItems = 3;

	squareVertexBuffer = gl.createBuffer();
	squareVertexBuffer.itemSize = 3;
	squareVertexBuffer.numItems = 4;

	squareTexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, squareTexBuffer);
	texcoords3d = [
		 0, 0,
		 1, 0,
		 0, 1,
		 1, 1,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords3d), gl.STATIC_DRAW);

	squareTexBuffer.itemSize = 2;
	squareTexBuffer.numItems = 4;

	//polyBuffer = gl.createBuffer();
	//polyBuffer.itemSize = 3;
	//if (coords3d.length >= 6) {
	//	gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
	//	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords3d), gl.DYNAMIC_DRAW);
	//	polyBuffer.numItems = coords3d.length / 3;
	//}
}


function showalert(text)
{
    if (drawCount1 == 0)
	    alert(text);
		
    drawCount1++;
}

function eraseView3d(gl)
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function drawTextbox3d(gl, imageData, wx, wy, width, height)
{
    //gl.deleteBuffer(squareVertexBuffer);
	//squareVertexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	/*
	vertices = [
		 -.5, -.5,  -0.5,
		  .5, -.5,  -0.5,
		 -.5,  .5,  -0.5,
		  .5,  .5,  -0.5,
	];
	*/
	//frustum.moveForward(-.01);
	var coord = frustum.convertScreenToWorld(wx + 20, wy + 20, screenWidth, screenHeight);
	var x = coord[0];
	var y = coord[1];	
	var z = coord[2];
	var w = width * .66 / screenWidth;
	var h = height * .66 / screenHeight;
	vertices = [
		   x,     y,  z,
		   x + w, y,  z,
		   x,     y + h,  z,
		   x + w, y + h,  z
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	
	mMatrix = frustum.transform;
	//frustum.moveForward(-.01);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	gl.activeTexture(gl.TEXTURE0);
	
	createTextureFromImageData(gl, imageData);
	
	gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.vertexAttribPointer(vPosition, squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareTexBuffer);
	gl.vertexAttribPointer(vTexCoord, squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexBuffer.numItems);
}

function drawPolyline3d(polyline)
{
}

function drawPoints3d(points)
{
}

function drawSelectionBox3d(x1, y1, x2, y2)
{
}

function drawScene3d(gl) 
{

	mMatrix = frustum.transform;
	frustum.moveForward(-.01);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
	gl.vertexAttribPointer(vPosition, triangleVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleTexBuffer);
	gl.vertexAttribPointer(vTexCoord, triangleTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	setMatrixUniforms(gl);
    showalert(triangleVertexBuffer);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureObject);
	gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

	gl.drawArrays(gl.TRIANGLES, 0, triangleVertexBuffer.numItems);


	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.vertexAttribPointer(vPosition, squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareTexBuffer);
	gl.vertexAttribPointer(vTexCoord, squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexBuffer.numItems);
		
	//if (coords3d.length >= 6) {
	//	gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
	//	gl.vertexAttribPointer(vPosition, polyBuffer.itemSize, gl.FLOAT, false, 0, 0);
	//	setMatrixUniforms(gl);
	//	gl.drawArrays(gl.LINE_STRIP, 0, polyBuffer.numItems);
	//}
}

function setMatrixUniforms(gl) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, new Float32Array(pMatrix));
	gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, new Float32Array(mMatrix));
}

function updateScene()
{
}