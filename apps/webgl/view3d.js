function View3d()
{
    //alert("view3d constructor");
this.drawCount1 = 0;
this.frustum = new Frustum();
view3dFrustum = this.frustum;
this.rotationY = .1;
this.meshShaderProgram;
this.lineShaderProgram;
this.vPosition;
this.vTexCoord;
//this.mMatrix = this.frustum.identity;
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
this.drawing = false;
}

var view3dFrustum;


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
        //alert("wheel: " + e.wheelDelta);
        //alert("frustum: " + view3dFrustum);
	    view3dFrustum.moveForward(e.wheelDelta / 100);
	});
	
	//gl.enable(gl.BLEND);
	return gl;
}

View3d.prototype.initializeView = function(gl) {
	this.initMeshShaders(gl);
	this.initLineShaders(gl);
	this.initBuffers(gl);
	gl.clearColor(.8, .8, .8, 1);
	gl.enable(gl.DEPTH_TEST);
    // var image = new Image();
	// image.src = "planet-earth.jpg";
	// var view3d = this;
	// alert(image);
	// image.onload = function()
	// {
        // alert(image);
	    // view3d.createTexture(gl, image);
	
	// acanvas = document.createElement('canvas');
    // acanvas.width = 100;
    // acanvas.height = 100;
    // acontext = acanvas.getContext('2d');
    // acontext.clearRect(0, 0, backCanvas.width, backCanvas.height);
        // acontext.beginPath();
        // acontext.lineWidth = 10;
        // acontext.strokeStyle = "#990000";
        // acontext.moveTo(0, 0);
        // acontext.lineTo(100, 100);
        // acontext.stroke();
	// textureObject = gl.createTexture();
	// var data = acontext.getImageData(0, 0, 100, 100);
	// createTextureFromImageData(gl, data);
	// }
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

View3d.prototype.initMeshShaders = function(gl)
{
	var fragmentShader = this.getShader(gl, "mesh-shader-fs");
	
	var vertexShader = this.getShader(gl, "mesh-shader-vs");

	this.meshShaderProgram = gl.createProgram();
	gl.attachShader(this.meshShaderProgram, vertexShader);
	gl.attachShader(this.meshShaderProgram, fragmentShader);
	gl.linkProgram(this.meshShaderProgram);

	if (!gl.getProgramParameter(this.meshShaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialize shaders");
	}
}

View3d.prototype.useMeshShaders = function(gl)
{
	gl.useProgram(this.meshShaderProgram);

	this.vPosition = gl.getAttribLocation(this.meshShaderProgram, "vPosition");
	gl.enableVertexAttribArray(this.vPosition);

	this.vTexCoord = gl.getAttribLocation(this.meshShaderProgram, "vTexCoord");
	gl.enableVertexAttribArray(this.vTexCoord);
	
	this.meshShaderProgram.pMatrixUniform = gl.getUniformLocation(this.meshShaderProgram, "pMatrix");
	this.meshShaderProgram.mMatrixUniform = gl.getUniformLocation(this.meshShaderProgram, "mMatrix");
}

View3d.prototype.initLineShaders = function(gl)
{
	var fragmentShader = this.getShader(gl, "line-shader-fs");
	
	var vertexShader = this.getShader(gl, "line-shader-vs");

	this.lineShaderProgram = gl.createProgram();
	gl.attachShader(this.lineShaderProgram, vertexShader);
	gl.attachShader(this.lineShaderProgram, fragmentShader);
	gl.linkProgram(this.lineShaderProgram);

	if (!gl.getProgramParameter(this.lineShaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialize shaders");
	}
}

View3d.prototype.useLineShaders = function(gl)
{
	gl.useProgram(this.lineShaderProgram);

	this.vPosition = gl.getAttribLocation(this.lineShaderProgram, "vPosition");
	gl.enableVertexAttribArray(this.vPosition);

	this.vTexCoord = gl.getAttribLocation(this.lineShaderProgram, "vTexCoord");
	gl.enableVertexAttribArray(this.vTexCoord);
	
	this.lineShaderProgram.pMatrixUniform = gl.getUniformLocation(this.lineShaderProgram, "pMatrix");
	this.lineShaderProgram.mMatrixUniform = gl.getUniformLocation(this.lineShaderProgram, "mMatrix");
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

	this.polyBuffer = gl.createBuffer();
	this.polyBuffer.itemSize = 3;
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

// arguments are in world space
View3d.prototype.drawImage = function(gl, imageData, x, y, z, width, height)
{
    //gl.blendFunc(gl.ONE, gl.ZERO);
    //alert("called drawImage");
    //alert(imageData);
	this.useMeshShaders(gl);
    //gl.deleteBuffer(squareVertexBuffer);
	//squareVertexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
    //alert("called gl.bindBuffer");
	
    // test data
	// vertices = [
		 // -2, 2.5,  -10,
		  // -1.5, 2.5,  -10,
		 // -2,  3,  -10,
		  // -1.5,  3,  -10,
	// ];
	
	//this.frustum.moveForward(-.01);
    //alert("frustum = " + this.frustum);
    
	vertices = [
		   x,     y,  z,
		   x + width, y,  z,
		   x,     y + height,  z,
		   x + width, y + height,  z
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	
	this.mMatrix = this.frustum.transform;
	//frustum.moveForward(-.01);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    //alert(gl.viewportWidth);

	gl.activeTexture(gl.TEXTURE0);
	
	this.createTextureFromImageData(gl, imageData);
	
	gl.uniform1i(gl.getUniformLocation(this.meshShaderProgram, "uSampler"), 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniformsForMeshShaders(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexBuffer.numItems);
    //alert("finished drawImage");
}

// arguments are in screen space at front face of view frustum
View3d.prototype.drawTextbox = function(gl, imageData, wx, wy, width, height)
{
    //alert("called drawTextbox");
	this.useMeshShaders(gl);
    //gl.deleteBuffer(squareVertexBuffer);
	//squareVertexBuffer = gl.createBuffer();    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
    //alert("called gl.bindBuffer");
	/*
	vertices = [
		 -.5, -.5,  -0.5,
		  .5, -.5,  -0.5,
		 -.5,  .5,  -0.5,
		  .5,  .5,  -0.5,
	];
	*/
	//this.frustum.moveForward(-.001);
    //alert("frustum = " + this.frustum);
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
	
	gl.uniform1i(gl.getUniformLocation(this.meshShaderProgram, "uSampler"), 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniformsForMeshShaders(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexBuffer.numItems);
}

View3d.prototype.drawLine = function(gl, vertices)
{
//if (this.drawing)
//return;
//this.drawing = true;
//alert("@drawLine");

    //gl.lineWidth(0);  // doesn't work
    //gl.blendFunc(gl.SRC_ALPHA, gl.DST_COLOR);
	this.useLineShaders(gl);
    
	this.polyBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.polyBuffer);
    
	if (vertices.length < 6)
	    return;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	
	this.mMatrix = this.frustum.transform;
	
	gl.vertexAttribPointer(this.vPosition, 3, gl.FLOAT, false, 0, 0);
	this.setMatrixUniformsForLineShaders(gl);
	var count = vertices.length/3;
    if (count < 2)
        return;
    //alert("count = " + count);
	gl.drawArrays(gl.LINES, 0, count);
	//this.drawing = false;
	gl.deleteBuffer(this.polyBuffer);
    //alert("end drawLine");
}

View3d.prototype.drawPolyline = function(gl, polyline)
{
if (this.drawing)
return;
this.drawing = true;
	this.useLineShaders(gl);
    if (polyline.length < 1)
        return;
	this.polyBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.polyBuffer);
	var vertices = [];
	for (var j = 0; j < polyline.length; j = j + 1)
	{
	for (var i = 0; i < polyline[0].values.length; i = i + 2)
	//for (var i = 0; i < 5; i = i + 1)
	{
	    var coord = this.frustum.convertScreenToWorld(
		    polyline[j].values[i], polyline[j].values[i+1], this.screenWidth, this.screenHeight);
	    vertices.push(coord[0]);
		vertices.push(coord[1]);
		vertices.push(-1);
	}
	}
	vertices.push(0, 0, -1);
	if (vertices.length < 6)
	    return;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	
	this.mMatrix = this.frustum.transform;
	
	gl.vertexAttribPointer(this.vPosition, 3, gl.FLOAT, false, 0, 0);
	this.setMatrixUniformsForLineShaders(gl);
	var count = vertices.length/3 -1;
	gl.drawArrays(gl.LINE_STRIP, 0, count);
	this.drawing = false;
	gl.deleteBuffer(this.polyBuffer);
}

View3d.prototype.drawPoints = function(points)
{
}

View3d.prototype.drawSelectionBox = function(x1, y1, x2, y2)
{
}

View3d.prototype.drawScene = function(gl) 
{
	this.useMeshShaders(gl);
    if (this.textureObject == undefined)
	    return;
		
	this.mMatrix = this.frustum.transform;
	//frustum.moveForward(-.01);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.triangleVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.triangleTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniformsForMeshShaders(gl);
    //showalert(triangleVertexBuffer);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
	gl.uniform1i(gl.getUniformLocation(this.meshShaderProgram, "uSampler"), 0);

	gl.drawArrays(gl.TRIANGLES, 0, this.triangleVertexBuffer.numItems);


	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	gl.vertexAttribPointer(this.vPosition, this.squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexBuffer);
	gl.vertexAttribPointer(this.vTexCoord, this.squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniformsForMeshShaders(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexBuffer.numItems);
		
	//if (coords3d.length >= 6) {
	//	gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
	//	gl.vertexAttribPointer(vPosition, polyBuffer.itemSize, gl.FLOAT, false, 0, 0);
	//	setMatrixUniformsForMeshShaders(gl);
	//	gl.drawArrays(gl.LINE_STRIP, 0, polyBuffer.numItems);
	//}
}

View3d.prototype.setMatrixUniformsForMeshShaders = function(gl) 
{
	gl.uniformMatrix4fv(this.meshShaderProgram.pMatrixUniform, false, new Float32Array(this.pMatrix));
	gl.uniformMatrix4fv(this.meshShaderProgram.mMatrixUniform, false, new Float32Array(this.mMatrix));
}

View3d.prototype.setMatrixUniformsForLineShaders = function(gl) 
{
	gl.uniformMatrix4fv(this.lineShaderProgram.pMatrixUniform, false, new Float32Array(this.pMatrix));
	gl.uniformMatrix4fv(this.lineShaderProgram.mMatrixUniform, false, new Float32Array(this.mMatrix));
}

View3d.prototype.updateScene = function()
{
}