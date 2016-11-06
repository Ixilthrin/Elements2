var minRed = Math.random() * 255;
var maxRed = minRed + Math.random() * (254 - minRed) + 1;
var minGreen = Math.random() * 255;
var maxGreen = minGreen + Math.random() * (254 - minGreen) + 1;
var minBlue = Math.random() * 255;
var maxBlue = minBlue + Math.random() * (254 - minBlue) + 1;
var redincval = Math.random() * 5 + 1;
var greenincval = Math.random() * 5 + 1;
var blueincval = Math.random() * 5 + 1;
var init_red = minRed;
var init_green = minGreen;
var init_blue = minBlue;

function setupNoiseValues()
{
minRed = 103
maxRed = 248
minGreen = 104
maxGreen = 163
minBlue = 60
maxBlue = 208
redincval = 3
greenincval = 4
blueincval = 1
init_red = minRed;
init_green = minGreen;
init_blue = minBlue;
}

function outputSetup()
{
    var j = window.open("")
    j.document.write("<html><body>")
    j.document.write("<br>function setup()")
    j.document.write("<br>{")
    j.document.write("<br>minRed = " + Math.floor(minRed));
    j.document.write("<br>maxRed = " + Math.floor(maxRed));
    j.document.write("<br>minGreen = " + Math.floor(minGreen));
    j.document.write("<br>maxGreen = " + Math.floor(maxGreen));
    j.document.write("<br>minBlue = " + Math.floor(minBlue));
    j.document.write("<br>maxBlue = " + Math.floor(maxBlue));
    j.document.write("<br>redincval = " + Math.floor(redincval));
    j.document.write("<br>greenincval = " + Math.floor(greenincval));
    j.document.write("<br>blueincval = " + Math.floor(blueincval));
    j.document.write("<br>}")
    j.document.write("</body></html>");
    j.document.close()
}

function setRed(value, data, width, x, y)
{
    var index = width * 4 * y + x * 4;
    data[index] = value;
}

function setGreen(value, data, width, x, y)
{
    var index = width * 4 * y + x * 4 + 1;
    data[index] = value;
}

function setBlue(value, data, width, x, y)
{
    var index = width * 4 * y + x * 4 + 2;
    data[index] = value;
}

function setAlpha(value, data, width, x, y)
{
    var index = width * 4 * y + x * 4 + 3;
    data[index] = value;
}

function getRed(data, width, x, y)
{
    var index = width * 4 * y + x * 4;
    return data[index];
}

function getGreen(data, width, x, y)
{
    var index = width * 4 * y + x * 4 + 1;
    return data[index];
}

function getBlue(data, width, x, y)
{
    var index = width * 4 * y + x * 4 + 2;
    return data[index];
}

function getNewRedValue(x, y, markers, data, width)
{
    var numberOfValues = 0;
    var sum = 0;
    for (var xi = x - 1; xi <= x + 1; xi++) {
        for (var yi = y - 1; yi <= y + 1; yi++) {
            if (xi == x && yi == y) {
                continue;
            }
            if (markers[yi * width + xi]) {
                numberOfValues++;
                sum += getRed(data, width, xi, yi); 
            }
        }
    }
    markers[y * width + x] = true;
    if (numberOfValues == 0) {
        return init_red;
    }
    return sum / numberOfValues;
}

function getNewGreenValue(x, y, markers, data, width)
{
    var numberOfValues = 0;
    var sum = 0;
    for (var xi = x - 1; xi <= x + 1; xi++) {
        for (var yi = y - 1; yi <= y + 1; yi++) {
            if (xi == x && yi == y) {
                continue;
            }
            if (markers[yi * width + xi]) {
                numberOfValues++;
                sum += getGreen(data, width, xi, yi); 
            }
        }
    }
    markers[y * width + x] = true;
    if (numberOfValues == 0) {
        return init_green;
    }
    return sum / numberOfValues;
}

function getNewBlueValue(x, y, markers, data, width)
{
    var numberOfValues = 0;
    var sum = 0;
    for (var xi = x - 1; xi <= x + 1; xi++) {
        for (var yi = y - 1; yi <= y + 1; yi++) {
            if (xi == x && yi == y) {
                continue;
            }
            if (markers[yi * width + xi]) {
                numberOfValues++;
                sum += getBlue(data, width, xi, yi); 
            }
        }
    }
    markers[y * width + x] = true;
    if (numberOfValues == 0) {
        return init_blue;
    }
    return sum / numberOfValues;
}

function createNoiseData(data, width, height)
{
    var rmarkers = new Array();
    var gmarkers = new Array();
    var bmarkers = new Array();
    var redinc = true;
    var blueinc = true;
    var greeninc = true;
    var red = init_red;
    var green = init_green;
    var blue = init_blue;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            rmarkers[y * width + x] = false;
            gmarkers[y * width + x] = false;
            bmarkers[y * width + x] = false;
        } 
    }
    var x;
    var y;
    for (x = 1; x < width - 1; x++ ) {
        for (y = 1; y < height - 1; y++) {
            red = getNewRedValue(x, y, rmarkers, data, width);
            green = getNewGreenValue(x, y, gmarkers, data, width);
            blue = getNewBlueValue(x, y, bmarkers, data, width);
            if (Math.random() < .3) {
                redinc = !redinc;
            }
            if (Math.random() < .3) {
                greeninc = !greeninc;
            }
            if (Math.random() < .3) {
                blueinc = !blueinc;
            }

            if (redinc) {
                red += Math.random() * redincval;
            } else {
                red -= Math.random() * redincval;
            }
            if (red <= minRed) {
                redinc = true;
                red = minRed;
            }
            if (red >= maxRed) {
                redinc = false;
                red = maxRed;
            }
            if (greeninc) {
                green += Math.random() * greenincval;
            } else {
                green -= Math.random() * greenincval;
            }
            if (green <= minGreen) {
                greeninc = true;
                green = minGreen;
            }
            if (green >= maxGreen) {
                greeninc = false;
                green = maxGreen;
            }
            if (blueinc) {
                blue += Math.random() * blueincval;
            } else {
                blue -= Math.random() * blueincval;
            }
            if (blue <= minBlue) {
                blueinc = true;
                blue = minBlue;
            }
            if (blue >= maxBlue) {
                blueinc = false;
                blue = maxBlue;
            }
            setRed(red, data, width, x, y);
            setGreen(green, data, width, x, y);
            setBlue(blue, data, width, x, y);
            setAlpha(255, data, width, x, y);
        } 
        x++;
        for (y = height - 1; y > 0; y--) {
            red = getNewRedValue(x, y, rmarkers, data, width);
            green = getNewGreenValue(x, y, gmarkers, data, width);
            blue = getNewBlueValue(x, y, bmarkers, data, width);
            if (Math.random() < .3) {
                redinc = !redinc;
            }
            if (Math.random() < .3) {
                greeninc = !greeninc;
            }
            if (Math.random() < .3) {
                blueinc = !blueinc;
            }

            if (redinc) {
                red += Math.random() * redincval;
            } else {
                red -= Math.random() * redincval;
            }
            if (red < minRed) {
                redinc = true;
                red = minRed;
            }
            if (red > maxRed) {
                redinc = false;
                red = maxRed;
            }
            if (greeninc) {
                green += Math.random() * greenincval;
            } else {
                green -= Math.random() * greenincval;
            }
            if (green < minGreen) {
                greeninc = true;
                green = minGreen;
            }
            if (green > maxGreen) {
                greeninc = false;
                green = maxGreen;
            }
            if (blueinc) {
                blue += Math.random() * blueincval;
            } else {
                blue -= Math.random() * blueincval;
            }
            if (blue < minBlue) {
                blueinc = true;
                blue = minBlue;
            }
            if (blue > maxBlue) {
                blueinc = false;
                blue = maxBlue;
            }
            setRed(red, data, width, x, y);
            setGreen(green, data, width, x, y);
            setBlue(blue, data, width, x, y);
            setAlpha(255, data, width, x, y);
        } 
    }
    return data;
}
