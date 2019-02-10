// main.js for the ToUnderstand project
// Global sub-systems
var Graphics;
var UserInput;

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
    var view = new View2d();
	Graphics = GraphicsSystem(document.getElementById("canvas"), view);
	Graphics.initialize();
    UserInput = UserInputSystem(document, Graphics.canvas);
    UserInput.initialize();
    
    draw();
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

