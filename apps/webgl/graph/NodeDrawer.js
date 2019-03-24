var NodeDrawer = function(graphics, imageUtil) {
    let that = {
        Graphics: graphics,
        ImageUtil: imageUtil,
        drawNode: function(node) {
            let scale = 200;
            //alert("calling drawNode " + node.text);
            //alert("imageUtil = " + that.ImageUtil);
            //if (node.ImageData == null)
                node.ImageData = that.ImageUtil.getImageForText(node.Text);
            //alert("imageData = " + imageData);
            //alert("view = " + that.Graphics.view);
            //alert("graphics = " + graphics);
            //alert("graphics.context = " + graphics.context);
            node.Width = node.ImageData.width / scale;
            node.Height = node.ImageData.height /scale;
            that.Graphics.view.drawImage(graphics.context, node.ImageData, node.X, node.Y, node.Z, node.Width, node.Height);
            //alert(node.X);
            //alert("finished calling drawTextBox");
        }
    }
    return that;
}