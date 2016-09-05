function createContext2d(canvas) 
{
	var context;
	try {
		context = canvas.getContext("2d");
	} catch (e) {
	}
	if (!context) {
		alert("Could not initialize 2d context");
	}
	return context;
}

function initializeView2d(context)
{
}

function eraseView2d(context)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTextbox2d(context, imageData, x, y, width, height)
{
    context.putImageData(imageData, x, y);
}

function drawPolyline2d(polyline)
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

function drawPoints2d(points)
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

function drawSelectionBox2d(x1, y1, x2, y2)
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