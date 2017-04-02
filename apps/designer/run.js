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
	addLabel(div, "pagenumber");
	var arrowButtonWidth = 16;
	var arrowButtonHeight = 12;
	addIconButton(arrowButtonWidth, arrowButtonHeight, div, "", "Previous Page", function() { previousPage(); }, "previouspage2.jpg");
	addIconButton(arrowButtonWidth, arrowButtonHeight, div, "", "Next Page", function() { nextPage(); }, "nextpage2.jpg");
	addButton(div, "red", "      ", function() { setColor("rgb(255, 0, 0)"); });
	addButton(div, "green", "      ", function() { setColor("rgb(0, 102, 0)"); });
	addButton(div, "blue", "      ", function() { setColor("rgb(0, 0, 255)"); });
	addButton(div, "yellow", "      ", function() { setColor("rgb(200, 200, 0)"); });
	addButton(div, "brown", "      ", function() { setColor("brown"); });
	addButton(div, "black", "      ", function() { setColor("black"); });
	addButton(div, "orange", "      ", function() { setColor("rgb(255, 140, 0)"); });
	addButton(div, "purple", "      ", function() { setColor("rgb(148, 0, 211)"); });
	addBreak(div);
	var modes = ["text", "draw", "points"];
	addChooser(div, "mode", modes, 0, function() { switchMode(); });
	var lineModes = ["freestyle line mode", "straight line mode"];
	addChooser(div, "linemode", lineModes, 0, function() { setLineMode(); });
	var smoothModes = ["smooth draw", "smooth keep corners", "raw draw"];
	addChooser(div, "smoothmode", smoothModes, 1, function() { setSmoothMode(); });
	
	addFontchooser(div, "fontchooser");
	addFonttype(div, "fonttype");
	addFontSizeChooser(div, "fontsize");
	addBreak(div);
	var iconButtonWidth = 18;
	var iconButtonHeight = 18;
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Copy Selection", function() { copySelection(); }, "copysymbol.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Paste From Clipboard", function() { pasteSelection(); }, "paste.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Group Selected Items", function() { group_command(); }, "group.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Copy Page", function() { copyPage(); }, "copy.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Circlify", function() { circlify_command(); }, "circlify.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Rectify", function() { rectify_command(); }, "rectify.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Ellipsify", function() { ellipsify_command(); }, "ellipsify.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Smoothify", function() { smoothify_command(); }, "smoothify.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Straighten", function() { straighten_command(); }, "straighten.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Adjust Point Count", function() { adjust_point_count_command(); }, "adjustpoints.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Rotate Points", function() { rotate_points_command(); }, "rotate2.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Add Property", function() { add_property_command(); }, "add-property.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Clear All Properties", function() { clear_properties_command(); }, "clear-properties.jpg");
	
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Align Vertically", function() { alignVertical(); }, "vertical.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Align Horizontally", function() { alignHorizontal(); }, "horizontal.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Split Text Object", function() { split_command(); }, "split.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Join Selected Text Objects", function() { join_command(); }, "join.jpg");
	
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Delete Selection", function() { deleteSelection(); }, "deletesymbol.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Delete Page", function() { deletePage(); }, "deletepage.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Clear All", function() { clearAll(); }, "clear.jpg");
	addBreak(div);
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Export To Text Page", function() { save(); }, "export.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Export To Generic Data", function() { export_simple_command(); }, "export-simple.jpg");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Insert Text From Textbox", function() { insertText(); }, "inserttext.jpg");
	addTextbox(div, "inserttext");
	addIconButton(iconButtonWidth, iconButtonHeight, div, "", "Import From Text", function() { runCode(); }, "import.jpg");
	addTextarea(div, "code", 1, 40);
}