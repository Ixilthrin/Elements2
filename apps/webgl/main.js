// main.js for the Graph project
var Graphics;
var UserInput;
var TextDrawing;
var ImageUtility;
var SceneController;

// This is an active canvas due to this loop with continuous updating
function draw() 
{
    SceneController.draw();
    if (!SceneController.update()) {
        if (!SceneController.reset())
            return;
    }
    requestAnimationFrame(draw);
}

function main() 
{
    var view = new View3d();
	Graphics = GraphicsSystem(document.getElementById("canvas"), view);
	Graphics.initialize();
    UserInput = UserInputSystem(document, Graphics.canvas);
    UserInput.initialize();
    TextDrawing = TextDrawingUtil();
    ImageUtility = ImageUtil(Graphics, TextDrawing);
    SceneController = Graph(Graphics, TextDrawing, ImageUtility);
    SceneController.initialize();
    //alert();
    draw();
}

