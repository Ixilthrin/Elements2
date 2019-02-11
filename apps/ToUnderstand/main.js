// main.js for the ToUnderstand project
var Graphics;
var UserInput;
var TextDrawing;
var SceneController;

// This is an active canvas due to this loop with continuous updating
function draw() 
{
    requestAnimationFrame(draw);
    if (Graphics.needsRedraw)
        Graphics.needsRedraw = false;
    else
        return;
	
    Graphics.view.clearScreen();
    SceneController.draw();
    SceneController.update();
}

function main() 
{
    var view = new View2d();
	Graphics = GraphicsSystem(document.getElementById("canvas"), view);
	Graphics.initialize();
    UserInput = UserInputSystem(document, Graphics.canvas);
    UserInput.initialize();
    TextDrawing = TextDrawingUtil();
    
    //SceneController = AsyncAwaitLecture(Graphics, TextDrawing);
    SceneController = RandomChess(Graphics, TextDrawing);
    
    SceneController.initialize();
    draw();
}

