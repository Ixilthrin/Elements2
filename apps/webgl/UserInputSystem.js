var UserInputSystem = function(document, canvas) {
    let that = {
        currentX: 0,
        currentY: 0,
        initialize: function () {
            document.addEventListener("keydown", DefaultDocumentListener.OnKeyDown);
            document.addEventListener("keyup", DefaultDocumentListener.OnKeyUp);
            
            canvas.tabindex = "1";
            canvas.focus();
            canvas.addEventListener("mouseover", DefaultCanvasListener.OnMouseOver);
            canvas.addEventListener("mousemove", DefaultCanvasListener.OnMouseMove);
            canvas.addEventListener("mouseup", DefaultCanvasListener.OnMouseUp);
            canvas.addEventListener("mousedown", DefaultCanvasListener.OnMouseDown);
            canvas.addEventListener("dblclick", DefaultCanvasListener.OnDblClick);
        }
    }
    return that;
}

var DefaultDocumentListener = function() {
    let that = {
        OnKeydown: function(event) {
            e.preventDefault();
	        Graphics.needsRedraw = true;
	        canvas.focus();
	        if (e.keyCode == 91) // Mac command key
            {
                return;
            }
               
            if (e.ctrlKey || commandKeyIsDown) {
                if (e.keyCode == 67) {  // 'C' key
                   return;
                }
                if (e.keyCode == 86) {  // 'V' key
                    return;
                }
            }
            var code = e.keyCode;
            if (code >= 65 && code <= 90 && !e.shiftKey && !capsLock) {
                code += 32;
            }
            if (e.keyCode == 37) { // left arrow key
                return;
            }
            if (e.keyCode == 38) { // up arrow key
               return;
            }
            if (e.keyCode == 39) { // right arrow key
                return;
            }
            if (e.keyCode == 40) { // down arrow key
                return;
            }
            if (code == 20) {  // capslock
            } else if (code == 13) {
                // ENTER key pressed, move to next line
            } else if (code == 46) { // delete
            }
        },
        OnKeyUp: function(event) {
            e.preventDefault();
            var code = e.keyCode;
            Graphics.canvas.focus();
           
            if (e.keyCode == 91) // Mac command key
            {
                return;
            }
               
            if (code == 27) { // Escape
                return;
            }
            if (code == 9) // tab
            {
            }
           
            if (code >= 49 && code <= 57) { // number keys
                return;
            }
            if (code == 71) {
            } else if (code == 66) {
            } else if (code == 82) {
            } else if (code == 89) {
            } else if (code == 75) {
            } else if (code == 87) {
            }
        }
    }
    return that;
}

var DefaultCanvasListener = function() {
    let that = {
        OnMouseOver: function(event) {
            canvas.focus();
        },
        OnMouseMove: function(event) {
            e.preventDefault();
	        Graphics.needsRedraw = true;
            var centerX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
            var centerY = document.body.scrollTop + e.clientY - canvas.offsetTop;
            if (e.wheelDelta > 0) {
            }
        },
        OnMouseUp: function(event) {
            if (e.shiftKey) {
                return;
            }
        },
        OnMouseDown: function(event) {
            e.preventDefault();
            Graphics.needsRedraw = true;
            canvas.focus();
            let mouseX = document.body.scrollLeft + e.clientX - canvas.offsetLeft;
            let mouseY = document.body.scrollTop + e.clientY - canvas.offsetTop;
        },
        OnDblClick: function (event) {
        }
    }
    return that;
}