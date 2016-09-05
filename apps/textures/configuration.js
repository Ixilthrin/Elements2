var scripts = new Array();
scripts.push("../../html/factory.js");
scripts.push("../../debugging/debugging.js");
scripts.push("../../geometry2d/shapes.js");
scripts.push("../../geometry2d/polyline.js");
scripts.push("../../textedit/edittext.js");
scripts.push("../../graphics2d/texture_util.js");
scripts.push("run.js");
scripts.push("textures_main.js");

var debugging = false;

function configureAndRun()
{
    loadNextScript(0);
}

function loadNextScript(index)
{
    if (index >= scripts.length)
	{
	    run();
	    return;
    }
		
    var body = document.getElementsByTagName("body").item(0);
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = scripts[index];
	body.appendChild(script);
	script.onload = function() { loadNextScript(index + 1); }
}

function isDebugging()
{
    return debugging;
}
