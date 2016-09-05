
var canvas;
var context;
var mode = 8;
var image;

function setFont(context, fontHeight, fontName) 
{
    context.font = "bold " + fontHeight + "px " + fontName + ", sans serif";
}

function main() 
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.addEventListener('mouseover', function(e) {
       e.preventDefault();
        canvas.focus();
    }); 
    canvas.addEventListener("mousemove", function(e) {
       e.preventDefault();
        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;
   }); 
   canvas.addEventListener("mouseup", function(e) {
       e.preventDefault();
       var offsetX = canvas.offsetLeft;
       var offsetY = canvas.offsetTop;
	   mode++;
	   mode = mode % 9;
       draw();
   }); 
   canvas.addEventListener("mousedown", function(e) {
       e.preventDefault();
       var offsetX = canvas.offsetLeft;
       var offsetY = canvas.offsetTop;
   }); 
   canvas.addEventListener("keydown", function(e) {
       e.preventDefault();
   }); 
   canvas.addEventListener("keyup", function(e) {
       var code = e.keyCode;
   }); 
	addBase();
	addNoise();
	addSplats();
	addSplats();
	addSplats();
	addSplats();
	addSplats();
	addBlend();
	addBlend();
   draw();
}
 
function draw() 
{
    switch(mode) {
        case 0:
            addBase();
            break;
        case 1: 
            addNoise();
            break;
        case 2: 
            addSplats();
            break;
        case 3: 
            addSplats();
            break;
        case 4: 
            addSplats();
            break;
        case 5: 
            addSplats();
            break;
        case 6: 
            addSplats();
            break;
        case 7: 
            addBlend();
            break;
        case 8: 
            addBlend();
            break;
    }
}

function addBaseImage()
{
    var index = 0;
    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            var red = 0;
            var green = 0;
            var blue = 230;
            if (x % Math.floor(Math.random() * 5 + 5) == 0 || y % Math.floor(Math.random() * 5 + 5) == 0) {
                //red = Math.random() * 50 + 50;
                //green = 50;
            }
            if (Math.random() < .1) {
                blue = 0;
            }
            if (Math.random() < .2) {
                green = 50;
            }
            if (Math.random() < .7) {
                blue = 90;
            }
            if (Math.random() < .2) {
                blue = 255;
            }
            image.data[index++] = red; 
            image.data[index++] = green; 
            image.data[index++] = blue; 
            image.data[index++] = 255; 
        }
    }
}

function addBase() 
{
    image = context.createImageData(canvas.width, canvas.height);
    context.putImageData(image, 0, 0);
}

function addNoise() 
{
    addBaseImage();
    context.putImageData(image, 0, 0);
}

function addSplats()
{
    for (var i = 0; i < 100; i++) {
        splat(image.data);
    }
    context.putImageData(image, 0, 0);
}

function addBlend()
{
    blend(image.data);
    context.putImageData(image, 0, 0);
}