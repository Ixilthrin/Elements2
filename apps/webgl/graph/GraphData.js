var GraphData = function() {
    let that = {
        getGraphData: function() {
            let data = [];
            data.push(Node(-2, -2, -10, "Hello", [1, 3]));
            data.push(Node(2, 2, -20, "Goodbye",[2, 6]));// 2
            data.push(Node(-2, 2, -15, "Another One", [3, 4]));//3,4
            data.push(Node(-1, 2.5, -5, "Panda", [4]));//4
            data.push(Node(-3, -1, -25, "Zebra", [5, 6]));//5
            data.push(Node(-4, -2.3, -5, "Zebra Food", []));
            data.push(Node(2, -2.3, -8, "Zoo", []));
            return data;
        }
    }
    return that;
}