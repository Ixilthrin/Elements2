var AsyncAwaitLecture = function(graphics, textDrawing) {
    let that = {
        Graphics: graphics,
        TextDrawing: textDrawing,
        commands: null,
        x: 5,
        y: 50,
        initialize: function() {
            that.commands = [];
            that.commands.push((Graphics) => that.TextDrawing.drawHeader5Text(that.Graphics.context, "Understanding Async Await", that.x, that.y));

            that.commands.push((Graphics) => that.TextDrawing.drawHeader1Text(that.Graphics.context, "Some key terms:", that.x, that.y+30));
            that.commands.push((Graphics) => that.TextDrawing.drawDefaultText(that.Graphics.context, "Task", that.x, that.y+60));
            that.commands.push((Graphics) => that.TextDrawing.drawDefaultText(that.Graphics.context, "Synchronization Context", that.x, that.y+80));
            that.commands.push((Graphics) => that.TextDrawing.drawDefaultText(that.Graphics.context, "Thread Scheduler", that.x, that.y+100));
        },
        draw: function() {
            graphics.view.clearScreen();
            for (var i = 0; i < that.commands.length; i++)
            {
                that.commands[i](that.Graphics);
            }
        },
        update: function() {
            if (that.x <= 50)
            {
                that.x++;
                that.Graphics.needsRedraw = true;
            }
        },
        reset: function() {
            return true;
        }
    }
    return that;
}