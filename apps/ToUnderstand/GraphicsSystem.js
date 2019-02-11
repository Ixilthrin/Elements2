var GraphicsSystem = function(canvas, view) {
    let that = {
        needsRedraw: true,
        canvas: canvas,
        view: view,
        context: null,
        initialize: function () {
            that.context = that.view.createContext(canvas);
        }
    }
    return that;
}