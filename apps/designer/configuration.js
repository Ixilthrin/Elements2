var scripts = new Array();

// Note the versions are arbitrary but these were added
// so the resource would reload.  Otherwise the browser
// was caching the source files and local changes
// were not taking affect.
scripts.push("../../projection/Frustum.js?v=12");
scripts.push("../../html/factory.js?v=12");
scripts.push("../../debugging/debugging.js?v=12");
scripts.push("../../geometry2d/shapes.js?v=13");
scripts.push("../../geometry2d/polyline.js?v=12");
scripts.push("../../textedit/edittext.js?v=12");
scripts.push("run.js?v=11");
scripts.push("view2d.js?v=12");
scripts.push("view3d.js?v=12");
scripts.push("designer_main.js?v=15");

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
