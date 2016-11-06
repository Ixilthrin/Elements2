var scripts = new Array();
scripts.push("Frustum.js");
scripts.push("Noise.js");
scripts.push("run.js");
scripts.push("main.js");

var debugging = false;

function configureAndRun()
{
alert();
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
	script.src = scripts[index] + "?v=13";  // Adding a version to force browser to reload the resource
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
