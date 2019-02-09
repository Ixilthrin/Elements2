function run()
{
	setupControls();
	
	main();
}

function setupControls(inputMode, lineMode, smoothMode, currentFont, 
                       currentFontType, currentFontSize, hideControls)
{
	var body = document.getElementsByTagName("body").item(0);
	var div = document.getElementsByTagName("div").item(0);
	var canvas = document.getElementById("canvas");
	if (canvas != null)
	    body.removeChild(canvas);
	while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
		
	addCanvas(body, "canvas", "1");
}