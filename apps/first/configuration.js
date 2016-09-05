var scripts = new Array();
scripts.push("debugging/debugging.js");
scripts.push("projection/Frustum.js");
scripts.push("apps/first/run.js");

var debugging = true;

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