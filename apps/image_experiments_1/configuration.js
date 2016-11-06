var scripts = new Array();
scripts.push("../../geometry2d/shapes.js");
scripts.push("../../geometry2d/polyline.js");
scripts.push("../../html/factory.js");
scripts.push("run.js");
scripts.push("view2d.js");
scripts.push("graphics_main.js");

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
	script.src = scripts[index] + "?v=12";  // Adding a version to force browser to reload the resource
	body.appendChild(script);
	script.onload = function() { loadNextScript(index + 1); }
}
