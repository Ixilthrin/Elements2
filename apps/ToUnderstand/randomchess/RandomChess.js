var RandomChess = function(graphics, textDrawing) {
    let that = {
        Graphics: graphics,
        TextDrawing: textDrawing,
        chessboard: null,
        initialize: function() {
            var newImage = new Image();
            newImage.src = "randomchess/chessboard.jpg";
            newImage.addEventListener("load", function() {
                that.chessboard = newImage;
                that.Graphics.needsRedraw = true;
            });
        },
        draw: function() {
            if (that.chessboard != null)
            {
                that.Graphics.context.drawImage(that.chessboard, 100, 100, 500,500);
            }
            that.TextDrawing.drawHeader5Text(that.Graphics.context, "Random Chess", 100, 50);
            that.TextDrawing.drawOutlinedText(that.Graphics.context, 
                                              "R", 
                                              112, 
                                              150,
                                              "blue",
                                              "blue",
                                              38,
                                              'Arial');
            that.TextDrawing.drawOutlinedText(that.Graphics.context, 
              "N", 
              176, 
              150,
              "blue",
              "blue",
              38,
              'Arial');
            that.TextDrawing.drawOutlinedText(that.Graphics.context, 
              "R", 
              112, 
              588,
              "green",
              "green",
              38,
              'Arial');
        },
        update: function() {
        }
    }
    return that;
}