var Graph = function(graphics, textUtil, imageUtil) {
    let that = {
        Graphics: graphics,
        TextUtil: textUtil,
        ImageUtil: imageUtil,
        Nodes: [],
        NodeDrawer: null,
        initialize: function() {
            that.NodeDrawer = NodeDrawer(graphics, imageUtil);
            
            let node0 = that.Nodes.push(Node(-2, -2, -10, "Hello", [1, 3]));
            let node1 = that.Nodes.push(Node(2, 2, -20, "Goodbye",[2, 6]));// 2
            let node2 = that.Nodes.push(Node(-2, 2, -15, "Another One", [3, 4]));//3,4
            let node3 = that.Nodes.push(Node(-1, 2.5, -5, "Panda", [4]));//4
            let node4 = that.Nodes.push(Node(-3, -1, -25, "Zebra", [5, 6]));//5
            let node5 = that.Nodes.push(Node(-4, -2.3, -5, "Zebra Food", []));
            let node6 = that.Nodes.push(Node(2, -2.3, -8, "Zoo", []));
        },
        drawEdge: function(node1, node2) {
            let x1 = 0;
            let y1 = 0;
            let z1 = 0;
            let x2 = 0;
            let y2 = 0;
            let z2 = 0;
            
            let vert1 = [node1.X, node1.Y, node1.Z, 1];
            //alert(vert1);
            let vert2 = [node2.X, node2.Y, node2.Z, 1];
            //alert(vert2);
            
            // use width/height vectors because we want to get their projected values
            let width1 = [node1.Width, 0, 0, 0];
            let width2 = [node2.Width, 0, 0, 0];
            let height1 = [node1.Height, 0, 0, 0];
            let height2 = [node2.Height, 0, 0, 0];
            
            
            let mMatrix = that.Graphics.view.mMatrix;  // model matrix
            let pMatrix = that.Graphics.view.pMatrix; // projection matrix
            //alert(mMatrix);
            
            let transform = that.Graphics.view.frustum.matrixMult(mMatrix, pMatrix);
            //alert(transform);
            
            vert1 = that.Graphics.view.frustum.transformVertex(transform, vert1);
            //alert(vert1);
            vert2 = that.Graphics.view.frustum.transformVertex(transform, vert2);
            //alert(vert2);
            //alert(width1);
            
            // get projected height/width values for both nodes being connected
            width1 = that.Graphics.view.frustum.transformVertex(transform, width1);
            width2 = that.Graphics.view.frustum.transformVertex(transform, width2);
            height1 = that.Graphics.view.frustum.transformVertex(transform, height1);
            height2 = that.Graphics.view.frustum.transformVertex(transform, height2);
          
            //alert(width1);
            //alert(width2);
            //alert(node1.Width);
            //alert("vert2[0] + width2[0] = " + (vert2[0] + width2[0]));
            if (vert1[0] + width1[0] < vert2[0] - 2)
            {
               // alert(1);
                x1 = node1.X + node1.Width;
                y1 = node1.Y + node1.Height / 2;
                z1 = node1.Z;
                x2 = node2.X;
                y2 = node2.Y + node2.Height / 2;
                z2 = node2.Z;
            }   
            else if (vert2[0] + width2[0] < vert1[0] - 2)
            {
                //alert(2);
                x1 = node2.X + node2.Width;
                y1 = node2.Y + node2.Height / 2;
                z1 = node2.Z;
                x2 = node1.X;
                y2 = node1.Y + node1.Height / 2;
                z2 = node1.Z;
            }                
            else if (vert1[1] < vert2[1])
            {
                x1 = node1.X + node1.Width / 2;
                y1 = node1.Y + node1.Height;
                z1 = node1.Z;
                x2 = node2.X + node2.Width / 2;
                y2 = node2.Y;
                z2 = node2.Z;
            }
            else if (vert2[1] < vert1[1])
            {
                x1 = node2.X + node2.Width / 2;
                y1 = node2.Y + node2.Height;
                z1 = node2.Z;
                x2 = node1.X + node1.Width / 2;
                y2 = node1.Y;
                z2 = node1.Z;
            }
            else 
            {
                x1 = node1.X + node1.Width / 2;
                y1 = node1.Y + node1.Height / 2;
                z1 = node1.Z;
                x2 = node2.X + node2.Width / 2;
                y2 = node2.Y + node2.Height / 2;
                z2 = node2.Z;
                
            }
            graphics.view.drawLine(graphics.context, [x1, y1, z1, x2, y2, z2]);
            
        },
        draw: function() {
            graphics.view.eraseView(graphics.context);
            //alert("node" + that.Nodes[0]);
            that.Nodes.forEach(node => { 
                /*alert("node = " + node);*/ 
                that.NodeDrawer.drawNode(node); 
            });
            
            for (var i = 0; i < that.Nodes.length - 1; i = i + 1)
            {
                let node1 = that.Nodes[i];
                //alert(node1.Connections.length);
                //alert(node1.Connections.length);
                for (var j = 0; j < node1.Connections.length; j = j + 1)
                {
                    //alert(node1.Connections[j]);
                    let node2 = that.Nodes[node1.Connections[j]];
                    //alert(node2);
                    that.drawEdge(node1, node2);
                }
            }
        },
        update: function() {
        },
        reset: function() {
            return true;
        }
    }
    return that;
}