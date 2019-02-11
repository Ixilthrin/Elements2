var ChessPiece = function(color, kind, symbol) {
    let that = {
        Color: color,
        Kind: kind,
        Symbol: symbol
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
                    if (tempIndex >= 0 && chessboard[tempIndex].ChessPiece == null) {
                        indices.push(tempIndex);
                    }
                }
            } else if (color == "black") {
                //check single move
                let tempIndex = currentIndex + 8;
                //alert(chessboard[tempIndex].ChessPiece);
                if (tempIndex < 64 && chessboard[tempIndex].ChessPiece == null) {
                    indices.push(tempIndex);
                    
                    //check double move
                    tempIndex = currentIndex + 16;
                    if (tempIndex < 64 && chessboard[tempIndex].ChessPiece == null) {
                        indices.push(tempIndex);
                    }
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
            
            that.ChessBoard[0].ChessPiece = ChessPiece("black", "rook", "R");
            that.ChessBoard[1].ChessPiece = ChessPiece("black", "knight", "N");
            that.ChessBoard[2].ChessPiece = ChessPiece("black", "bishop", "B");
            that.ChessBoard[3].ChessPiece = ChessPiece("black", "queen", "Q");
            that.ChessBoard[4].ChessPiece = ChessPiece("black", "king", "K");
            that.ChessBoard[5].ChessPiece = ChessPiece("black", "bishop", "B");
            that.ChessBoard[6].ChessPiece = ChessPiece("black", "knight", "N");
            that.ChessBoard[7].ChessPiece = ChessPiece("black", "rook", "R");
            that.ChessBoard[8].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[9].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[10].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[11].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[12].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[13].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[14].ChessPiece = ChessPiece("black", "pawn", "P");
            that.ChessBoard[15].ChessPiece = ChessPiece("black", "pawn", "P");
            
            that.ChessBoard[48].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[49].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[50].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[51].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[52].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[53].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[54].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[55].ChessPiece = ChessPiece("white", "pawn", "P");
            that.ChessBoard[56].ChessPiece = ChessPiece("white", "rook", "R");
            that.ChessBoard[57].ChessPiece = ChessPiece("white", "knight", "N");
            that.ChessBoard[58].ChessPiece = ChessPiece("white", "bishop", "B");
            that.ChessBoard[59].ChessPiece = ChessPiece("white", "queen", "Q");
            that.ChessBoard[60].ChessPiece = ChessPiece("white", "king", "K");
            that.ChessBoard[61].ChessPiece = ChessPiece("white", "bishop", "B");
            that.ChessBoard[62].ChessPiece = ChessPiece("white", "knight", "N");
            that.ChessBoard[63].ChessPiece = ChessPiece("white", "rook", "R");
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
            var index = 0;
            index = 48 + Math.floor(Math.random() * 1000) % 8;
            var chessPiece = that.ChessBoard[index].ChessPiece;
            if (chessPiece == null)
                return;
            var moves = PawnMoves();
            var potentialMoves = moves.GetPotentialMoves(that.ChessBoard, index, "white");
            if (potentialMoves.length > 0)
            {
                let localIndex = Math.floor(Math.random() * potentialMoves.length);
                var nextMove = potentialMoves[localIndex];
                that.ChessBoard[nextMove].ChessPiece = chessPiece;
                that.ChessBoard[index].ChessPiece = null;
            }
            
            
            index = 8 + Math.floor(Math.random() * 1000) % 8;
            var chessPiece = that.ChessBoard[index].ChessPiece;
            if (chessPiece == null)
                return;
            var moves = PawnMoves();
            var potentialMoves = moves.GetPotentialMoves(that.ChessBoard, index, "black");
            if (potentialMoves.length > 0)
            {
                let localIndex = Math.floor(Math.random() * potentialMoves.length);
                var nextMove = potentialMoves[localIndex];
                that.ChessBoard[nextMove].ChessPiece = chessPiece;
                that.ChessBoard[index].ChessPiece = null;
            }
        }
    }
    return that;
}