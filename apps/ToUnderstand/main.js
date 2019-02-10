// main.js for the ToUnderstand project
// Global sub-systems
var Graphics;
var UserInput;
var TextDrawing;

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
commands.push((Graphics) => TextDrawing.drawHeader5Text(Graphics.context, "Understanding Async Await", x, y));

commands.push((Graphics) => TextDrawing.drawHeader1Text(Graphics.context, "Some key terms:", x, y+30));
commands.push((Graphics) => TextDrawing.drawDefaultText(Graphics.context, "Task", x, y+60));
commands.push((Graphics) => TextDrawing.drawDefaultText(Graphics.context, "Synchronization Context", x, y+80));
commands.push((Graphics) => TextDrawing.drawDefaultText(Graphics.context, "Thread Scheduler", x, y+100));
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
    var view = new View2d();
	Graphics = GraphicsSystem(document.getElementById("canvas"), view);
	Graphics.initialize();
    UserInput = UserInputSystem(document, Graphics.canvas);
    UserInput.initialize();
    TextDrawing = TextDrawingUtil();
    draw();
}

