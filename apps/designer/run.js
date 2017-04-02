function run()
{
    debug("running designer");
	
	setupControls("text", "freestyle line mode", "smooth keep corners", "Georgia", "Normal", "16", true);
	
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
	addLabel(div, "pagenumber");
	var arrowButtonWidth = 16;
	var arrowButtonHeight = 12;
	addIconButton(arrowButtonWidth, arrowButtonHeight, div, "", "Previous Page", function() { previousPage(); }, "previouspage2.jpg");
	addIconButton(arrowButtonWidth, arrowButtonHeight, div, "", "Next Page", function() { nextPage(); }, "nextpage2.jpg");
	addLabel(div, "editmode");
	var modes = ["text", "draw", "points"];
	addChooser(div, "mode", modes, inputMode, function() { switchMode(); });
	addButton(div, "red", "      ", function() { setColor("rgb(255, 0, 0)"); });
	addButton(div, "green", "      ", function() { setColor("rgb(0, 102, 0)"); });
	addButton(div, "blue", "      ", function() { setColor("rgb(0, 0, 255)"); });
	addButton(div, "yellow", "      ", function() { setColor("rgb(200, 200, 0)"); });
	addButton(div, "brown", "      ", function() { setColor("brown"); });
	addButton(div, "black", "      ", function() { setColor("black"); });
	addButton(div, "orange", "      ", function() { setColor("rgb(255, 140, 0)"); });
	addButton(div, "purple", "      ", function() { setColor("rgb(148, 0, 211)"); });
	var hideSymbol = "+";
	if (!hideControls)
	    hideSymbol = "-";
	addButton(div, "hidecontrols", hideSymbol, function() { showHideControls(); });
	
	if (hideControls)
	    return;
		
	addBreak(div);
	
	addLabel(div, "textstyles");
	var fonts = ["Arial", "Calibri", "Comic Sans Ms", "Courier", "Cursive", "Fantasy",
	             "Geneva", "Georgia", "Helvetica", "Impact", "Lucida Console",
				 "Monaco", "Times New Roman", "Verdana"];
	addChooser(div, "fontchooser", fonts, currentFont, function() {  });
	var fontStyles = [ "Normal", "Bold", "Italic" ];
	addChooser(div, "fonttype", fontStyles, currentFontType, function() { });
	var fontSizes = [ "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32" ];
	addChooser(div, "fontsize", fontSizes, currentFontSize, function() { });
	
	addLabel(div, "linestyles");
	var lineModes = ["freestyle line mode", "straight line mode"];
	addChooser(div, "linemode", lineModes, lineMode, function() { setLineMode(); });
	var smoothModes = ["smooth draw", "smooth keep corners", "raw draw"];
	addChooser(div, "smoothmode", smoothModes, smoothMode, function() { setSmoothMode(); });
	
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