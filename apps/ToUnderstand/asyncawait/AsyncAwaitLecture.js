var AsyncAwaitLecture = function(graphics, textDrawing) {
    let that = {
        Graphics: graphics,
        TextDrawing: textDrawing,
        commands: null,
        x: 5,
        y: 50,
        initialize: function() {
            that.commands = [];
            that.commands.push((Graphics) => that.TextDrawing.drawHeader5Text(Graphics.context, "Understanding Async Await", that.x, that.y));

            that.commands.push((Graphics) => that.TextDrawing.drawHeader1Text(Graphics.context, "Some key terms:", that.x, that.y+30));
            that.commands.push((Graphics) => that.TextDrawing.drawDefaultText(Graphics.context, "Task", that.x, that.y+60));
            that.commands.push((Graphics) => that.TextDrawing.drawDefaultText(Graphics.context, "Synchronization Context", that.x, that.y+80));
            that.commands.push((Graphics) => that.TextDrawing.drawDefaultText(Graphics.context, "Thread Scheduler", that.x, that.y+100));
            that.commands.push(that.drawConceptsSection);
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
        },
        drawConceptsSection: function(Graphics) {
            that.TextDrawing.drawHeader1Text(Graphics.context, "Concepts:", that.x, that.y + 150);
            that.TextDrawing.drawDefaultText(Graphics.context, "async/await chain", that.x, that.y + 170);
            that.TextDrawing.drawDefaultText(Graphics.context, "starting an async/await chain", that.x, that.y + 190);
            that.TextDrawing.drawDefaultText(Graphics.context, "ending an async/await chain", that.x, that.y + 210);
            that.TextDrawing.drawDefaultText(Graphics.context, "difference between async and normal methods that both return Task.", that.x, that.y + 230);
            that.TextDrawing.drawDefaultText(Graphics.context, "what does it mean to call an async method without using the await keyword?", that.x, that.y +250);
        }
    }
    return that;
}