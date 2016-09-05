function run()
{
    debug("running designer");
	
	setupControls();
	
	main();
}

function setupControls()
{
	var body = document.getElementsByTagName("body").item(0);
	var div = document.getElementsByTagName("div").item(0);
	addCanvas(body, "1000", "540", "canvas", "1");
}