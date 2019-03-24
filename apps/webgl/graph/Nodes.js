var Node = function(x, y, z, text, connections) {
    let that = {
        X: x,
        Y: y,
        Z: z,
        Text: text,
        Height: 0,
        Width: 0,
        Connections: connections,
        ImageData: null
    }
    return that;
}