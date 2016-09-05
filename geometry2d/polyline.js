function distance(x1, y1, x2, y2)
{
    return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}

function adjustPointCount(points, delta)
{
    var newList = new Array();
    newList.push(points[0]);
    newList.push(points[1]);

    var currentX = points[0];
    var currentY = points[1];
    var nextIndex = 2;

    var totalDist = 0;
    var currentToNextDist = 0;

    while (nextIndex <= points.length - 1)
    {
        currentToNextDistance = distance(currentX, currentY,
                                    points[nextIndex], points[nextIndex + 1]);

        if (totalDist + currentToNextDistance >= delta)
        {
            var segmentLength = distance(points[nextIndex - 2], 
                                         points[nextIndex - 1],
                                         points[nextIndex],
                                         points[nextIndex + 1]); 
            var ratio = (delta - totalDist) / segmentLength;
            if (ratio > 1)
			    ratio = 1;

            currentX = currentX + (points[nextIndex    ] - points[nextIndex - 2]) * ratio;
            currentY = currentY + (points[nextIndex + 1] - points[nextIndex - 1]) * ratio;

            newList.push(currentX);
            newList.push(currentY);
            totalDist = 0;
        }
        else
        {
            currentX = points[nextIndex];
            currentY = points[nextIndex + 1];
            nextIndex = nextIndex + 2;
            totalDist = totalDist + currentToNextDistance;
        }
    }

    newList.push(points[points.length - 2]);
    newList.push(points[points.length - 1]);
    return newList;
}

function getCenter(points)
{
    var x = 0;
	var y = 0;
	var xSum = 0;
	var ySum = 0;
	for (var i = 0; i < points.length; i = i + 2)
	{
	    xSum = xSum + points[i];
		ySum = ySum + points[i + 1];
	}
	x = xSum / (points.length / 2);
	y = ySum / (points.length / 2);
	return [x, y];
}

function rotatePoints(points, angle, center)
{
    var newPoints = [];
	for (var i = 0; i < points.length; i = i + 2)
	{
	    var x1 = points[i] - center[0];
		var y1 = points[i + 1] - center[1];
		var angle1 = Math.atan(y1 / x1);
		if (x1 < 0 && y1 < 0)
		    angle1 = angle1 + Math.PI;
	    else if (x1 < 0)
		    angle1 = angle1 + Math.PI;
		var radius = distance(0, 0, x1, y1);
		var x2 = radius * Math.cos(angle1 + angle);
		var y2 = radius * Math.sin(angle1 + angle);
		newPoints.push(x2 + center[0]);
		newPoints.push(y2 + center[1]);
	}
	return newPoints;
}