var GraphicsSystem = function(canvas, view) {
	let that = {
		canvas: canvas,
		view: view,
		context: null,
		initialize: function () {
			that.context = view.createContext(canvas);
		}
	}
	return that;
}