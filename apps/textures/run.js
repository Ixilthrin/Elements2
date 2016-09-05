function run()
{
    debug("running textures");
	
	setupControls();
	
	main();
}

function setupControls()
{
	var body = document.getElementsByTagName("body").item(0);
	addCanvas(body, "700", "700", "canvas", "1");
}
