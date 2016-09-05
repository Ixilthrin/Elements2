var dimension = 3;

var date = new Date();
var initTime = date.getTime();
date  = new Date();
var previousTime = date.getTime();

var canvas;
var context;
var backCanvas;
var backBuffer;

var capsLock = false;
var needsRedraw = true;

function draw() 
{
    requestAnimationFrame(draw);
	
	if (needsRedraw)
	    needsRedraw = false;
	else
	    return;
	
	if (dimension == 2)
	{
	    eraseView2d(context);
	}
	else
	{
	    eraseView3d(context);
	}
	
	if (dimension == 3)
	    drawScene3d(context);
}

function createContext(canvas)
{
	needsRedraw = true;
    if (dimension == 2)
	    return createContext2d(canvas);
	return createContext3d(canvas);
}

function initializeView(context)
{
   if (dimension == 2)
       initializeView2d(context);
   else
       initializeView3d(context);
	   
}

function setupView()
{
   context = createContext(canvas);
   initializeView(context);
}

function main() 
{
   initTime = date.getTime();

   canvas = document.getElementById("canvas");
   backCanvas = document.createElement('canvas');
   backCanvas.width = canvas.width;
   backCanvas.height = canvas.height;
   backBuffer = backCanvas.getContext('2d');
   canvas.tabindex = "1";
   
   context = createContext(canvas);
   initializeView(context);
   
   canvas.focus();
   canvas.addEventListener('mouseover', function(e) {
       canvas.focus();
   }); 
   canvas.addEventListener('mousewheel', function(e) {
       e.preventDefault();
	   needsRedraw = true;
	   //e.wheelDelta
       //var centerX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
       //var centerY = document.body.scrollTop + e.clientY - canvas.offsetTop;
   }); 
   
   canvas.addEventListener("mousemove", function(e) {
       e.preventDefault();
	   needsRedraw = true;
       if (mouseIsDown) {
       }
   });
   
   canvas.addEventListener("mouseup", function(e) {
       e.target.style.cursor = "default";
       mouseIsDown = false;
	   needsRedraw = true;
   });
   
   canvas.addEventListener("dblclick", function(e) {
        needsRedraw = true;
   });
   
   canvas.addEventListener("mousedown", function(e) {
       e.preventDefault();
       mouseIsDown = true;
   });
   
   document.addEventListener("keydown", function(e) {
       e.preventDefault();
	   needsRedraw = true;
	   
	   if (e.keyCode == 91) // Mac command key
	       return;
		   
       if (e.ctrlKey) {
           if (e.keyCode == 67) {  // 'C' key
               return;
           }
           if (e.keyCode == 86) {  // 'V' key
               return;
           }
       }
       var code = e.keyCode;
       if (code >= 65 && code <= 90 && !e.shiftKey && !capsLock) {
           code += 32;
       }
       if (e.keyCode == 37) { // left arrow key
       }
       if (e.keyCode == 38) { // up arrow key
       }
       if (e.keyCode == 39) { // right arrow key
       }
       if (e.keyCode == 40) { // down arrow key
       }
       if (code == 20) {
           capsLock = !capsLock;
       } else if (code == 13) {
	       // ENTER key pressed, move to next line
       } else if (code == 46) {
	       // delete
       } else {
       }
   });
   
   document.addEventListener("keyup", function(e) {
       var code = e.keyCode;
	    needsRedraw = true;
	   if (e.keyCode == 91) // Mac command key
	       return;
		   
       if (code == 27) {
           return;
       }
	       if (code == 9) // tab
		   {
		       if (dimension == 2)
			       dimension = 3;
			    else
				    dimension = 2;
			   setupView();
			   draw();
		   }
		   
           if (code >= 49 && code <= 57) {
               return;
           }
           if (code == 71) {
           } else if (code == 66) {
           } else if (code == 82) {
           } else if (code == 89) {
           } else if (code == 75) {
           } else if (code == 87) {
           }
           return;
   });
	draw();
}

