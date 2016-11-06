    var gl;
    var frustum = new Frustum();
    var rotationY = .1;
    var textureObject;
    var shaderProgram;
    var vPosition;
    var vTexCoord;
    var mMatrix = frustum.identity;
    mMatrix = frustum.inverse;
    var pMatrix = frustum.getProjectionMatrix();
    var coords = new Array();
    var polyBuffer;
    var triangleVertexBuffer;
    var triangleTexBuffer;
    var squareVertexBuffer;
    var squareTexBuffer;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialize webGL");
        }
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

    function initShaders() {
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

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, new Float32Array(pMatrix));
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, new Float32Array(mMatrix));
    }

    function initBuffers() {
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
        var texCoords = [
             0.5,  0,
             0, 1,
             1, 1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

        triangleTexBuffer.itemSize = 2;
        triangleTexBuffer.numItems = 3;

        squareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
        vertices = [
             .5,  .5,  -0.5,
            -.5,  .5,  -0.5,
             .5, -.5,  -0.5,
            -.5, -.5,  -0.5
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexBuffer.itemSize = 3;
        squareVertexBuffer.numItems = 4;

        squareTexBuffer = gl.createBuffer();    
        gl.bindBuffer(gl.ARRAY_BUFFER, squareTexBuffer);
        texCoords = [
             0,  0,
             1, 0,
             0, 1,
             1, 1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

        squareTexBuffer.itemSize = 2;
        squareTexBuffer.numItems = 4;

        polyBuffer = gl.createBuffer();
        polyBuffer.itemSize = 3;
        if (coords.length >= 6) {
            gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.DYNAMIC_DRAW);
            polyBuffer.numItems = coords.length / 3;
        }
    }

    function drawScene() {
        requestAnimationFrame(drawScene);
        mMatrix = frustum.inverse;
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
        gl.vertexAttribPointer(vPosition, triangleVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleTexBuffer);
        gl.vertexAttribPointer(vTexCoord, triangleTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureObject);
        gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

        gl.drawArrays(gl.TRIANGLES, 0, triangleVertexBuffer.numItems);


        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
        gl.vertexAttribPointer(vPosition, squareVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareTexBuffer);
        gl.vertexAttribPointer(vTexCoord, squareTexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexBuffer.numItems);

        if (coords.length >= 6) {
            gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
            gl.vertexAttribPointer(vPosition, polyBuffer.itemSize, gl.FLOAT, false, 0, 0);
            setMatrixUniforms();
            gl.drawArrays(gl.LINE_STRIP, 0, polyBuffer.numItems);
        }

    }

    function main() {
        frustum.moveForward(1);
        var canvas = document.getElementById("canvas");
        paragraph = document.createElement('p');
        paragraph.id = "screen coords";
        document.body.appendChild(paragraph);
        paragraph.innerHTML = "screen coordinates go here";

        paragraph = document.createElement('p');
        paragraph.id = "world coords";
        document.body.appendChild(paragraph);
        paragraph.innerHTML = "world coordinates go here";

        paragraph = document.createElement('p');
        paragraph.id = "key state";
        document.body.appendChild(paragraph);
        paragraph.innerHTML = "key state goes here";

        paragraph = document.createElement('p');
        paragraph.id = "mouse state";
        document.body.appendChild(paragraph);
        paragraph.innerHTML = "mouse state goes here";

        paragraph = document.createElement('p');
        paragraph.id = "wheel delta";
        document.body.appendChild(paragraph);
        paragraph.innerHTML = "wheel delta goes here";

        canvas.addEventListener('mousedown', function(e) {
            document.getElementById("mouse state").innerHTML = e.button + " mouse down";
            document.getElementById("screen coords").innerHTML = "X: " + e.clientX + "   Y: " + e.clientY;
            var worldCoords = frustum.convertScreenToWorld(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, gl.viewportWidth, gl.viewportHeight);
            document.getElementById("world coords").innerHTML = "x: " + worldCoords[0] + "   y: " + worldCoords[1] + "   z: " + worldCoords[2];
            coords.push(worldCoords[0]);
            coords.push(worldCoords[1]);
            coords.push(worldCoords[2]);
            if (coords.length >= 6) {
                gl.bindBuffer(gl.ARRAY_BUFFER, polyBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.DYNAMIC_DRAW);
                polyBuffer.numItems = coords.length / 3;
            }
        }); 
        canvas.addEventListener('mouseup', function(e) {
            document.getElementById("mouse state").innerHTML = e.button + " mouse up";
        }); 
        canvas.addEventListener('mousewheel', function(e) {
               document.getElementById("wheel delta").innerHTML = "wheel delta = " + e.wheelDelta;
               frustum.moveForward(-.005 * e.wheelDelta);
               mMatrix = frustum.transform;
               setMatrixUniforms();
        }); 
        canvas.addEventListener('keydown', function(e) {
           document.getElementById("key state").innerHTML = String.fromCharCode(e.keyCode) + " key down";
           if (String.fromCharCode(e.keyCode) === String('W')) {
               frustum.moveForward(-.1);
               mMatrix = frustum.transform;
               setMatrixUniforms();
           }
           if (String.fromCharCode(e.keyCode) === String('S')) {
               frustum.moveForward(.1);
               mMatrix = frustum.transform;
               setMatrixUniforms();
           }
        }); 
        canvas.addEventListener('keyup', function(e) {
            document.getElementById("key state").innerHTML = String.fromCharCode(e.keyCode) + " key up";
        }); 
        canvas.addEventListener('mouseover', function(e) {
            canvas.focus();
        }); 
        initGL(canvas);
        initShaders();
        initBuffers();

        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);

        setupNoiseValues();  // Defined in Noise.js

        textureObject = gl.createTexture();
        var imgWidth = 512;
        var imgHeight = 512;
        var imgCanvas = document.createElement("canvas");
        imgCanvas.width = imgWidth;
        imgCanvas.height = imgHeight;
        var imgContext = imgCanvas.getContext("2d");
        var imgData = imgContext.createImageData(imgWidth, imgHeight);
        var data = imgData.data;
        data = createNoiseData(data, imgWidth, imgHeight);
        imgData.data = data;
        //document.body.appendChild(imgCanvas);
        imgContext.putImageData(imgData, 0, 0); 

        //var image = document.getElementById("image");
        gl.bindTexture(gl.TEXTURE_2D, textureObject);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);

        drawScene();
    }

