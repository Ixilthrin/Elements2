var ChessPiece = function(color, kind, symbol, index) {
    let that = {
        Color: color,
        Kind: kind,
        Symbol: symbol,
        Active: true,
        Index: index
    }
    return that;
}

var ChessSquare = function() {
    let that = {
        ChessPiece: null
    }
    return that;
}

var PawnMoves = function() {
    let that = {
        GetPotentialMoves: function(chessboard, currentIndex, color) {
            var indices = [];
            if (color == "white") {
                //check single move
                let tempIndex = currentIndex - 8;
                //alert(chessboard[tempIndex].ChessPiece);
                if (tempIndex >= 0 && chessboard[tempIndex].ChessPiece == null) {
                    indices.push(tempIndex);
                    
                    //check double move
                    tempIndex = currentIndex - 16;
                    if (tempIndex >= 0 && currentIndex < 16 && chessboard[tempIndex].ChessPiece == null) {
                        indices.push(tempIndex);
                    }
                }
                //check capture
                if (currentIndex % 8 > 1)
                { 
                    tempIndex = currentIndex - 9;
                    if (tempIndex >= 0 && chessboard[tempIndex].ChessPiece != null && chessboard[tempIndex].ChessPiece.Color == "black")
                       indices.push(tempIndex);
                }
                
                if (currentIndex % 8 < 7)
                {
                    tempIndex = currentIndex - 7;
                    if (tempIndex >=0 && chessboard[tempIndex].ChessPiece != null && chessboard[tempIndex].ChessPiece.Color == "black")
                        indices.push(tempIndex);
                }
                
            } else if (color == "black") {
                //check single move
                let tempIndex = currentIndex + 8;
                //alert(chessboard[tempIndex].ChessPiece);
                if (tempIndex < 64 && chessboard[tempIndex].ChessPiece == null) {
                    indices.push(tempIndex);
                    
                    //check double move
                    tempIndex = currentIndex + 16;
                    if (tempIndex < 64 && currentIndex > 48 && chessboard[tempIndex].ChessPiece == null) {
                        indices.push(tempIndex);
                    }
                }
                
                // check capture
                if (currentIndex % 8 > 1)
                {
                    tempIndex = currentIndex + 7;
                    if (tempIndex < 64 && chessboard[tempIndex].ChessPiece != null && chessboard[tempIndex].ChessPiece.Color == "white")
                        indices.push(tempIndex);
                }
                
                if (currentIndex % 8 < 7)
                {
                    tempIndex = currentIndex + 9;
                    if (tempIndex < 64 && chessboard[tempIndex].ChessPiece != null && chessboard[tempIndex].ChessPiece.Color == "white")
                       indices.push(tempIndex);
                }
            }
            return indices;
        }
    }
    return that;
}

var RandomChess = function(graphics, textDrawing) {
    let that = {
        Graphics: graphics,
        TextDrawing: textDrawing,
        ChessboardImage: null,
        ChessBoard: [],
        WhitePieces: [],
        BlackPieces: [],
        NextTurn: "white",
        FrameCount: 0,
        initialize: function() {
            var newImage = new Image();
            newImage.src = "randomchess/chessboard.jpg";
            newImage.addEventListener("load", function() {
                that.ChessboardImage = newImage;
                that.Graphics.needsRedraw = true;
            });
            
            for (var i = 0; i < 64; ++i)
            {
                let square = ChessSquare();
                that.ChessBoard.push(square);
            }
            
            that.ChessBoard[0].ChessPiece = ChessPiece("black", "rook", "R", 0);
            that.ChessBoard[1].ChessPiece = ChessPiece("black", "knight", "N", 1);
            that.ChessBoard[2].ChessPiece = ChessPiece("black", "bishop", "B", 2);
            that.ChessBoard[3].ChessPiece = ChessPiece("black", "queen", "Q", 3);
            that.ChessBoard[4].ChessPiece = ChessPiece("black", "king", "K", 4);
            that.ChessBoard[5].ChessPiece = ChessPiece("black", "bishop", "B", 5);
            that.ChessBoard[6].ChessPiece = ChessPiece("black", "knight", "N", 6);
            that.ChessBoard[7].ChessPiece = ChessPiece("black", "rook", "R", 7);
            that.ChessBoard[8].ChessPiece = ChessPiece("black", "pawn", "P", 8);
            that.ChessBoard[9].ChessPiece = ChessPiece("black", "pawn", "P", 9);
            that.ChessBoard[10].ChessPiece = ChessPiece("black", "pawn", "P", 10);
            that.ChessBoard[11].ChessPiece = ChessPiece("black", "pawn", "P", 11);
            that.ChessBoard[12].ChessPiece = ChessPiece("black", "pawn", "P", 12);
            that.ChessBoard[13].ChessPiece = ChessPiece("black", "pawn", "P", 13);
            that.ChessBoard[14].ChessPiece = ChessPiece("black", "pawn", "P", 14);
            that.ChessBoard[15].ChessPiece = ChessPiece("black", "pawn", "P", 15);
            
            that.ChessBoard[48].ChessPiece = ChessPiece("white", "pawn", "P", 48);
            that.ChessBoard[49].ChessPiece = ChessPiece("white", "pawn", "P", 49);
            that.ChessBoard[50].ChessPiece = ChessPiece("white", "pawn", "P", 50);
            that.ChessBoard[51].ChessPiece = ChessPiece("white", "pawn", "P", 51);
            that.ChessBoard[52].ChessPiece = ChessPiece("white", "pawn", "P", 52);
            that.ChessBoard[53].ChessPiece = ChessPiece("white", "pawn", "P", 53);
            that.ChessBoard[54].ChessPiece = ChessPiece("white", "pawn", "P", 54);
            that.ChessBoard[55].ChessPiece = ChessPiece("white", "pawn", "P", 55);
            that.ChessBoard[56].ChessPiece = ChessPiece("white", "rook", "R", 56);
            that.ChessBoard[57].ChessPiece = ChessPiece("white", "knight", "N", 57);
            that.ChessBoard[58].ChessPiece = ChessPiece("white", "bishop", "B", 58);
            that.ChessBoard[59].ChessPiece = ChessPiece("white", "queen", "Q", 59);
            that.ChessBoard[60].ChessPiece = ChessPiece("white", "king", "K", 60);
            that.ChessBoard[61].ChessPiece = ChessPiece("white", "bishop", "B", 61);
            that.ChessBoard[62].ChessPiece = ChessPiece("white", "knight", "N", 62);
            that.ChessBoard[63].ChessPiece = ChessPiece("white", "rook", "R", 63);
            
            for (var j = 0; j < 16; ++j) {
                that.BlackPieces.push(that.ChessBoard[j].ChessPiece);
                that.WhitePieces.push(that.ChessBoard[j + 48].ChessPiece);
            }
        },
        draw: function() {
            if (that.ChessboardImage != null)
            {
                that.Graphics.context.drawImage(that.ChessboardImage, 100, 100, 500,500);
            }
            that.TextDrawing.drawHeader5Text(that.Graphics.context, "Random Chess", 100, 50);
            
            for (var i = 0; i < 64; ++i)
            {
                let x = 112 + (i % 8) * 62.5;
                let y = 150 + Math.floor(i / 8) * 62.5;
                let chessPiece = that.ChessBoard[i].ChessPiece;
                if (chessPiece == null)
                    continue;
                let color = "gold";
                if (chessPiece.Color == "white")
                    color = "silver";
                that.TextDrawing.drawOutlinedText(
                    that.Graphics.context, 
                    chessPiece.Symbol, 
                    x, 
                    y,
                    color,
                    color,
                    38,
                    'Arial'
                );
            }
        },
        update: function() {
            that.FrameCount = that.FrameCount + 1;
            if (that.FrameCount < 40)
            {
                return;
            }
            that.FrameCount = 0;
            var pieces = null;
            if (that.NextTurn == "white")
                pieces = that.WhitePieces;
            else if (that.NextTurn == "black")
                pieces = that.BlackPieces;
            else
                return;
            
            var count = pieces.length;
            
            var index = Math.floor(Math.random() * 1000) % count;
            
            var chessPiece = pieces[index];
            if (chessPiece == null || chessPiece.Kind != "pawn" || !chessPiece.Active)
            {
                that.Graphics.Redraw = true;
                that.FrameCount = that.FrameCount + 1;
                return;
            }
            
            var moves = PawnMoves();
            var potentialMoves = moves.GetPotentialMoves(that.ChessBoard, chessPiece.Index, that.NextTurn);
            var oldIndex = chessPiece.Index;
            if (potentialMoves.length > 0)
            {
                let localIndex = Math.floor(Math.random() * 1000) % potentialMoves.length;
                var nextMove = potentialMoves[localIndex];
                
                var currentPiece = that.ChessBoard[nextMove].ChessPiece;
                if (currentPiece != null)
                {
                    currentPiece.Active = false;
                    currentPiece.Index = -1;
                }
                that.ChessBoard[nextMove].ChessPiece = chessPiece;
                that.ChessBoard[oldIndex].ChessPiece = null;
                chessPiece.Index = nextMove;
                if (that.NextTurn == "white")
                    that.NextTurn = "black";
                else
                    that.NextTurn = "white";
                that.Graphics.Redraw = true;
            }
        }
    }
    return that;
}