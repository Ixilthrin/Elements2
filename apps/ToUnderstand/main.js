// main.js for the ToUnderstand project
// Global sub-systems
var Graphics;

var x = 5;
var y = 50;

// This is an active canvas due to this loop with continuous updating
function draw() 
{
    requestAnimationFrame(draw);
	
	if (Graphics.needsRedraw)
	    Graphics.needsRedraw = false;
	else
	    return;
	
	Graphics.view.clearScreen();
	drawScene(Graphics);
	if (x <= 50)
	{
	    x++;
	    Graphics.needsRedraw = true;
	}
}

var commands = [];
commands.push((Graphics) => drawHeader5Text(Graphics.context, "Understanding Async Await", x, y));

commands.push((Graphics) => drawHeader1Text(Graphics.context, "Some key terms:", x, y+30));
commands.push((Graphics) => drawDefaultText(Graphics.context, "Task", x, y+60));
commands.push((Graphics) => drawDefaultText(Graphics.context, "Synchronization Context", x, y+80));
commands.push((Graphics) => drawDefaultText(Graphics.context, "Thread Scheduler", x, y+100));
function drawScene(Graphics)
{
	for (var i = 0; i < commands.length; i++)
	{
		commands[i](Graphics);
	}
}

function updateScene(Graphics)
{
	
}

function main() 
{
	Graphics = GraphicsSystem(document.getElementById("canvas"), new View2d());
	Graphics.initialize();
    setupCanvas();
   
   document.addEventListener("keydown", function(e) {
       e.preventDefault();
	   Graphics.needsRedraw = true;
	   canvas.focus();
	   if (e.keyCode == 91) // Mac command key
	   {
	       return;
       }
		   
       if (e.ctrlKey || commandKeyIsDown) {
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
           return;
       }
       if (e.keyCode == 38) { // up arrow key
           return;
       }
       if (e.keyCode == 39) { // right arrow key
           return;
       }
       if (e.keyCode == 40) { // down arrow key
           return;
       }
       if (code == 20) {  // capslock
       } else if (code == 13) {
	       // ENTER key pressed, move to next line
       } else if (code == 46) { // delete
       }
   });
   
   document.addEventListener("keyup", function(e) {
       e.preventDefault();
       var code = e.keyCode;
	   Graphics.canvas.focus();
	   
	   if (e.keyCode == 91) // Mac command key
	   {
	       return;
       }
		   
       if (code == 27) { // Escape
           return;
       }
	   if (code == 9) // tab
	   {
	   }
	   
	   if (code >= 49 && code <= 57) { // number keys
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

function setupCanvas()
{
   var canvas = Graphics.canvas;
   canvas.tabindex = "1";
   
   canvas.focus();
   canvas.addEventListener('mouseover', function(e) {
       canvas.focus();
   }); 
   canvas.addEventListener('mousewheel', function(e) {
       e.preventDefault();
	   Graphics.needsRedraw = true;
       var centerX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
       var centerY = document.body.scrollTop + e.clientY - canvas.offsetTop;
       if (e.wheelDelta > 0) {
       }
   }); 
   
   canvas.addEventListener("mousemove", function(e) {
       e.preventDefault();
	   Graphics.needsRedraw = true;
       if (e.shiftKey) {
	   }
       if (e.ctrlKey) {
	   }
   });
   
   canvas.addEventListener("mouseup", function(e) {
       if (e.shiftKey) {
           return;
       }
   });
   
   canvas.addEventListener("dblclick", function(e) {
   });
   
   canvas.addEventListener("mousedown", function(e) {
       e.preventDefault();
       Graphics.needsRedraw = true;
       canvas.focus();
       let mouseX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
       let mouseY = document.body.scrollTop + e.clientY - canvas.offsetTop;
   });
}

function drawOutlinedText(context, text, x, y, insideColor, outsideColor, pt, fontName)
{
	context.font = pt + 'pt ' + fontName;
	context.strokeStyle = outsideColor;
	context.fillStyle = insideColor;
	context.fillText(text, x, y);
	context.strokeText(text, x, y);
}

function drawDefaultText(context, text, x, y)
{
	drawOutlinedText(context, text, x, y, 'black','black',12,'Arial');
}

function drawHeader1Text(context, text, x, y)
{
	drawOutlinedText(context, text, x, y, 'cornflowerblue','black',16,'Arial');
}

function drawHeader5Text(context, text, x, y)
{
	drawOutlinedText(context, text, x, y, 'cornflowerblue','black',38,'Arial');
}

