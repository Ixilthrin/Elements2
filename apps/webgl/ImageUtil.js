var ImageUtil = function(graphics, textUtil) {
    let that = {
        Graphics: graphics,
        TextUtil: textUtil,
        Backbuffer: null,
        InitBackbuffer: function() {
          if (that.Backbuffer == null) {
              let backCanvas = document.createElement('canvas');
              //alert("backCanvas = " + backCanvas);
              backCanvas.width = 1000;
              backCanvas.height = 500;
              that.Backbuffer = backCanvas.getContext('2d');
              //alert("BackBuffer = " + that.Backbuffer);
          }     
        },
        getImageForText: function(text) {
            //alert("calling getImageForText");
            that.InitBackbuffer();
            let backBuffer = that.Backbuffer;
            //alert("backBuffer = " + that.Backbuffer);
            let xPos = 20;
            let yPos = 20;
            let lineHeight = 100;
            let width = backBuffer.measureText(text).width;
            let height = lineHeight;
            backBuffer.font = lineHeight + "px " + "Arial";
            backBuffer.clearRect(0, 0, 1000, 500);
            backBuffer.strokeStyle = "rgba(0, 0, 0, .8)";
            //alert("called backBuffer.clearRect");
            //backBuffer.fillStyle = "rgba(1, 1, 1, .8)";
		    //backBuffer.fill();
            //backBuffer.stroke();
            backBuffer.fillStyle = "rgba(0, 0, 1, .8)";
            backBuffer.lineWidth = 5;
            backBuffer.beginPath();
            //alert("drawing text to backbuffer");
            backBuffer.moveTo(xPos - 10, yPos - 10);
            backBuffer.lineTo(xPos - 10 + width + 20, yPos - 10);
            backBuffer.lineTo(xPos - 10 + width + 20, yPos - 10 + height + 20);
            backBuffer.lineTo(xPos - 10, yPos - 10 + height + 20);
            backBuffer.lineTo(xPos - 10, yPos - 10);
            backBuffer.stroke();
            backBuffer.fillStyle = "blue";
            backBuffer.moveTo(xPos, yPos);
            backBuffer.fillText(text, xPos, yPos + height - 20);
            //alert("finished drawing image. image");
            let image = backBuffer.getImageData(xPos - 13, yPos - 13, width + 26, height + 26);
            //alert("image = " + image);
            //alert(image.width);
            //alert(image.data.length);
            //for (var i = 3; i < image.data.length - 3; i+=4)
            //{
            //    image.data[i] = 0;
            //}
            return image;
        },
    }
    return that;
}