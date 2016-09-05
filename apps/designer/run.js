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
	addBreak(body);
	var modes = ["text", "draw", "points"];
	addChooser(div, "mode", modes, 0, function() { switchMode(); });
	addIconButton(div, "", "Previous Page", function() { previousPage(); }, "previouspage.jpg");
	addIconButton(div, "", "Next Page", function() { nextPage(); }, "nextpage.jpg");
	addLabel(div, "pagenumber");
	addBreak(div);
	addButton(div, "red", "    ", function() { setColor("rgb(255, 0, 0)"); });
	addButton(div, "green", "    ", function() { setColor("rgb(0, 102, 0)"); });
	addButton(div, "blue", "    ", function() { setColor("rgb(0, 0, 255)"); });
	addButton(div, "yellow", "    ", function() { setColor("rgb(200, 200, 0)"); });
	addButton(div, "brown", "    ", function() { setColor("brown"); });
	addButton(div, "black", "    ", function() { setColor("black"); });
	addFontchooser(div, "fontchooser");
	addFonttype(div, "fonttype");
	addFontSizeChooser(div, "fontsize");
	addBreak(div);
	addIconButton(div, "", "Copy Selection", function() { copySelection(); }, "copysymbol.jpg");
	addIconButton(div, "", "Paste From Clipboard", function() { pasteSelection(); }, "paste.jpg");
	addIconButton(div, "", "Group Selected Items", function() { group_command(); }, "group.jpg");
	addIconButton(div, "", "Copy Page", function() { copyPage(); }, "copy.jpg");
	addIconButton(div, "", "Circlify", function() { circlify_command(); }, "circlify.jpg");
	addIconButton(div, "", "Rectify", function() { rectify_command(); }, "rectify.jpg");
	addIconButton(div, "", "Ellipsify", function() { ellipsify_command(); }, "ellipsify.jpg");
	addIconButton(div, "", "Smoothify", function() { smoothify_command(); }, "smoothify.jpg");
	addIconButton(div, "", "Straighten", function() { straighten_command(); }, "straighten.jpg");
	addIconButton(div, "", "Adjust Point Count", function() { adjust_point_count_command(); }, "adjustpoints.jpg");
	addIconButton(div, "", "Rotate Points", function() { rotate_points_command(); }, "rotate2.jpg");
	addIconButton(div, "", "Add Property", function() { add_property_command(); }, "add-property.jpg");
	addIconButton(div, "", "Clear All Properties", function() { clear_properties_command(); }, "clear-properties.jpg");
	addBreak(div);
	addIconButton(div, "", "Align Vertically", function() { alignVertical(); }, "vertical.jpg");
	addIconButton(div, "", "Align Horizontally", function() { alignHorizontal(); }, "horizontal.jpg");
	addIconButton(div, "", "Split Text Object", function() { split_command(); }, "split.jpg");
	addIconButton(div, "", "Join Selected Text Objects", function() { join_command(); }, "join.jpg");
	//addBreak(div);
	addIconButton(div, "", "Delete Selection", function() { deleteSelection(); }, "deletesymbol.jpg");
	addIconButton(div, "", "Delete Page", function() { deletePage(); }, "deletepage.jpg");
	addIconButton(div, "", "Clear All", function() { clearAll(); }, "clear.jpg");
	addIconButton(div, "", "Import From Text", function() { runCode(); }, "import.jpg");
	addIconButton(div, "", "Export To Text Page", function() { save(); }, "export.jpg");
	addIconButton(div, "", "Export To Generic Data", function() { export_simple_command(); }, "export-simple.jpg");
	addIconButton(div, "", "Insert Text From Textbox", function() { insertText(); }, "inserttext.jpg");
	addTextbox(div, "inserttext");
	addBreak(div);
	addTextarea(div, "code", 4, 84.7);
}