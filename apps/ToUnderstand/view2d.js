function View2d()
{
}

View2d.prototype.createContext = function(canvas) 
{
	let context;
	try {
		context = canvas.getContext("2d");
	} catch (e) {
	}
	if (!context) {
		alert("Could not initialize 2d context");
	}
	this.context = context;
	return context;
}

View2d.prototype.initializeView = function(context)
{
}

View2d.prototype.clearScreen = function()
{
    this.context.clearRect(0, 0, canvas.width, canvas.height);
}

View2d.prototype.drawTextbox = function(context, imageData, x, y, width, height)
{
    context.putImageData(imageData, x, y);
}

View2d.prototype.drawPolyline = function(context, polyline)
{
    for (var seg = 0; seg < polyline.length; seg = seg + 1) {
        var segment = polyline[seg];
        context.beginPath();
        context.lineWidth = segment.width;
        context.strokeStyle = segment.color;
        if (segmentsSelectedIndices.indexOf(seg) >= 0) {
            context.strokeStyle = "gray";
            context.lineWidth = context.lineWidth + 2;
        }
        context.moveTo(segment.values[0], segment.values[1]);
        for (var p = 2; p < segment.values.length; p = p + 2) {
            context.lineTo(segment.values[p], segment.values[p + 1]);
        }
        context.stroke();
    }
}

View2d.prototype.drawPoints = function(points)
{
    for (var seg = 0; seg < points.length; seg = seg + 1) {
        var segment = points[seg];
        context.lineWidth = segment.width;
        for (var p = 0; p < segment.values.length; p = p + 2) {
            context.fillStyle = segment.color;
            var indices = pointsSelectedIndices[seg];
            if (indices != null)
            {
                if (indices.indexOf(p) != -1)
                {
                    context.fillStyle = "gray";
                }
            }
            context.beginPath();
            context.arc(segment.values[p], segment.values[p + 1], 3, 0, 2 * Math.PI);
            context.fill();
        }
    }
}

View2d.prototype.drawSelectionBox = function(x1, y1, x2, y2)
{
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "#999999";
        context.moveTo(x1, y1);
        context.lineTo(x2, y1);
        context.lineTo(x2, y2);
        context.lineTo(x1, y2);
        context.lineTo(x1, y1);
        context.stroke();
}

View2d.prototype.drawScene = function(context)
{
}
