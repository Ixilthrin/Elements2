

function getRedIndex(data, x, y)
{
    return canvas.width * y * 4 + x * 4;
}

function getGreenIndex(data, x, y)
{
    return canvas.width * y * 4 + x * 4 + 1;
}

function getBlueIndex(data, x, y)
{
    return canvas.width * y * 4 + x * 4 + 2;
}

function blend(data)
{
    var index = 0;
    for (var x = 1; x < canvas.width - 1; x++) {
        for (var y = 1; y < canvas.height - 1; y++) {
            var redIndex0 = getRedIndex(data, x - 1, y - 1);
            var redIndex1 = getRedIndex(data, x, y - 1);
            var redIndex2 = getRedIndex(data, x + 1, y - 1);
            var redIndex3 = getRedIndex(data, x - 1, y);
            var redIndex4 = getRedIndex(data, x, y);
            var redIndex5 = getRedIndex(data, x + 1, y);
            var redIndex6 = getRedIndex(data, x - 1, y + 1);
            var redIndex7 = getRedIndex(data, x, y + 1);
            var redIndex8 = getRedIndex(data, x + 1, y + 1);
            data[redIndex4] = data[redIndex0]/9 + data[redIndex1]/9 + data[redIndex2]/9 + data[redIndex3]/9 + data[redIndex4]/9 + data[redIndex5]/9 + data[redIndex6]/9 + data[redIndex7]/9 + data[redIndex8]/9;

            var greenIndex0 = getGreenIndex(data, x - 1, y - 1);
            var greenIndex1 = getGreenIndex(data, x, y - 1);
            var greenIndex2 = getGreenIndex(data, x + 1, y - 1);
            var greenIndex3 = getGreenIndex(data, x - 1, y);
            var greenIndex4 = getGreenIndex(data, x, y);
            var greenIndex5 = getGreenIndex(data, x + 1, y);
            var greenIndex6 = getGreenIndex(data, x - 1, y + 1);
            var greenIndex7 = getGreenIndex(data, x, y + 1);
            var greenIndex8 = getGreenIndex(data, x + 1, y + 1);
            data[greenIndex4] = data[greenIndex0]/9 + data[greenIndex1]/9 + data[greenIndex2]/9 + data[greenIndex3]/9 + data[greenIndex4]/9 + data[greenIndex5]/9 + data[greenIndex6]/9 + data[greenIndex7]/9 + data[greenIndex8]/9;

            var blueIndex0 = getBlueIndex(data, x - 1, y - 1);
            var blueIndex1 = getBlueIndex(data, x, y - 1);
            var blueIndex2 = getBlueIndex(data, x + 1, y - 1);
            var blueIndex3 = getBlueIndex(data, x - 1, y);
            var blueIndex4 = getBlueIndex(data, x, y);
            var blueIndex5 = getBlueIndex(data, x + 1, y);
            var blueIndex6 = getBlueIndex(data, x - 1, y + 1);
            var blueIndex7 = getBlueIndex(data, x, y + 1);
            var blueIndex8 = getBlueIndex(data, x + 1, y + 1);
            data[blueIndex4] = data[blueIndex0]/9 + data[blueIndex1]/9 + data[blueIndex2]/9 + data[blueIndex3]/9 + data[blueIndex4]/9 + data[blueIndex5]/9 + data[blueIndex6]/9 + data[blueIndex7]/9 + data[blueIndex8]/9;
        }
    }
}

function splat(data)
{
    var width = canvas.width;
    var height = canvas.height;
    var centerX = Math.random() * width;
    var centerY = Math.random() * height;
    var red = 150 + Math.random() * 50;
    var green = 30 + Math.random() * 20;
    var blue = 10 + Math.random() * 30;
    var maxRadius = Math.random() * 500;
    var numberOfPoints = Math.floor(maxRadius * 2);
    for (var i = 0; i < numberOfPoints; i++) {
        var angle = Math.random() * 2 * Math.PI;
        var radius = Math.random() * maxRadius + 100;
        var amplitude = Math.random() * radius - radius/2;
        var x = Math.floor(centerX + amplitude * Math.cos(angle));
        var y = Math.floor(centerY + amplitude * Math.sin(angle));
        if (x < width && y < height && x >= 0 && y >= 0) {
            data[getRedIndex(data, x, y)] = red;
            data[getGreenIndex(data, x, y)] = green;
            data[getBlueIndex(data, x, y)] = blue;
        }
    }
}