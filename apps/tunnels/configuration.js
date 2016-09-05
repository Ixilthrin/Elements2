var scripts = new Array();
scripts.push("../../projection/Frustum.js");
scripts.push("../../html/factory.js");
scripts.push("../../debugging/debugging.js");
scripts.push("../../geometry2d/shapes.js");
scripts.push("../../geometry2d/polyline.js");
scripts.push("../../textedit/edittext.js");
scripts.push("run.js");
scripts.push("view2d.js");
scripts.push("view3d.js");
scripts.push("tunnels_main.js");

var debugging = false;

function configureAndRun()
{
    loadStyle();
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

function loadStyle()
{
    var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "style.css";
	
	var head = document.getElementsByTagName("head").item(0);
	head.appendChild(link);
}
