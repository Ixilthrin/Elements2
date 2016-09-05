var dimension = 2;
var canvas;
var context;
var pages = new Array();
var thePage = new Object();
var pageIndex = 0;
pages.push(thePage);
thePage.boxes = new Array();
thePage.segments = new Array();
thePage.imageNamess = [];
thePage.images = [];
thePage.imageWidths = [];
thePage.imageHeights = [];
thePage.imagesX = new Array();
thePage.imagesY = new Array();
var textBackgroundColor = "rgba(255, 255, 255, 0)";
var backCanvas;
var backBuffer;

var startX = 50;
var startY = 50;
var text = new String();
var selectedIndices = [];
var segmentsSelectedIndices = [];
var pointsSelectedIndices = [];
var selectOffsetX = -1;
var selectOffsetY = -1;
var inputMode = "text";
var mouseIsDown = false;
var lineColor = "blue"
var lineWidth = 2;
var currentSegment = createSegment(new Array(), -1, lineWidth, lineColor, [], []); 
var selectionBoxInitialX = -1;
var selectionBoxInitialY = -1;
var selectionBoxFinalX = -1;
var selectionBoxFinalY = -1;
var mouseX = startX;
var mouseY = startY;
var minFontHeight = 14;
var fontHeight = 14;
var fontName = "Georgia";
var fontType = ""; // Normal
var maxWidth = 0;
var capsLock = false;
var currentMaxWidth = maxWidth;
var generatedDocument = null;
var titleSelected = false;
var currentRed = 0;
var currentGreen = 0;
var currentBlue = 0;

var firstClick = false;
var particleCount = 1000;
var particleSize = 4;
var copiedBoxes = new Array();
var copiedSegments = new Array();
var showPoints = false;
var needsRedraw = true;

var addingProperty = false;

function draw() 
{
    requestAnimationFrame(draw);
	
	if (needsRedraw)
	    needsRedraw = false;
	else
	    return;
	
	if (dimension == 2)
	{
	    eraseView2d(context);
	}
	else
	{
	    eraseView3d(context);
	}
	
    for (var i = 0; i < thePage.boxes.length; i++) {
        var isSelected = false;
        for (var z = 0; z < selectedIndices.length; z++) {
            if (selectedIndices[z] == i) {
                isSelected = true;
            }
        }
	    var textBox = thePage.boxes[i];
		var xPos = textBox.x;
		var yPos = textBox.y;
        drawTextInBox(textBox, xPos, yPos, isSelected, i);
	
	    if (isSelected && textBox.selectedImageData != undefined)
		{
		    if (dimension == 2)
	            drawTextbox2d(context, textBox.selectedImageData, xPos, yPos - textBox.fontHeight, textBox.width, textBox.height);
			else
	            drawTextbox3d(context, textBox.selectedImageData, xPos, yPos - textBox.fontHeight, textBox.width, textBox.height);
        }
	    else if (textBox.imageData != undefined)
		{
		    if (dimension == 2)
	            drawTextbox2d(context, textBox.imageData, xPos, yPos - textBox.fontHeight, textBox.width, textBox.height);
			else
	            drawTextbox3d(context, textBox.imageData, xPos, yPos - textBox.fontHeight, textBox.width, textBox.height);
		}
    }
	if (thePage.segments == null)
	    thePage.segments = new Array();

	
    // Draw the polylines
    if (inputMode != "points" && !showPoints)
    {
	    if (dimension == 2)
	        drawPolyline2d(thePage.segments);
		else
		    drawPolyline3d(thePage.segments);
    }

    // Draw the points
    if (inputMode == "points" || showPoints) {
	    if (dimension == 2)
	        drawPoints2d(thePage.segments);
		else
	        drawPoints3d(thePage.segments);
    }

    // Draw selection box
    if (selectionBoxInitialX > -1 && selectionBoxFinalX > -1) {
	    if (dimension == 2)
	        drawSelectionBox2d(selectionBoxInitialX, selectionBoxInitialY, selectionBoxFinalX, selectionBoxFinalY);
		else
	        drawSelectionBox3d(selectionBoxInitialX, selectionBoxInitialY, selectionBoxFinalX, selectionBoxFinalY);
    }
	
    if (text && text.length >= 0) {
        var newObject = {};
        newObject.text = text;
        newObject.fontHeight = fontHeight;
        newObject.fontName = fontName;
        newObject.fontType = fontType;
        newObject.textColor = lineColor;
        newObject.maxWidth = canvas.width - startX - 10;
        if (newObject.maxWidth < 0) {
            newObject.maxWidth = 0;
        }
        currentMaxWidth = newObject.maxWidth;
        drawTextInBox(newObject, startX, startY, false, thePage.boxes.length);
	
	    if (newObject.imageData != undefined)
		{
		    if (dimension == 2)
			{
	            drawTextbox2d(context, newObject.imageData, startX, startY - newObject.fontHeight);
			}
			else
			{
	            drawTextbox3d(context, newObject.imageData, startX, startY - newObject.fontHeight, newObject.width, newObject.height);
			}
		}
    }
	
	if (dimension == 3)
	    drawScene3d(context);
}

function drawTextInBox(box, xPos, yPos, isSelected, imageIndex)
{
    var theText = box.text;
    if (theText == undefined || theText.length < 1) {
	    box.imageData = undefined;
		box.selectedImageData = undefined;
        return;
    }
    var imagePath = theText.split()[0];
    var imageType = imagePath.substr(imagePath.length - 4);
    if (imageType == ".jpg" || imageType == ".gif" || imageType == ".png" || imageType == "bmp") {
        var createImage = true;
        var index = 0;
        for (; index < thePage.imageNamess.length; index++) {
            if (thePage.imageNamess[index] == imagePath) {
                createImage = false;
                break;
            }
        }
        if (createImage) {
            var newImage = new Image();
            newImage.src = theText;
            newImage.addEventListener("load", function() {
                thePage.imageNamess.push(imagePath);
                newImage.index = imageIndex;
                thePage.images.push(newImage);
                var newWidth = box.width;
                thePage.imageWidths.push(newWidth);
                thePage.imageHeights.push(newWidth * newImage.height / newImage.width);
                thePage.imagesX.push(0);
                thePage.imagesY.push(0);
            });
            index = thePage.images.length;
            theText += " (loading)";
        }
        if (thePage.images.length > index) {
            try {
            context.drawImage(thePage.images[index], xPos - 10, yPos - 32, thePage.imageWidths[index], thePage.imageHeights[index]);
            thePage.imagesX[index] = xPos - 10;
            thePage.imagesY[index] = yPos - 32;
            box.width = thePage.imageWidths[index];
            box.height = thePage.imageHeights[index];
            } catch (error) {}
			dirtyTextBox(box);
            return;
        }
    }
		
    var lineHeight = box.fontHeight;
    var boxMaxWidth = box.maxWidth;
    var lines = splitLines(backBuffer, theText, boxMaxWidth);
    var height = lines.length * lineHeight;
    var width = 0;
    backBuffer.font = box.fontType + " " + box.fontHeight + "px " + box.fontName;
    for (var i = 0; i < lines.length; i++) {
        var currentWidth = backBuffer.measureText(lines[i]).width;
        if (currentWidth > width) {
            width = currentWidth; 
        }
    }
	
	if ((box.height != height || box.width != width) && isSelected)
	{
	    dirtyTextBox(box);
	}
	
    box.width = width;
    box.height = height;
	if ((box.imageData == undefined && !isSelected) || (box.selectedImageData == undefined && isSelected))
	{
        backBuffer.font = box.fontType + " " + box.fontHeight + "px " + box.fontName;
        backBuffer.clearRect(0, 0, backCanvas.width, backCanvas.height);
        backBuffer.strokeStyle = "blue";
        backBuffer.fillStyle = lineColor;
		backBuffer.lineWidth = 1;
		backBuffer.beginPath();
		backBuffer.moveTo(xPos - 6, yPos - lineHeight + .2 * lineHeight);
		backBuffer.lineTo(xPos + width, yPos - lineHeight + .2 * lineHeight);
		backBuffer.lineTo(xPos + width, yPos + 6 + height - lineHeight + .2 * lineHeight);
		backBuffer.lineTo(xPos - 6, yPos + 6 + height - lineHeight + .2 * lineHeight);
		backBuffer.lineTo(xPos - 6, yPos - lineHeight + .2 * lineHeight);
		backBuffer.fillStyle = textBackgroundColor;
		if (isSelected)
		{
			backBuffer.fillStyle = getBackgroundGray();
		} 
		backBuffer.fill();
		
		if (box.textColor == undefined) {
			box.textColor = lineColor;
		}
		backBuffer.fillStyle = box.textColor;
		for (var i = 0; i < lines.length; i++) {
			var x = xPos;
			var y = yPos;
			backBuffer.fillText(lines[i], x, y + i * lineHeight);
		}
		
		box.height = lines.length * lineHeight;
		
		if (isSelected)
		{
		    box.selectedImageData = backBuffer.getImageData(xPos, yPos - lineHeight, box.width, box.height * 1.5);
		}
		else
		{
		    box.imageData = backBuffer.getImageData(xPos, yPos - lineHeight, box.width, box.height * 1.5);
		}
	}
}

function dirtyTextBox(box)
{
	needsRedraw = true;
	box.imageData = undefined;
	box.selectedImageData = undefined;
}

function runCommand(command)
{
    if (command == "showpoints")
	    showPoints = !showPoints;
	else if (command == "normalize")
	    adjust_point_count_command();
	else if (command == "group")
	    group_command();
	else if (command == "textmode")
	    inputMode = "text"
	else if (command == "pointmode")
	    inputMode = "points"
	else if (command == "drawmode")
	    inputMode = "draw"
		
	needsRedraw = true;
	    
}

function createPage()
{
    var page = new Object();
    page.boxes = new Array();
    page.segments = new Array();
    page.imageNamess = [];
    page.images = [];
    page.imageWidths = [];
    page.imageHeights = [];
    return page;
}

// Backwards compatibility
function createTextObject(text, x, y, width, height, fontHeight,
                          color, maxWidth, time, keys, values)
{

	needsRedraw = true;
    return createTextObject2(text, x, y, width, height, fontHeight, fontName, fontType, color, maxWidth, time, keys, values);
}

// In version 2 fontName and fontType were added to the arguments
function createTextObject2(text, x, y, width, height, fontHeight, fontName,
                           fontType, color, maxWidth, time, keys, values)
{
	needsRedraw = true;
    var t = new Object();
    t.text = text;
    t.x = x;
    t.y = y;
    t.width = width;
    t.height = height;
    t.fontHeight = fontHeight;
    t.fontName = fontName;
    t.fontType = fontType;
    t.textColor = color;
    t.maxWidth = maxWidth;
    t.time = time;
    t.properties = new Object();
	if (keys == undefined || keys == null)
	{
	    keys = [];
		values = [];
    }
    t.properties.keys = keys;
    t.properties.values = values;
    return t;
}

function createSegment(coords, parentIndex, width, color, keys, values) 
{
	needsRedraw = true;
    var segment = new Object();
    segment.values = coords;
    segment.parentIndex = parentIndex;
    segment.width = width;
    segment.color = color;
    segment.properties = new Object();
    segment.properties.keys = keys;
    segment.properties.values = values;
    segment.minX = 1000;
    segment.maxX = 0;
    segment.minY = 1000;
    segment.maxY = 0;
    updateSegmentBounds(segment);
    return segment;
}

function getBackgroundGray()
{
   var grayVal = 230;
   return "rgb(" + grayVal + "," + grayVal + "," + grayVal + ")";
}

function switchMode()
{
	needsRedraw = true;
    var modeElement = document.getElementById("mode");
    if (modeElement) {
	    inputMode = modeElement.value;
    }
}

var groupNames = new Array();

function add_property_command()
{
    addingProperty = true;
}

function clear_properties_command()
{
	for (var i = 0; i < selectedIndices.length; i++)
	{
		var boxObject = thePage.boxes[selectedIndices[i]];
		boxObject.properties = {};
		boxObject.properties.keys = [];
		boxObject.properties.values = [];
	}
	for (var i = 0; i < segmentsSelectedIndices.length; i++)
	{
		var segmentObject = thePage.segments[segmentsSelectedIndices[i]];
		segmentObject.properties = {};
		segmentObject.properties.keys = [];
		segmentObject.properties.values = [];
	}
}

function group_command()
{
	needsRedraw = true;
    var name = 1;
    while (groupNames.indexOf(name.toString()) > -1)
    {
        name = name + 1;
    }
    groupNames.push(name.toString());
    for (var i = 0; i < selectedIndices.length; i = i + 1) 
    {
        var ob = thePage.boxes[selectedIndices[i]];
        var index = getGroupIndex(ob);
        if (index > -1) 
        {
            ob.properties.values[index] = name;
        }
        else
        {
            if (ob.properties == undefined)
            {
                ob.properties = new Object();
                ob.properties.keys = new Array();
                ob.properties.values = new Array();
            }
            ob.properties.keys.push("group");
            ob.properties.values.push(name);
        }
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i = i + 1) 
    {
        var ob = thePage.segments[segmentsSelectedIndices[i]];
        var index = getGroupIndex(ob);
        if (index > -1) 
        {
            ob.properties.values[index] = name;
        }
        else
        {
            if (ob.properties == undefined)
            {
                ob.properties = new Object();
                ob.properties.keys = new Array();
                ob.properties.values = new Array();
            }
            ob.properties.keys.push("group");
            ob.properties.values.push(name);
        }
    }
}

function circlify_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
        segment.values = circlify(segment.values);
    }
}

function rotate_points_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
	var xCenters = [];
	var yCenters = [];
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
		var center = [];
		center = getCenter(segment.values);
	    xCenters.push(center[0]);
	    yCenters.push(center[1]);
    }
	var xSum = 0;
	var ySum = 0;
	for (var i = 0; i < xCenters.length; i = i + 1)
	{
	    xSum = xSum + xCenters[i];
		ySum = ySum + yCenters[i];
	}
	var center = [];
	center.push(xSum / xCenters.length);
	center.push(ySum / xCenters.length);
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
        segment.values = rotatePoints(segment.values, Math.PI / 18, center);
    }
}

function ellipsify_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
        segment.values = ellipsify(segment.values);
    }
}

function rectify_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
        segment.values = rectify(segment.values, segment.width);
    }
}

function smoothify_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
    for (var s = 0; s < 10; s++) {
        for (var i = 0; i < segmentsSelectedIndices.length; i++) {
            var segment = thePage.segments[segmentsSelectedIndices[i]];
            segment.values = smoothify(segment.values);
        }
    }
}

function straighten_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
        segment.values = straighten(segment.values);
    }
}

function adjust_point_count_command()
{
	needsRedraw = true;
    if (segmentsSelectedIndices.length == 0) {
        return;
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        var segment = thePage.segments[segmentsSelectedIndices[i]];
        segment.values = adjustPointCount(segment.values, 8);
    }
}

function split_command() {
	needsRedraw = true;
    var i;
    var j;
    for (i = 0; i < selectedIndices.length; i++) {
        var o = thePage.boxes[selectedIndices[i]];
        if (o.keys == undefined) {
            o.keys = new Array();
        }
        if (o.values == undefined) {
            o.values = new Array();
        }
        var splitText = o.text.split(" "); 
        var curX = o.x;
        var curY = o.y;
        for (j = 0; j < splitText.length; j++) {
            var newText = splitText[j];
            thePage.boxes.push(createTextObject2(splitText[j], curX, curY, o.width, o.height, o.fontHeight, o.fontName, o.fontType, o.color, o.maxWidth, o.time, o.keys, o.values));
            context.font = o.fontType + " " + o.fontHeight + "px " + o.fontName;
            var textLength = context.measureText(newText).width;
            curX += textLength + context.measureText(" ").width;
        }
    }
    selectedIndices.sort();
    for (i = selectedIndices.length - 1; i >= 0; i--) {
        thePage.boxes.splice(selectedIndices[i], 1);
    }
    selectedIndices = new Array();
}

function join_command() {
    if (selectedIndices.length < 2)
	    return;
		
	needsRedraw = true;
    var boxes = [];
	var i = 0;
    for (i = 0; i < selectedIndices.length; i++) {
	    boxes.push(thePage.boxes[selectedIndices[i]]);
	}
		
	boxes = sortByPositions(boxes, compareX);
	boxes = sortByPositions(boxes, compareY);
	
    var newText = boxes[0].text;
    for (i = 1; i < boxes.length; i++) {
        newText += " " + boxes[i].text;
    }
	
    for (i = selectedIndices.length - 1; i >= 0; i--) {
        thePage.boxes.splice(selectedIndices[i], 1);
    }
	selectedIndices = [];
	
    var o = boxes[0];
	
	var newBox = createTextObject2(newText, o.x, o.y, o.width, o.height, o.fontHeight, o.fontName, o.fontType, o.color, o.maxWidth, o.time, o.keys, o.values)
    thePage.boxes.push(newBox);
    
	dirtyTextBox(newBox);
}

function setColor(color)
{
	needsRedraw = true;
    lineColor = color;
	updateSelectionColor();
}

function updateSelectionColor()
{
	needsRedraw = true;
    for (var i = 0; i < selectedIndices.length; i++) {
       thePage.boxes[selectedIndices[i]].textColor = lineColor;
	   thePage.boxes[selectedIndices[i]].imageData = undefined;
	   thePage.boxes[selectedIndices[i]].selectedImageData = undefined;
    }
    for (i = 0; i < segmentsSelectedIndices.length; i++) {
       thePage.segments[segmentsSelectedIndices[i]].color = lineColor;
    }
}

function escapeSpecialSymbols(oldText)
{
        var text = "";
        for (var c = 0; c < oldText.length; c++) {
            var char = oldText.charAt(c);
            if (char == '"') {
                text += "\\\"";
            } else if (char == "<") {
                text += "&lt;";
            } else if (char == ">") {
                text += "&gt;";
            } else {
                text += char;
            }
        }
		return text;
}

function export_simple_command()
{
    addCurrentText();
    var newWin = window.open();
    var doc = newWin.document;
	
    var thePage = pages[pageIndex]; 
	
	var boxes = sortByPositions(thePage.boxes, compareX);
	boxes = sortByPositions(boxes, compareY);
	
    doc.write("var stringObjects = [");
	doc.write("<br>");
	
    for (var i = 0; i < boxes.length; i++) {
        var b = boxes[i];
        if (b.text == undefined || b.text == null || b.text.length == 0)
		    continue;
			
        var tempText = b.text;
		var text = escapeSpecialSymbols(tempText);
  
        doc.write("{ text:\"" + text + "\"");
		if (b.properties != undefined && b.properties != null)
		{
		    doc.write(", keys:[");
		    for (var j = 0; j < b.properties.keys.length; j++)
			{
			    doc.write("\"" + b.properties.keys[j] + "\"");
				if (j < b.properties.keys.length - 1)
				    doc.write(",");
			}
			doc.write("]");
		    doc.write(", values:[");
		    for (var j = 0; j < b.properties.values.length; j++)
			{
			    doc.write("\"" + b.properties.values[j] + "\"");
				if (j < b.properties.values.length - 1)
				    doc.write(",");
			}
			doc.write("]");
		}
		doc.write("}");
		if (i < thePage.boxes.length - 1)
		    doc.write(", <br>");
    }
    doc.write("<br>];<br>");
		doc.write("<br>");
	
	doc.write("var segmentObjects = [");
    for (var i = 0; i < thePage.segments.length; i++) {
        var segment = thePage.segments[i];
        var coords = "[";
		var j = 0;
        for (j = 0; j < segment.values.length - 1; j++) {
            coords += Math.round(segment.values[j]) + ", ";
        }
		coords += Math.round(segment.values[j]);
        coords += "]";
        doc.write("<br>{");
		doc.write("<br>");
		doc.write("coords : " + coords);
		if (segment.properties != undefined && segment.properties != null)
		{
		    doc.write(", ");
			doc.write("<br>keys:[");
		    for (var j = 0; j < segment.properties.keys.length; j++)
			{
			    doc.write("\"" + segment.properties.keys[j] + "\"");
				if (j < segment.properties.keys.length - 1)
				    doc.write(",");
			}
			doc.write("]");
		    doc.write(", <br>values:[");
		    for (var j = 0; j < segment.properties.values.length; j++)
			{
			    doc.write("\"" + segment.properties.values[j] + "\"");
				if (j < segment.properties.values.length - 1)
				    doc.write(",");
			}
			doc.write("]");
		}
        doc.write("<br>");
		doc.write("}");
		if (i < thePage.segments.length - 1)
		    doc.write(",");
    }
    doc.write("<br>");
	doc.write("];");
    doc.write("<br>");
}

function save()
{
    addCurrentText();
    var newWin = window.open();
    var doc = newWin.document;

    var currentIndex = pageIndex;

    doc.write("<code>");
    doc.write("<br>");
    doc.write("pages = new Array();");
    doc.write("<br>");
    for (var i = 0; i < pages.length; i++) {
        doc.write("pages.push(createPage());");
        doc.write("<br>");
        savePage(doc, i);
    }
    doc.write("thePage = pages[0];");
    doc.write("<br>");
    doc.write("pageIndex = 0;");
    doc.write("<br>");
    doc.write("</code>");
    doc.write("<br>");
 
    pageIndex = currentIndex;
    thePage = pages[pageIndex];
}

function savePage(doc, pageIndex)
{
    var thePage = pages[pageIndex]; 
    for (var i = 0; i < thePage.boxes.length; i++) {
        var b = thePage.boxes[i];
		
        var tempText = b.text;
		var text = escapeSpecialSymbols(tempText);

        var x = b.x;
        var y = b.y;
        var width = b.width;
        var height = b.height;
        var fontHeight = b.fontHeight;
        var fontName = b.fontName;
        var fontType = b.fontType;
        var textColor;
        if (b.textColor == undefined) {
            textColor = "blue";
        } else {
            textColor = b.textColor;
        }
        var maxWidth = b.maxWidth;
        var time;
        if (b.time == undefined) {
            var date = new Date();
            time = date.getTime();
        } else {
            time = b.time;
        }
        var keys = "[";
        var values = "[";
        if (b.properties == undefined) {
            keys = "[]";
            values = "[]";
        } else {
            var length = b.properties.keys.length;
            for (var k = 0; k < length; k++) {
                keys += "\"" + b.properties.keys[k] + "\"" + ", "; 
            }
            keys += "]";

            length = b.properties.values.length;
            for (var k = 0; k < length; k++) {
                values += "\"" + b.properties.values[k] + "\"" + ", "; 
            }
            values += "]";
        }
        doc.write("pages[" + pageIndex + "].boxes.push(createTextObject2(\"" + text + "\", " + x + "," + y + "," + width + "," + height + "," + fontHeight + ", \"" + fontName + "\"," + "\"" + fontType + "\"," + "\"" + textColor + "\"," + maxWidth + "," + time + "," + keys + "," + values +"));");
        doc.write("<br>");
    }
    for (var i = 0; i < thePage.segments.length; i++) {
        var segment = thePage.segments[i];
        var coords = "[";
        for (var j = 0; j < segment.values.length; j++) {
            coords += segment.values[j] + ", ";
        }
        coords += "]";
        var parentIndex = segment.parentIndex;
        var width = segment.width;
        var color = segment.color;
        var keys = "[";
        var values = "[";
        if (segment.properties == undefined) {
            keys = "[]";
            values = "[]";
        } else {
            var length = segment.properties.keys.length;
            for (var k = 0; k < length; k++) {
                keys += "\"" + segment.properties.keys[k] + "\"" + ", "; 
            }
            keys += "]";

            length = segment.properties.values.length;
            for (var k = 0; k < length; k++) {
                values += "\"" + segment.properties.values[k] + "\"" + ", "; 
            }
            values += "]";
        }
        doc.write("pages[" + pageIndex + "].segments.push(createSegment(" + coords + "," + parentIndex + ", " + width + ", \"" + color + "\", " + keys + "," + values + "));");
        doc.write("<br>");
    }
}

function alignHorizontal()
{
	needsRedraw = true;
    if (selectedIndices.length < 2) {
        return;
    }
    var y = 0;
    for (var i = 0; i < selectedIndices.length; i++) {
        y = y + thePage.boxes[selectedIndices[i]].y;
    }
    y = Math.floor(y / selectedIndices.length);
    for (var i = 0; i < selectedIndices.length; i++) {
        thePage.boxes[selectedIndices[i]].y = y;
    }
}

function alignVertical()
{
	needsRedraw = true;
    if (selectedIndices.length > 1) {
        var x = 0;
        for (var i = 0; i < selectedIndices.length; i++) {
            x = x + thePage.boxes[selectedIndices[i]].x;
        }
        x = Math.floor(x / selectedIndices.length);
        for (var i = 0; i < selectedIndices.length; i++) {
            thePage.boxes[selectedIndices[i]].x = x;
        }
    }
}

function copyBox(box) 
{
	needsRedraw = true;
    var newBox = new Object();
    newBox.text = box.text;
    newBox.maxWidth = box.maxWidth;
    newBox.x = box.x; 
    newBox.y = box.y; 
    if (box.textColor == undefined) {
        box.textColor = "black";
    }
    newBox.textColor = box.textColor;
    newBox.width = box.width;
    newBox.height = box.height;
    newBox.fontHeight = box.fontHeight;
    if (box.fontName == undefined) {
        box.fontName = "Georgia";
    }
    newBox.fontName = box.fontName;
    if (box.fontType == undefined) {
        box.fontType = "";
    }
    newBox.fontType = box.fontType;
    newBox.time = box.time;
    newBox.properties = new Object();
    newBox.properties.keys = new Array();
    newBox.properties.values = new Array();
    return newBox;
}

function updateSegmentBounds(segment) {
	needsRedraw = true;
    if (segment.values.length < 2) {
        return;
    }
    segment.minX = segment.values[0];
    segment.maxX = segment.values[0];
    segment.minY = segment.values[1];
    segment.maxY = segment.values[1];
    var i = 0;
    for (i = 0; i < segment.values.length; i += 2) {
        var x = segment.values[i];
        var y = segment.values[i + 1];
        if (x < segment.minX) {
            segment.minX = x;
        }
        if (x > segment.maxX) {
            segment.maxX = x;
        }
        if (y < segment.minY) {
            segment.minY = y;
        }
        if (y > segment.maxY) {
            segment.maxY = y;
        }
    }
}

function addPointToSegment(segment, x, y) {
	needsRedraw = true;
    segment.values.push(x);
    segment.values.push(y);
    if (x < segment.minX) {
        segment.minX = x;
    }
    if (x > segment.maxX) {
        segment.maxX = x;
    }
    if (y < segment.minY) {
        segment.minY = y;
    }
    if (y > segment.maxY) {
        segment.maxY = y;
    }
}

function copySegment(segment) 
{
	needsRedraw = true;
    var newSegment = new Object();
    newSegment.properties = new Object();
    newSegment.properties.keys = new Array();
    newSegment.properties.values = new Array();
    newSegment.parentIndex = -1;
    newSegment.width = segment.width;
    newSegment.color = segment.color;
    newSegment.values = new Array();
    newSegment.minX = segment.minX;
    newSegment.maxX = segment.maxX;
    newSegment.minY = segment.minY;
    newSegment.maxY = segment.maxY;
    for (var j = 0; j < segment.values.length; j++) {
        newSegment.values.push(segment.values[j]);
    }
    return newSegment;
}

function copySelection() 
{
	needsRedraw = true;
    copiedBoxes = new Array();
    copiedSegments = new Array();

    for (var i = 0; i < selectedIndices.length; i++) {
        copiedBoxes.push(copyBox(thePage.boxes[selectedIndices[i]]));
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        copiedSegments.push(copySegment(thePage.segments[segmentsSelectedIndices[i]]));
    }
}

function pasteSelection()
{
	needsRedraw = true;
    var i = 0; 
    var j = 0; 
    var changeX = 0; 
    var changeY = 0; 
    selectedIndices = [];
    segmentsSelectedIndices = [];
    if (copiedBoxes.length > 0) {
        changeX = copiedBoxes[0].x - startX;
        changeY = copiedBoxes[0].y - startY;
    } else if (copiedSegments.length > 0 && copiedSegments[0].values.length > 1) {
        changeX = copiedSegments[0].values[0] - startX;
        changeY = copiedSegments[0].values[1] - startY;
    }
    for (i = 0; i < copiedBoxes.length; i++) {
        copiedBoxes[i].x -= changeX;
        copiedBoxes[i].y -= changeY;
        thePage.boxes.push(copiedBoxes[i]);
        selectedIndices.push(thePage.boxes.length - 1);
    }
    for (i = 0; i < copiedSegments.length; i++) {
        for (j = 0; j < copiedSegments[i].values.length; j += 2) {
            copiedSegments[i].values[j] = copiedSegments[i].values[j] - changeX;
            copiedSegments[i].values[j + 1] = copiedSegments[i].values[j + 1] - changeY;
        }
        thePage.segments.push(copiedSegments[i]);
        updateSegmentBounds(copiedSegments[i]);
        segmentsSelectedIndices.push(thePage.segments.length - 1);
    }
    copySelection();
}

function copyPage()
{
	needsRedraw = true;
    thePage = pages[pageIndex];
    var newPage = new Object();
    newPage.boxes = new Array();
    for (var i = 0; i < thePage.boxes.length; i++) {
        var box = new Object();
        box.x = thePage.boxes[i].x;
        box.y = thePage.boxes[i].y;
        box.fontHeight = thePage.boxes[i].fontHeight;
        if (thePage.boxes[i].fontName == undefined) {
            thePage.boxes[i].fontName = "Georgia";
        }
        box.fontName = thePage.boxes[i].fontName;
        if (thePage.boxes[i].fontType == undefined) {
            thePage.boxes[i].fontType = "";
        }
        box.fontType = thePage.boxes[i].fontType;
        if (thePage.boxes[i].textColor == undefined) {
            thePage.boxes[i].textColor = "black";
        }
        box.textColor = thePage.boxes[i].textColor;
        box.width = thePage.boxes[i].width;
        box.height = thePage.boxes[i].height;
        box.text = thePage.boxes[i].text;
        box.maxWidth = thePage.boxes[i].maxWidth;
        if (thePage.boxes[i].time == undefined) {
            var date = new Date();
            box.time = date.getTime();
        } else {
            box.time = thePage.boxes[i].time;
        }
        if (thePage.boxes[i].properties == undefined) {
            box.properties = new Object();
            box.properties.keys = new Array();
            box.properties.values = new Array();
        } else {
            box.properties = thePage.boxes[i].properties;
        }
        newPage.boxes.push(box);
    }
    newPage.segments = new Array();
    for (var i = 0; i < thePage.segments.length; i++) {
        var newSegment = copySegment(thePage.segments[i]);
        newPage.segments.push(newSegment);
    }
    newPage.imageNamess = [];
    newPage.images = [];
    newPage.imageWidths = [];
    newPage.imageHeights = [];
    for (var i = 0; i < thePage.images.length; i++) {
        newPage.imageNamess = thePage.imageNamess[i];
        newPage.images = thePage.images[i];
        newPage.imageWidths = thePage.imageWidths[i];
        newPage.imageHeights = thePage.imageHeights[i];
    }
    pages.push(newPage);
    pageChanged();
    pageIndex = pages.length - 1;
    thePage = pages[pageIndex];
    updatePage();
}

function deletePage()
{
	needsRedraw = true;
    for (var i = pageIndex; i < pages.length; i++) {
        pages[i] = pages[i + 1];
    }
    pages = pages.slice(0, pages.length - 1);
    if (pageIndex >= pages.length) {
        pageIndex = pages.length - 1;
    }
    if (pageIndex < 0) {
        pageIndex = 0;
    }
    if (pages.length == 0) {
        pageIndex = -1;
        nextPage();
        return;
    }
    pageChanged();
    thePage = pages[pageIndex];
    updatePage();
}

var frustum = new Frustum();

// Returns true if something was selected.
function checkCursorIntersection(x, y, add)
{
/*
    var front = frustum.convertScreenToWorld(x, y, canvas.width, canvas.height);
    var back = frustum.convertScreenToBackPlane(x, y, canvas.width, canvas.height);
	var point = [0, 0, 0, 0];
    var dist = frustum.distanceFromSegmentToPoint(front, back, point);
	alert("dist = " + dist)
	*/
	
    var somethingSelected = false;
    for (var i = 0; i < thePage.boxes.length; ++i) {
        var textBoxWidth = thePage.boxes[i].width;
        var textBoxHeight = thePage.boxes[i].height;
        var lineHeight = thePage.boxes[i].fontHeight;
        if (x >= thePage.boxes[i].x && x <= thePage.boxes[i].x + textBoxWidth && y >= thePage.boxes[i].y - lineHeight && y <= thePage.boxes[i].y + textBoxHeight- lineHeight) {
            if (thePage.boxes[i].text.substring(0, 1) == "!")
			{
			    runCommand(thePage.boxes[i].text.substring(1, thePage.boxes[i].text.length));
				if (add)
				    return false;
			}
			somethingSelected = true;
            if (selectedIndices.indexOf(i) < 0) {
                if (!add) {
				    if (addingProperty)
					{
					    addPropertyForSelection(thePage.boxes[i]);
						addingProperty = false;
					}
                    selectedIndices = [];
                    segmentsSelectedIndices = [];
                    pointsSelectedIndices = [];
                }
                selectedIndices.push(i);
            }
            return true;
        }
    }
    return somethingSelected;
}

function checkBoxIntersection()
{
    if (selectionBoxInitialX == -1 || selectionBoxFinalX == -1) {
        return;
    }
    selectedIndices = [];
    segmentsSelectedIndices = [];
    pointsSelectedIndices = [];
    var i = 0;
    for (i = 0; i < thePage.boxes.length; ++i) {
        var textBoxWidth = thePage.boxes[i].width;
        var textBoxHeight = thePage.boxes[i].height;
        if (selectionBoxInitialX < thePage.boxes[i].x - 7 && selectionBoxFinalX > thePage.boxes[i].x + textBoxWidth && selectionBoxInitialY < thePage.boxes[i].y - 15 && selectionBoxFinalY > thePage.boxes[i].y - 15 + textBoxHeight) {
            if (selectedIndices.indexOf(i) < 0) {
                selectedIndices.push(i);
            }
        }
    }
    for (i = 0; i < thePage.segments.length; i++) {
        if (selectionBoxInitialX < thePage.segments[i].minX &&
            selectionBoxFinalX > thePage.segments[i].maxX &&
            selectionBoxInitialY < thePage.segments[i].minY &&
            selectionBoxFinalY > thePage.segments[i].maxY) {

            if (segmentsSelectedIndices.indexOf(i) < 0) {
                segmentsSelectedIndices.push(i);
            }
        }
    }
    selectionBoxInitialX = -1;
    selectionBoxFinalX = -1;
}

function insertText() 
{
	needsRedraw = true;
    var insertBox = document.getElementById("inserttext");
    text += insertBox.value;
    insertBox.value = "";
    addCurrentText();
}

function addPropertyForSelection(box)
{
    var text = box.text;
	var index = text.indexOf(":=");
	var key = "";
	var value = "";
	if (index == -1)
	{
	    key = text;
    }
	else
	{
	    key = text.substring(0, index);
		value = text.substring(index + 2, text.length);
    }
	
	for (var i = 0; i < selectedIndices.length; i++)
	{
		var boxObject = thePage.boxes[selectedIndices[i]];
		if (boxObject.properties == undefined || boxObject.properties == null)
		{
			boxObject.properties = {};
			boxObject.properties.keys = [];
			boxObject.properties.values = [];
		}
		var keyIndex = boxObject.properties.keys.indexOf(key);
		if (keyIndex == -1)
		{
			boxObject.properties.keys.push(key);
			boxObject.properties.values.push(value);
		}
		else
		{
			boxObject.properties.keys[keyIndex] = key;
			boxObject.properties.values[keyIndex] = value;
		}
	}
	for (var i = 0; i < segmentsSelectedIndices.length; i++)
	{
		var segmentObject = thePage.segments[segmentsSelectedIndices[i]];
		if (segmentObject.properties == undefined || segmentObject.properties == null)
		{
			segmentObject.properties = {};
			segmentObject.properties.keys = [];
			segmentObject.properties.values = [];
		}
		var keyIndex = segmentObject.properties.keys.indexOf(key);
		if (keyIndex == -1)
		{
			segmentObject.properties.keys.push(key);
			segmentObject.properties.values.push(value);
		}
		else
		{
			segmentObject.properties.keys[keyIndex] = key;
			segmentObject.properties.values[keyIndex] = value;
		}
	}
}

function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}

var previousX = -1;
var previousY = -1;
var previousTime = -1;
var deltaX = 0;
var deltaY = 0;

function getGroupIndex(box) 
{
    if (box.properties == undefined) {
        return -1;
    }
    var groupIndex = -1;
    for (var i = 0; i < box.properties.keys.length; i++) {
        if (box.properties.keys[i] == "group") {
            groupIndex = i;
        }
    } 
    return groupIndex;
}

function getBoxesByGroup(group, excludeIndex)
{
    var cBoxes = new Array();
    for (var i = 0; i < thePage.boxes.length; i++) {
        if (i == excludeIndex) {
            continue;
        }
        if (thePage.boxes[i].properties == undefined) {
            continue;
        }
        var groupIndex = getGroupIndex(thePage.boxes[i]);
        if (groupIndex > -1) {
            if (thePage.boxes[i].properties.values[groupIndex] == group) {
                cBoxes.push(thePage.boxes[i]);
            }
        }
    }
    return cBoxes;
}

function getSegmentsByGroup(group, excludeIndex)
{
    var cSegments = new Array();
    for (var i = 0; i < thePage.segments.length; i++) {
        if (i == excludeIndex) {
            continue;
        }
        if (thePage.segments[i].properties == undefined) {
            continue;
        }
        var groupIndex = getGroupIndex(thePage.segments[i]);
        if (groupIndex > -1) {
            if (thePage.segments[i].properties.values[groupIndex] == group) {
                cSegments.push(thePage.segments[i]);
            }
        }
    }
    return cSegments;
}

function getSegmentsByParent(parentIndex)
{
    var aSegments = new Array();
    for (var i = 0; i < thePage.segments.length; i++) {
        if (thePage.segments[i].parentIndex == parentIndex) {
            aSegments.push(thePage.segments[i]);
        }
    }
    return aSegments;
}

function modifyTextBoxWidth(box, increment)
{
	needsRedraw = true;
    box.maxWidth += increment;
    if (box.maxWidth < 0) {
        box.maxWidth = 0;
    }
    var textLength = context.measureText(box.text).width;
    if (increment < 0 && box.maxWidth > textLength) {
        box.maxWidth = textLength;
    }
    if (increment > 0 && box.maxWidth < textLength) {
        box.maxWidth = textLength;
    }
}

function modifyTextBoxFont(box, increment)
{
	if (box.fontHeight >= 5 || increment > 0)
	    box.fontHeight += increment;
	dirtyTextBox(box);
}

function modifySegmentWidth(segment, increasing)
{
	needsRedraw = true;
    if (increasing && segment.width < 10)
        segment.width = segment.width + 1; 
    if (!increasing && segment.width > 1)
        segment.width = segment.width - 1; 
}

function modifySegmentScaleHorizontal(segment, increasing)
{
	needsRedraw = true;
    var coords = segment.values;
    var centerX = 0;
    var totalX = 0;
    for (var i = 0; i < coords.length; i = i + 2)
    {
        totalX = totalX + coords[i];
    }
    centerX = totalX / (coords.length / 2.0);
    var scale = .98;
    if (increasing)
        scale = 1.02;
    for (var i = 0; i < coords.length; i = i + 2)
    {
        coords[i] = coords[i] - centerX;
        coords[i] = coords[i] * scale;
        coords[i] = coords[i] + centerX;
    }
    updateSegmentBounds(segment);
}

function modifySegmentScaleVertical(segment, increasing)
{
	needsRedraw = true;
    var coords = segment.values;
    var centerY = 0;
    var totalY = 0;
    for (var i = 1; i < coords.length; i = i + 2)
    {
        totalY = totalY + coords[i];
    }
    centerY = totalY / (coords.length / 2.0);
    var scale = .98;
    if (increasing)
        scale = 1.02;
    for (var i = 1; i < coords.length; i = i + 2)
    {
        coords[i] = coords[i] - centerY;
        coords[i] = coords[i] * scale;
        coords[i] = coords[i] + centerY;
    }
    updateSegmentBounds(segment);
}

function createContext(canvas)
{
	needsRedraw = true;
    if (dimension == 2)
	    return createContext2d(canvas);
	return createContext3d(canvas);
}

function initializeView(context)
{
   if (dimension == 2)
       initializeView2d(context);
   else
       initializeView3d(context);
	   
}

function setupView()
{
   context = createContext(canvas);
   initializeView(context);
}

function main() 
{
   particlesCreated = false;
   initTime = date.getTime();
   
   var fontChooser = document.getElementById("fontchooser");
   if (fontChooser != null)
   {
       fontChooser.addEventListener("change", function(e) {
           fontName = fontChooser.options[fontChooser.selectedIndex].text;
           for (var i = 0; i < selectedIndices.length; i++) {
		       var currBox = thePage.boxes[selectedIndices[i]];
               currBox.fontName = fontName;
	           dirtyTextBox(currBox);
           }
       });
   }
   
   var fontSizeChooser = document.getElementById("fontsize");
   if (fontSizeChooser != null)
   {
       fontSizeChooser.addEventListener("change", function(e) {
           fontHeight = Number(fontSizeChooser.options[fontSizeChooser.selectedIndex].text);
           for (var i = 0; i < selectedIndices.length; i++) {
		       var currBox = thePage.boxes[selectedIndices[i]];
               currBox.fontHeight = fontHeight;
	           dirtyTextBox(currBox);
           }
       });
   }
   
   var fontTypeChooser = document.getElementById("fonttype");
   
   if (fontTypeChooser != null)
   {
       fontTypeChooser.addEventListener("change", function(e) {
           fontType = fontTypeChooser.options[fontTypeChooser.selectedIndex].text;
           if (fontType == "Normal") {
               fontType = "";
           }
           for (var i = 0; i < selectedIndices.length; i++) {
		       var currBox = thePage.boxes[selectedIndices[i]];
               currBox.fontType = fontType;
	           dirtyTextBox(currBox);
           }
       });
   }

   canvas = document.getElementById("canvas");
   backCanvas = document.createElement('canvas');
   backCanvas.width = canvas.width;
   backCanvas.height = canvas.height;
   backBuffer = backCanvas.getContext('2d');
   canvas.tabindex = "1";
   maxWidth = canvas.width;
   
   context = createContext(canvas);
   initializeView(context);
   
   canvas.focus();
   canvas.addEventListener('mouseover', function(e) {
       canvas.focus();
   }); 
   canvas.addEventListener('mousewheel', function(e) {
       e.preventDefault();
	needsRedraw = true;
       var centerX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
       var centerY = document.body.scrollTop + e.clientY - canvas.offsetTop;
       for (var i = 0; i < thePage.images.length; i++) {
           if (thePage.images[i].index != selectedIndices[0]) {
               continue;
           }
           var factor = .9;
           if (e.wheelDelta > 0) {
               factor = 1.1;
           }
           thePage.imageWidths[i] *= factor;
           thePage.imageHeights[i] *= factor;
       }
   }); 
   
   canvas.addEventListener("mousemove", function(e) {
       e.preventDefault();
	needsRedraw = true;
       if (mouseIsDown) {
           if (inputMode == "text") {
               if (selectedIndices.length > 0 || segmentsSelectedIndices.length > 0) {
                   if (e.shiftKey) {
                       var box = thePage.boxes[selectedIndices[0]]
                       var increment = (document.body.scrollLeft + e.clientX - canvas.offsetLeft - mouseX) / 2;
                       modifyTextBoxWidth(box, increment);
					   dirtyTextBox(box);
                       return;
                   }
                   if (e.ctrlKey) {
                       var box = thePage.boxes[selectedIndices[0]];
                       var increment = document.body.scrollLeft + e.clientX - canvas.offsetLeft - mouseX;
                       increment /= 40;
                       modifyTextBoxFont(box, increment);
					   dirtyTextBox(box);
                       return;
                   }
                   e.target.style.cursor = "move";
                   if (selectedIndices.length > 0) {
                       previousX = thePage.boxes[selectedIndices[0]].x;
                       previousY = thePage.boxes[selectedIndices[0]].y;
                   }
                   var date = new Date();
                   previousTime = date.getTime();

                   var changeX = document.body.scrollLeft + e.clientX - canvas.offsetLeft - selectOffsetX;
                   var changeY = document.body.scrollTop + e.clientY - canvas.offsetTop - selectOffsetY;

                   var groupName = "";
                   var theGroupCount = 0;
             
                   if (selectedIndices.length > 0) {
                       var textObject = thePage.boxes[selectedIndices[0]];
                       var groupIndex = getGroupIndex(textObject);
                       
                       if (textObject.properties != undefined) {
                           groupName = textObject.properties.values[groupIndex];
                       }
                   } else if (segmentsSelectedIndices.length > 0) {
                       var segment = thePage.segments[segmentsSelectedIndices[0]];
                       var groupIndex = getGroupIndex(segment);
                       var properties = segment.properties;
                       if (properties != undefined && properties.keys != undefined && properties.values != undefined) {
                           if (groupName == "" && groupIndex >= 0) {
                               groupName = segment.properties.values[groupIndex];
                           }
                       }
                   }
				   
                   // Either move by group property or move by selection.
                   // The rule is that if more than 1 object is selected,
                   // then we don't move by the group property.
                   if (selectedIndices.length + segmentsSelectedIndices.length > 1) {
                       groupName = "";
                   }

                   var movedByGroup = false;

                   if (groupName != "" && !e.shiftKey) {
                       var exclusion = -1;
                       var sBoxes = getBoxesByGroup(groupName, exclusion);
                       for (var j = 0; j < sBoxes.length; j++) {
                           movedByGroup = true;
                           theGroupCount++;
                           sBoxes[j].x += changeX;
                           sBoxes[j].y += changeY;
                       }
                   }


                   if (groupName != "" && !e.shiftKey) {
                       var exclusion = -1;
                       var currentSegments = getSegmentsByGroup(groupName, exclusion);
                       for (j = 0; j < currentSegments.length; j++) {
                           movedByGroup = true;
                           theGroupCount++;
                           var tSegment = currentSegments[j];
                           var values = tSegment.values;
                           tSegment.minX += changeX;
                           tSegment.maxX += changeX;
                           tSegment.minY += changeY;
                           tSegment.maxY += changeY;
                           for (var m = 0; m < values.length; m = m + 2) {
                               values[m] += changeX;
                               values[m + 1] += changeY;
                           }
                       }
                   }

                   if (!movedByGroup && theGroupCount < 2 && thePage.boxes.length > 0 && selectedIndices.length > 0) {
                       for (var q = 0; q < selectedIndices.length; q++) {
                           thePage.boxes[selectedIndices[q]].x += changeX;
                           thePage.boxes[selectedIndices[q]].y += changeY;
                       }
                   }
                   if (!movedByGroup && theGroupCount < 2) {
                       for (var i = 0; i < segmentsSelectedIndices.length; i++) {
                           var tSegment = thePage.segments[segmentsSelectedIndices[i]];
                           tSegment.minX += changeX;
                           tSegment.maxX += changeX;
                           tSegment.minY += changeY;
                           tSegment.maxY += changeY;
                           var values = tSegment.values;
                           for (var m = 0; m < values.length; m = m + 2) {
                               values[m] += changeX;
                               values[m + 1] += changeY;
                           }
                       }
                   }

                   selectOffsetX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
                   selectOffsetY = document.body.scrollTop + e.clientY - canvas.offsetTop;

                   return;
               } else {
                   selectionBoxFinalX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
                   selectionBoxFinalY = document.body.scrollTop + e.clientY - canvas.offsetTop;
               }
           } else if (inputMode == "draw") {
               var curX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
               var curY = document.body.scrollTop + e.clientY - canvas.offsetTop;
               addPointToSegment(currentSegment, curX, curY);
           } 
           else if (inputMode == "points")
           {
               var changeX = document.body.scrollLeft + e.clientX - canvas.offsetLeft - selectOffsetX;
               var changeY = document.body.scrollTop + e.clientY - canvas.offsetTop - selectOffsetY;

               for (var selectedSegmentIndex = 0; selectedSegmentIndex < segmentsSelectedIndices.length; selectedSegmentIndex = selectedSegmentIndex + 1)
               {
                   var segmentIndex = segmentsSelectedIndices[selectedSegmentIndex];
                   var segment = thePage.segments[segmentIndex];
                   var indices = pointsSelectedIndices[segmentIndex];
                   if (indices != null)
                   {
                       for (var selectIndex = 0; selectIndex < indices.length; selectIndex = selectIndex + 1)
                       {
                           var pointIndex = indices[selectIndex];

                           var values = segment.values;

                           values[pointIndex] = values[pointIndex] + changeX;
                           values[pointIndex + 1] = values[pointIndex + 1] + changeY;
                       }
                   }

               }
               selectOffsetX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
               selectOffsetY = document.body.scrollTop + e.clientY - canvas.offsetTop;
           }
       } else {
           if (inputMode == "text") {
               //outputColorValue(document.body.scrollLeft + e.clientX - canvas.offsetLeft, document.body.scrollTop + e.clientY - canvas.offsetTop);
           }
       }
   });
   
   canvas.addEventListener("mouseup", function(e) {
           e.target.style.cursor = "default";
       mouseIsDown = false;
	needsRedraw = true;
       if (inputMode == "text") {
           if (e.shiftKey) {
               return;
           }
           if (selectedIndices.length > 0) {
               previousTime = -1;
           
               previousX = -1;
               previousY = -1;
               return;
		   } else {
			   selectionBoxFinalX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
			   selectionBoxFinalY = document.body.scrollTop + e.clientY - canvas.offsetTop;
			   checkBoxIntersection();
		   }
       } else if (inputMode == "draw") {
           currentSegment.color = lineColor;
           currentSegment.width = lineWidth;
           var curX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
           var curY = document.body.scrollTop + e.clientY - canvas.offsetTop;
           addPointToSegment(currentSegment, curX, curY);
       }
   });
   
   canvas.addEventListener("dblclick", function(e) {
       if (inputMode == "text") {
	needsRedraw = true;
           startX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
           startY = document.body.scrollTop + e.clientY - canvas.offsetTop;
           checkCursorIntersection(startX, startY, false);
           if (selectedIndices.length > 0) {
               var text = thePage.boxes[selectedIndices[0]].text;
               if (text.substring(0,7) == "http://" || text.substring(0,8) == "file:///" || text.substring(0,8) == "https://")
               {
                   window.open(text);
               } 
               else
               {
                   copyToClipboard(text);
               }
           }
       } 
   });
   
   canvas.addEventListener("mousedown", function(e) {
       e.preventDefault();
	   needsRedraw = true;
       canvas.focus();
       mouseIsDown = true;
       firstClick = true;
       mouseX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
       mouseY = document.body.scrollTop + e.clientY - canvas.offsetTop;
       selectOffsetX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
       selectOffsetY = document.body.scrollTop + e.clientY - canvas.offsetTop;
       var segmentsSelected = false;
       var textSelected = false;
       selectionBoxInitialX = -1;
       selectionBoxInitialY = -1;
       selectionBoxFinalX = -1;
       selectionBoxFinalY = -1;
       addCurrentText();
	   textSelected = checkCursorIntersection(mouseX, mouseY, e.ctrlKey);
       if (inputMode == "text") {
           pointsSelectedIndices = [];
           segmentsSelected = makeSegmentSelection(mouseX, mouseY, e.ctrlKey);
           startX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
           startY = document.body.scrollTop + e.clientY - canvas.offsetTop;
           //textSelected = checkCursorIntersection(mouseX, mouseY, e.ctrlKey);
           if (!textSelected && !segmentsSelected) {
               selectedIndices = [];
               segmentsSelectedIndices = [];
               pointsSelectedIndices = [];
           }
           if (selectedIndices.length > 0) {
               if (generatedDocument != null) {
                   var text = thePage.boxes[selectedIndices[0]].text;
                   generatedDocument += text;
                   if (!titleSelected && text.charAt[text.length - 1] != ".") {
                       generatedDocument += ".  ";
                   }
               }
               //if (thePage.boxes[selectedIndices[0]].properties != undefined) {
               //    showTableForBox();
               //}
               previousX = thePage.boxes[selectedIndices[0]].x;
               previousY = thePage.boxes[selectedIndices[0]].y;
           } else {
               previousX = -1;
               previousY = -1;
               selectionBoxInitialX = startX;
               selectionBoxInitialY = startY;
           }
       } else if (inputMode == "draw") {
           currentSegment = createSegment(new Array(), -1, lineWidth, lineColor, [], []); 
           if (selectedIndices.length > 0) {
               currentSegment.parentIndex = selectedIndices[0];
           } else {
               currentSegment.parentIndex = -1;
           }
           thePage.segments.push(currentSegment);
           var curX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
           var curY = document.body.scrollTop + e.clientY - canvas.offsetTop;
           addPointToSegment(currentSegment, curX, curY);
       } else if (inputMode == "points")
       {
           if (!makeSegmentSelection(mouseX, mouseY, e.ctrlKey))
               pointsSelectedIndices = [];
       }
   });
   
   document.addEventListener("keydown", function(e) {
       e.preventDefault();
	needsRedraw = true;
	   
	   if (e.keyCode == 91) // Mac command key
	       return;
		   
       if (inputMode != "text")
	       return;
		   
       if (e.ctrlKey) {
           if (e.keyCode == 67) {  // 'C' key
               copySelection();
               return;
           }
           if (e.keyCode == 86) {  // 'V' key
               pasteSelection();
               return;
           }
       }
       var code = e.keyCode;
       if (code >= 65 && code <= 90 && !e.shiftKey && !capsLock) {
           code += 32;
       }
       if (e.keyCode == 37) { // left arrow key
           if (selectedIndices.length > 0)
           {
               var box = thePage.boxes[selectedIndices[0]]
               modifyTextBoxWidth(box, -15);
           }
           if (segmentsSelectedIndices.length > 0)
           {
               var segment = thePage.segments[segmentsSelectedIndices[0]];
               modifySegmentScaleHorizontal(segment, false);
           }
           return;
       }
       if (e.keyCode == 38) { // up arrow key
           if (selectedIndices.length > 0)
           {
               var box = thePage.boxes[selectedIndices[0]]
               modifyTextBoxFont(box, 1);
           }
           if (segmentsSelectedIndices.length > 0)
           {
               var segment = thePage.segments[segmentsSelectedIndices[0]];
               modifySegmentScaleVertical(segment, true);
           }
           return;
       }
       if (e.keyCode == 39) { // right arrow key
           if (selectedIndices.length > 0)
           {
               var box = thePage.boxes[selectedIndices[0]];
               modifyTextBoxWidth(box, 15);
           }
           if (segmentsSelectedIndices.length > 0)
           {
               var segment = thePage.segments[segmentsSelectedIndices[0]];
               modifySegmentScaleHorizontal(segment, true);
           }
           return;
       }
       if (e.keyCode == 40) { // down arrow key
           if (selectedIndices.length > 0)
           {
               var box = thePage.boxes[selectedIndices[0]]
               modifyTextBoxFont(box, -1);
           }
           if (segmentsSelectedIndices.length > 0)
           {
               var segment = thePage.segments[segmentsSelectedIndices[0]];
               modifySegmentScaleVertical(segment, false);
           }
           return;
       }
       if (code == 20) {
           capsLock = !capsLock;
       } else if (code == 13) {
	       // ENTER key pressed, move to next line
           addCurrentText();
           startY += fontHeight + 4;
       } else if (code == 46) {
           deleteSelection();
       } else {
           if (selectedIndices.length > 0) {
               text = "";
               var tempText = thePage.boxes[selectedIndices[0]].text;
               thePage.boxes[selectedIndices[0]].text = editText(tempText, e, capsLock);
           } else {
               text = editText(text, e, capsLock);
           }
       }
   });
   
   document.addEventListener("keyup", function(e) {
       var code = e.keyCode;
	   
	needsRedraw = true;
	   if (e.keyCode == 91) // Mac command key
	       return;
		   
       if (code == 27) {
           switchMode();
           return;
       }
       if (inputMode == "draw") {
	       if (code == 9) // tab
		   {
		       if (dimension == 2)
			       dimension = 3;
			    else
				    dimension = 2;
			   setupView();
			   draw();
		   }
		   
           if (code >= 49 && code <= 57) {
               lineWidth = code - 48;
               return;
           }
           if (code == 71) {
               lineColor = "green";
               //lineColor = "rgb(112, 209, 54)";
           } else if (code == 66) {
               lineColor = "blue";
           } else if (code == 82) {
               //lineColor = "red";
               lineColor = "rgb(250, 79, 40)";
           } else if (code == 89) {
               lineColor = "yellow";
           } else if (code == 75) {
               lineColor = "black";
           } else if (code == 87) {
               lineColor = "brown";
           }
           var colorOutput = document.getElementById("current color")
           if (colorOutput) {
               colorOutput.innerHTML = "Current line color = " + lineColor;
           }
           return;
       }
   });
   
    pageIndex = 0;
    thePage = pages[pageIndex];    
    updatePage();
	
	//text = "Kyle";
	//startX = 200;
	//startY = 200;
	//currentMaxWidth = 400;
	//addCurrentText();
	
	//text = "Evan";
	//startX = 900;
	//startY = 500;
	//currentMaxWidth = 300;
	//addCurrentText();
	
	draw();
}

var date = new Date();
var initTime = date.getTime();
date  = new Date();
var previousTime = date.getTime();

var particlesCreated = false;
var particles;

var textRemoved = false;
var imageLoaded = false;

var boxRemoved = false;
var playedExplosion = false;
var playedBeeping = false;
var finishedPlayingExplosion = false;

function drawIntro()
{

    var newDate = new Date();
    var currentTime = newDate.getTime() - initTime;

    if (!playedBeeping) {
        playedBeeping = true;
        var audio = document.getElementById("beeping");
        audio.play();
        initTime = newData.getTime();
        return;
    }

    if (currentTime > 5000 && !playedExplosion) {
        playedExplosion = true;

        var audio2 = document.getElementById("beeping");
        audio2.pause();
        var audio = document.getElementById("explosion");
        audio.play();
        finishedPlayingExplosion = true;
        return;
    }


    if (currentTime > 2000 && thePage.images.length > 0 && !particlesCreated) {
        particlesCreated = true;
        particles = new Array();
        for (var ii = 0; ii < particleCount; ii++) {
            var particle = new Particle(thePage.images[0], thePage.imagesX[0], thePage.imagesY[0], thePage.imageWidths[0], thePage.imageHeights[0]);
            particles.push(particle);
        }
    }

    if (particles.length != particleCount) {
        return;
    }

    if (currentTime > 80000 && particles.length > 0) {
        particles = new Array();
    }
    if (currentTime > 5000 && !boxRemoved) {
        thePage.boxes = new Array();
        boxRemoved = true;
         
    }
    if (currentTime > 30000 && textRemoved == false) {
        textRemoved = true;
        text = "";
    }
         
    if (currentTime > 5000 && currentTime < 80000 && particlesCreated && particles.length == particleCount) {
        for (var ii = 0; ii < particles.length; ii++) {
            var particle = particles[ii];
            particle.update();
            particle.draw(context);
        }
    }
}

function outputColorValue(x, y)
{
    try {
       var imageData = context.getImageData(x, y, x + 1, y + 1);
       currentRed = imageData.data[0];
       currentGreen = imageData.data[1];
       currentBlue = imageData.data[2];

       var tag = document.getElementById("pixel-color");
       if (tag) {
           tag.innerHTML = "R:" + currentRed + " G:" + currentGreen + " B:" + currentBlue;
       }
     } catch(ex) {
       //alert("security exception");
       currentRed = 0;
       currentGreen = 0;
       currentBlue = 0;
     }
}

function showTableForBox()
{
    var previous = document.getElementById("property-table");
    if (previous != undefined && previous != null) {
        document.body.removeChild(previous);
    }
    var properties;
    if (selectedIndices.length > 0) {
        properties = thePage.boxes[selectedIndices[0]].properties;
    } else if (segmentsSelectedIndices.length > 0) {
        properties = thePage.segments[segmentsSelectedIndices[0]].properties;
    } else {
        return;
    }
        if (properties == undefined || properties == null || properties.keys.length == 0) {
        return;
        }
        var table = document.createElement("table");
        table.id = "property-table";
        table.border = "1";
        var header1 = document.createElement("th");
        header1.innerHTML = "Property";
        var header2 = document.createElement("th");
        header2.innerHTML = "Value";

        var row = document.createElement("tr");
        row.appendChild(header1);
        row.appendChild(header2);
        table.appendChild(row);

        for (var i = 0; i < properties.keys.length; i++) {
            var row = document.createElement("tr");
            var propertyName = document.createElement("th");
            row.appendChild(propertyName);
            propertyName.innerHTML = properties.keys[i];
            var propertyValue = document.createElement("th");
            row.appendChild(propertyValue);
            propertyValue.innerHTML = properties.values[i];
            table.appendChild(row);
        }

        document.body.appendChild(table);
}

function addProperty()
{
    var keyField = document.getElementById("key-field").value;
    var valueField = document.getElementById("value-field").value;
    for (var i = 0; i < selectedIndices.length; i++) {
        if (keyField != "") {
            if (thePage.boxes[selectedIndices[i]].properties == undefined) {
                thePage.boxes[selectedIndices[i]].properties = new Object();
                thePage.boxes[selectedIndices[i]].properties.keys = new Array();
                thePage.boxes[selectedIndices[i]].properties.values = new Array();
            }
            thePage.boxes[selectedIndices[i]].properties.keys.push(keyField);
            thePage.boxes[selectedIndices[i]].properties.values.push(valueField);
        }
    }
    for (var i = 0; i < segmentsSelectedIndices.length; i++) {
        if (keyField != "") {
            if (thePage.segments[segmentsSelectedIndices[i]].properties == undefined) {
                thePage.segments[segmentsSelectedIndices[i]].properties = new Object();
                thePage.segments[segmentsSelectedIndices[i]].properties.keys = new Array();
                thePage.segments[segmentsSelectedIndices[i]].properties.values = new Array();
            }
            thePage.segments[segmentsSelectedIndices[i]].properties.keys.push(keyField);
            thePage.segments[segmentsSelectedIndices[i]].properties.values.push(valueField);
        }
    }
}

function randomize() 
{
    var offsetX = 0;
    var offsetY = 0;
    for (var j = 0; j < thePage.segments.length; j++) {
    var segment = thePage.segments[j];
    var multiplier = 1;
    for (var i = 0; i < segment.values.length; i += 2) {
        offsetX += Math.random() * multiplier;
        offsetY += Math.random() * multiplier;
        segment.values[i] += offsetX;
        segment.values[i + 1] += offsetY;
        var c = Math.floor(Math.random() * 5);
        if (c == 2) {
            multiplier = multiplier * -1;
        }
        if (offsetX > 4 || offsetY > 4) {
            multiplier = multiplier * -1;
        }
    }
    }
    //draw();
}

function split(aString)
{
    var tokens = new Array;
    var done = false;
    var index = 0;
    var currentChar;
    var currentString = new String;
    while (!done) {   
        currentChar = aString.charAt(index); 
        if (currentChar == " ") {
            if (currentString.length > 0) {
                tokens.push(currentString);
                currentString = new String;
            }
        } else {
            currentString += currentChar;
        }
        index++;
        if (index >= aString.length) {
            if (currentString.length > 0) {
                tokens += currentString;
            }
            done = true;
        }
    }
    return tokens;
}

function writeOutput(value)
{
    var output = document.getElementById("output");
    if (!output) { 
        var output = document.createElement("p");
        output.id = "output";
        document.body.appendChild(output);
    }
    output.innerHTML = "(output) " + value;
}

function splitLines(context, text, maxWidth)
{
    var done = false;
    var strings = text.split(" ");
    for (var i = 0; i < strings.length; i++) {
        var width = context.measureText(strings[i]).width;
        if (width > maxWidth) {
            maxWidth = width; 
        }
    }
    var lines = new Array();
    var isFirstStringInLine = true;
    var currentLine = new String();
    var tempLine = new String();
    var index = 0;
    while (index < strings.length) {
        if (!isFirstStringInLine) {
            tempLine += " ";
        }
        tempLine += strings[index];
        var lineWidth = context.measureText(tempLine).width;
        if (lineWidth > maxWidth) {
            if (isFirstStringInLine) {
                maxWidth = lineWidth;
                lines.push(tempLine);
                index++;
            } else {
                lines.push(currentLine);
            }
            currentLine = new String();
            tempLine = new String();
            isFirstStringInLine = true;
        } else {
            if (!isFirstStringInLine) {
                currentLine += " ";
            }
            currentLine += strings[index];
            isFirstStringInLine = false;
            index++;
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }
    return lines;
}

function addCurrentText()
{
    if (text != undefined && text.trim() != "") {
	    selectedIndices = [];
		segmentSelectedIndices = [];
	    needsRedraw = true;
        currentText = new Object();
        currentText.text = text;
        currentText.maxWidth = currentMaxWidth;
        currentText.x = startX; 
        currentText.y = startY; 
		currentText.width = text.length * 10;
		currentText.height = 20;
        currentText.fontHeight = fontHeight;
        currentText.fontName = fontName;
        currentText.fontType = fontType;
        currentText.textColor = lineColor;
        date = new Date();
        currentText.time = date.getTime();
		thePage.boxes.push(currentText);
        text = new String();
    }
}

function pageChanged()
{
	needsRedraw = true;
    addCurrentText();
    startX = 0;
    startY = 0;
    text = new String();
    selectedIndices = [];
    segmentsSelectedIndices = [];
    pointsSelectedIndices = [];
    selectOffsetX = -1;
    selectOffsetY = -1;
    inputMode = "text";
    mouseIsDown = false;
    mouseX = 0;
    mouseY = 0;
}

function nextPage()
{
	needsRedraw = true;
    pageChanged();
    pageIndex++;
    if (pageIndex >= pages.length) {
        thePage = new Object();
        thePage.boxes = new Array();
        thePage.segments = new Array();
        thePage.imageNamess = [];
        thePage.images = [];
        thePage.imageWidths = [];
        thePage.imageHeights = [];
        pages.push(thePage);
    } else {
        thePage = pages[pageIndex];
    }
    updatePage();
}

function previousPage()
{
	needsRedraw = true;
    if (pageIndex <= 0) {
        return;
    }
    pageChanged();
    pageIndex--;
    thePage = pages[pageIndex];
    updatePage();
}

function updatePage()
{
	needsRedraw = true;
    var pageNumber = document.getElementById("pagenumber");
    if (pageNumber) {
        pageNumber.innerHTML = "Page " + (pageIndex + 1) + " / " + pages.length;
    }
}

function runCode()
{ 
	needsRedraw = true;
    if (confirm("Clear everything and import new content?")) 
    {
        addCurrentText();
        var code = document.getElementById("code");
        eval(code.value);
        updatePage();
    }
}

function deleteSelection()
{
	needsRedraw = true;
    addCurrentText();
    if (thePage.boxes.length == 0 && thePage.segments.length == 0) {
        return;
    }
    if (inputMode == "text" && confirm("Delete selected items?")) {
        for (var i = 0; i < selectedIndices.length; i = i + 1) {
            thePage.boxes[selectedIndices[i]].text = "";
			thePage.boxes[selectedIndices[i]].imageData = undefined;
			thePage.boxes[selectedIndices[i]].selectedImageData = undefined;
        }
        segmentsSelectedIndices.sort();
        for (var i = segmentsSelectedIndices.length - 1; i >= 0; i = i - 1) {
            thePage.segments.splice(segmentsSelectedIndices[i], 1);
        }
        segmentsSelectedIndices = [];
    }
	if (inputMode == "points")
	{
	    if (pointsSelectedIndices.length > 0 && segmentsSelectedIndices.length > 0)
		{
		    var selectedPoints = pointsSelectedIndices[segmentsSelectedIndices[0]];
			var selectedIndex = selectedPoints[0];
		    thePage.segments[segmentsSelectedIndices[0]].values.splice(selectedIndex, 2);
	    }
	}
}

function makeSegmentSelection(mouseX, mouseY, isCtrlPress)
{
	needsRedraw = true;
    var segmentsSelected = false;
           if (thePage.segments.length > 0 && thePage.segments[0].values.length >= 4) {
               var segments = thePage.segments;
               for (var i = 0; i < segments.length; i++) {
                   for (var j = 0; j < segments[i].values.length - 1; j += 2) {
                       if (checkDistance(4, mouseX, mouseY, segments[i].values[j], segments[i].values[j + 1])) {
                           segmentsSelected = true;
                           if (segmentsSelectedIndices.indexOf(i) == -1) {
                               if (!isCtrlPress) {
                                   segmentsSelectedIndices = [];
                                   selectedIndices = [];
                               }
                               segmentsSelectedIndices.push(i);
                               i = segments.length;
                           }

                           if (!isCtrlPress)
                               pointsSelectedIndices = [];

                           var indices = pointsSelectedIndices[i];
                           if (indices == null)
                           {
                               indices = new Array();
                               pointsSelectedIndices[i] = indices;                                         }
                           if (indices.indexOf(j) == -1)
                               indices.push(j);
                       }
                   }
               }
           }
    return segmentsSelected;
}

var dcount = 0;

function compareX(a, b)
{
    if (a.x < b.x)
	    return -1;
		
	return 1;
}

function compareY(a, b)
{
    if (a.y + 10 < b.y)
	    return -1;
		
	return 1;
}

function sortByPositions(boxes, compare)
{
    var arrayCopy = [];
	var i = 0;
	for (i = 0; i < boxes.length; i++)
	{
	    arrayCopy.push(boxes[i]);
	}
	
    var sorted = [];
	var currentMinX = 0;
	
	while (arrayCopy.length > 0)
	{
	    if (arrayCopy.length == 1)
		{
		    sorted.push(arrayCopy[0]);
			break;
		}
		
		var indexOfSmallest = 0;
	    for (i = 1; i < arrayCopy.length; i++)
	    {
	        if (compare(arrayCopy[i], arrayCopy[indexOfSmallest]) < 0)
			    indexOfSmallest = i;
	    }
		
		sorted.push(arrayCopy[indexOfSmallest]);
		arrayCopy.splice(indexOfSmallest, 1);
    }
	
	return sorted;
}

////////////////////////////////////////////////////
// Line Segments - To be placed in separate file
////////////////////////////////////////////////////
function checkDistance(range, x1, y1, x2, y2)
{
     if (Math.abs(x2 - x1) > range || Math.abs(y2 - y1) > range) {
         return false;
     }
     var xDiff = x2 - x1;
     var yDiff = y2 - y1;
     return Math.sqrt(xDiff * xDiff + yDiff * yDiff) < range;
}

function clearAll()
{
	needsRedraw = true;
    if (confirm("Clear everything?")) {
        pages = new Array();
        thePage = createPage();
        pages.push(thePage);
        pageIndex = 0;
        updatePage();
    }
}

