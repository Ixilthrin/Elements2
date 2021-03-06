var TextDrawingUtil = function() {
    let that = {
        drawOutlinedText: function (context, text, x, y, outsideColor, insideColor, pt, fontName) {
            context.font = pt + 'pt ' + fontName;// + " bold";
            context.strokeStyle = outsideColor;
            context.fillStyle = insideColor;
            context.fillText(text, x, y);
            context.strokeText(text, x, y);
        },
        drawText: function(context, text, x, y, color, pt, fontName) {
            context.font = pt + 'pt ' + fontName;
            context.fillStyle = color;
            context.fillText(text, x, y);
        },
        drawDefaultText: function (context, text, x, y) {
            that.drawOutlinedText(context, text, x, y, 'black','black',12,'Arial');
        },
        drawHeader1Text: function (context, text, x, y) {
            that.drawOutlinedText(context, text, x, y, 'cornflowerblue','black',16,'Arial');
        },
        drawHeader5Text: function (context, text, x, y) {
            that.drawOutlinedText(context, text, x, y, 'cornflowerblue','black',38,'Arial');
        },
    }
    return that;
}