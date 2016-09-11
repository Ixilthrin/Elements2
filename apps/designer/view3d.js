function View3d()
{
this.drawCount1 = 0;
this.frustum = new Frustum();
this.rotationY = .1;
this.shaderProgram;
this.vPosition;
this.vTexCoord;
this.mMatrix = this.frustum.identity;
this.mMatrix = this.frustum.transform;
this.pMatrix = this.frustum.getProjectionMatrix();
this.coords3d = new Array();
this.polyBuffer;
this.triangleVertexBuffer;
this.triangleTexBuffer;
this.squareVertexBuffer;
this.squareTexBuffer;
this.textureObject;
this.screenWidth;
this.screenHeight;
this.viewCanvas;

this.acanvas;
this.acontext;
this.tex;
}


View3d.prototype.createContext = function(canvas) {
	var gl;
	this.viewCanvas = canvas;
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		this.screenWidth = canvas.width;
		this.screenHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialize webGL");
	}
	
	this.viewCanvas.addEventListener("mousewheel", function(e) {
	    this.frustum.moveForward(e.wheelDelta / 2000);
	});
	
	
	return gl;
}

View3d.prototype.initializeView = function(gl) {
	this.initShaders(gl);
	this.initBuffers(gl);
	gl.clearColor(1, 1, 1, 1);
	gl.enable(gl.DEPTH_TEST);
    var image = new Image();
	image.src = "planet-earth.jpg";
	var view3d = this;
	image.onload = function()
	{
	    view3d.createTexture(gl, image);
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

View3d.prototype.createTextureFromImageData = function(gl, data)
{
    //gl.deleteTexture(tex);
	this.tex = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.tex);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
	//gl.bindTexture(gl.TEXTURE_2D, null);
}

View3d.prototype.createTexture = function(gl, image)
{
	this.textureObject = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	//gl.bindTexture(gl.TEXTURE_2D, null);
}

View3d.prototype.initShaders = function(gl)
{
	var fragmentShader = this.getShader(gl, "shader-fs");
	
	var vertexShader = this.getShader(gl, "shader-vs");

	this.shaderProgram = gl.createProgram();
	gl.attachShader(this.shaderProgram, vertexShader);
	gl.attachShader(this.shaderProgram, fragmentShader);
	gl.linkProgram(this.shaderProgram);

	if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialize shaders");
	}

	gl.useProgram(this.shaderProgram);

	this.vPosition = gl.getAttribLocation(this.shaderProgram, "vPosition");
	gl.enableVertexAttribArray(this.vPosition);

	this.vTexCoord = gl.getAttribLocation(this.shaderProgram, "vTexCoord");
	gl.enableVertexAttribArray(this.vTexCoord);
	
	this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "pMatrix");
	this.shaderProgram.mMatrixUniform = gl.getUniformLocation(this.shaderProgram, "mMatrix");
}

View3d.prototype.getShader = function(gl, id) 
{
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
		alert("error: " + gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

View3d.prototype.initBuffers = function(gl)
{
	this.triangleVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexBuffer);
	var vertices = [
		 0.5,  .5,  -5,
		-.5, -.5,  -5,
		 .5, -.5,  -5,
		 -.5, .5, -5,
		-.5, -.5,  -5,
		 0.5,  .5,  -5
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	this.triangleVertexBuffer.itemSize = 3;
	this.triangleVertexBuffer.numItems = 6;

	this.triangleTexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleTexBuffer);
	var texcoords3d = [
		 1,  0,
		 0, 1,
		 1, 1,
		 0, 0,
		 0, 1,
		 1, 0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords3d), gl.STATIC_DRAW);

	this.triangleTexBuffer.itemSize = 2;
	this.triangleTexBuffer.numItems = 6;

	this.squareVertexBuffer = gl.createBuffer();
	this.squareVertexBuffer.itemSize = 3;
	this.squareVertexBuffer.numItems = 4;

	this.squareTexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexBuffer);
	texcoords3d = [
		 0, 0,
		 1, 0,
		 0, 1,
		 1, 1,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords3d), gl.STATIC_DRAW);

	this.squareTexBuffer.itemSize = 2;
	this.squareTexBuffer.numItems = 4;

	//polyBuffer = gl.createBuffer();
	//polyBuffer.itemSize = 3;
	//if (coords3d.length >= 6) {
	//	gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
	//	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords3d), gl.DYNAMIC_DRAW);
	//	polyBuffer.numItems = coords3d.length / 3;
	//}
}


View3d.prototype.showalert = function(text)
{
    if (this.drawCount1 == 0)
	    alert(text);
		
    this.drawCount1++;
}

View3d.prototype.eraseView = function(gl)
{ 
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

View3d.prototype.drawTextbox = function(gl, imageData, wx, wy, width, height)
{
    //gl.deleteBuffer(squareVertexBuffer);
	//squareVertexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	/*
	vertices = [
		 -.5, -.5,  -0.5,
		  .5, -.5,  -0.5,
		 -.5,  .5,  -0.5,
		  .5,  .5,  -0.5,
	];
	*/
	//frustum.moveForward(-.01);
	var coord = this.frustum.convertScreenToWorld(wx + 20, wy + 20, this.screenWidth, this.screenHeight);
	var x = coord[0];
	var y = coord[1];	
	var z = coord[2];
	var w = width * .66 / this.screenWidth;
	var h = height * .66 / this.screenHeight;
	vertices = [
		   x,     y,  z,
		   x + w, y,  z,
		   x,     y + h,  z,
		   x + w, y + h,  z
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	
	this.mMatrix = this.frustum.transform;
	//frustum.moveForward(-.01);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	gl.activeTexture(gl.TEXTURE0);
	
	this.createTextureFromImageData(gl, imageData);
	
	gl.uniform1i(gl.getUniformLocation(this.shaderProgram, "uSampler"), 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexBuffer.numItems);
}

View3d.prototype.drawPolyline = function(polyline)
{
}

View3d.prototype.drawPoints = function(points)
{
}

View3d.prototype.drawSelectionBox = function(x1, y1, x2, y2)
{
}

View3d.prototype.drawScene = function(gl) 
{
    if (this.textureObject == undefined)
	    return;
		
	this.mMatrix = this.frustum.transform;
	//frustum.moveForward(-.01);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.triangleVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.triangleTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(gl);
    //showalert(triangleVertexBuffer);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
	gl.uniform1i(gl.getUniformLocation(this.shaderProgram, "uSampler"), 0);

	gl.drawArrays(gl.TRIANGLES, 0, this.triangleVertexBuffer.numItems);


	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexBuffer.numItems);
		
	//if (coords3d.length >= 6) {
	//	gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
	//	gl.vertexAttribPointer(vPosition, polyBuffer.itemSize, gl.FLOAT, false, 0, 0);
	//	setMatrixUniforms(gl);
	//	gl.drawArrays(gl.LINE_STRIP, 0, polyBuffer.numItems);
	//}
}

View3d.prototype.setMatrixUniforms = function(gl) 
{
	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, new Float32Array(this.pMatrix));
	gl.uniformMatrix4fv(this.shaderProgram.mMatrixUniform, false, new Float32Array(this.mMatrix));
}

View3d.prototype.updateScene = function()
{
}