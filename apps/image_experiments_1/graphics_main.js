var canvas;
var context;
var needsRedraw = true;

function draw() 
{
    requestAnimationFrame(draw);
	
    if (needsRedraw)
        needsRedraw = false;
    else
        return;
}

function createContext(canvas)
{
    var context;
    try {
        context = canvas.getContext("2d");
    } catch (e) {
    }
    if (!context) {
        alert("Could not initialize 2d context");
    }
    return context;
}

function main() 
{
   canvas = document.getElementById("canvas");
   context = createContext(canvas);
   canvas.focus();
   draw();
}
