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

var KnightMoves = function() {
    let that = {
        GetPotentialMoves: function(chessboard, currentIndex, color) {
            var indices = [];
            // up 2- right 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 7)
            {
                tempIndex = currentIndex - 15;
                if (tempIndex >= 0 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // up 1- right 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 6)
            {
                tempIndex = currentIndex - 6;
                if (tempIndex >= 0 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // down 2 -right 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 7)
            {
                tempIndex = currentIndex + 17;
                if (tempIndex < 64 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // down 1 -right 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 6)
            {
                tempIndex = currentIndex + 10;
                if (tempIndex < 64 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // down 2 - left 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 0)
            {
                tempIndex = currentIndex + 15;
                if (tempIndex < 64 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // down 1 - left 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 1)
            {
                tempIndex = currentIndex + 6;
                if (tempIndex < 64 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // up 2 -left 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 0)
            {
                tempIndex = currentIndex - 17;
                if (tempIndex >= 0 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            // up 1 -left 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 1)
            {
                tempIndex = currentIndex - 10;
                if (tempIndex >= 0 && (chessboard[tempIndex].ChessPiece == null || chessboard[tempIndex].ChessPiece.Color != color))
                    indices.push(tempIndex);
            }
            return indices;
        }
    }
    return that;
}

var BishopMoves = function() {
    let that = {
        GetPotentialMoves: function(chessboard, currentIndex, color) {
            var indices = [];
            // up-right
            var canContinue = true;
            var tempIndex = currentIndex;
            while (canContinue)
            {
                if (tempIndex % 8 == 7)
                {
                    canContinue = false;
                    break;
                }
                tempIndex = tempIndex - 7;
                if (tempIndex < 0)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            }
            // up-left
            canContinue = true;
            tempIndex = currentIndex;
            while (canContinue)
            {
                if (tempIndex % 8 == 0)
                {
                    canContinue = false;
                    break;
                }
                tempIndex = tempIndex - 9;
                if (tempIndex < 0)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            }
            // down-right
            canContinue = true;
            tempIndex = currentIndex;
            while (canContinue)
            {
                if (tempIndex % 8 == 7)
                {
                    canContinue = false;
                    break;
                }
                tempIndex = tempIndex + 9;
                if (tempIndex > 63)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            } 
            // down-left
            canContinue = true;
            tempIndex = currentIndex;
            while (canContinue)
            {
                if (tempIndex % 8 == 0)
                {
                    canContinue = false;
                    break;
                }
                tempIndex = tempIndex + 7;
                if (tempIndex > 63)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            }
            return indices;
        }
    }
    return that;
}

var RookMoves = function() {
    let that = {
        GetPotentialMoves: function(chessboard, currentIndex, color) {
            var indices = [];
            // forward
            var canContinue = true;
            var tempIndex = currentIndex;
            while (canContinue)
            {
                tempIndex = tempIndex - 8;
                if (tempIndex < 0)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            }
            // backward
            canContinue = true;
            tempIndex = currentIndex;
            while (canContinue)
            {
                tempIndex = tempIndex + 8;
                if (tempIndex > 63)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            }
            // right
            canContinue = currentIndex % 8 < 7;
            tempIndex = currentIndex;
            while (canContinue)
            {
                if (tempIndex % 8 == 7)
                {
                    canContinue = false;
                    break;
                }
                tempIndex = tempIndex + 1;
                if (tempIndex > 63)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            } 
            // left
            canContinue = currentIndex % 8 > 0;
            tempIndex = currentIndex;
            while (canContinue)
            {
                if (tempIndex % 8 == 0)
                {
                    canContinue = false;
                    break;
                }
                tempIndex = tempIndex - 1;
                if (tempIndex < 0)
                {
                    canContinue = false;
                    break;
                }
                if (chessboard[tempIndex].ChessPiece != null)
                {
                    if (chessboard[tempIndex].ChessPiece.Color != color)
                        indices.push(tempIndex);
                    canContinue = false;
                    break;
                }
                indices.push(tempIndex);
            }
            return indices;
        }
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

var PieceTransition = function(chessPiece, oldPosition, newPosition)
{
    let that = {
        ChessPiece: chessPiece,
        OldPosition: oldPosition,
        NewPosition: newPosition,
        Progress: 0,
        UpdateProgress: function() {
            that.Progress = that.Progress + .05;
            if (that.Progress > 1)
                that.IsComplete = true;
        },
        IsComplete: false
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
        Transition: null,
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
            
            that.BlackPieces.push(that.ChessBoard[0].ChessPiece = ChessPiece("black", "rook", "R", 0));
            that.BlackPieces.push(that.ChessBoard[1].ChessPiece = ChessPiece("black", "knight", "N", 1));
            that.BlackPieces.push(that.ChessBoard[2].ChessPiece = ChessPiece("black", "bishop", "B", 2));
            that.BlackPieces.push(that.ChessBoard[3].ChessPiece = ChessPiece("black", "queen", "Q", 3));
            that.BlackPieces.push(that.ChessBoard[4].ChessPiece = ChessPiece("black", "king", "K", 4));
            that.BlackPieces.push(that.ChessBoard[5].ChessPiece = ChessPiece("black", "bishop", "B", 5));
            that.BlackPieces.push(that.ChessBoard[6].ChessPiece = ChessPiece("black", "knight", "N", 6));
            that.BlackPieces.push(that.ChessBoard[7].ChessPiece = ChessPiece("black", "rook", "R", 7));
            that.BlackPieces.push(that.ChessBoard[8].ChessPiece = ChessPiece("black", "pawn", "P", 8));
            that.BlackPieces.push(that.ChessBoard[9].ChessPiece = ChessPiece("black", "pawn", "P", 9));
            that.BlackPieces.push(that.ChessBoard[10].ChessPiece = ChessPiece("black", "pawn", "P", 10));
            that.BlackPieces.push(that.ChessBoard[11].ChessPiece = ChessPiece("black", "pawn", "P", 11));
            that.BlackPieces.push(that.ChessBoard[12].ChessPiece = ChessPiece("black", "pawn", "P", 12));
            that.BlackPieces.push(that.ChessBoard[13].ChessPiece = ChessPiece("black", "pawn", "P", 13));
            that.BlackPieces.push(that.ChessBoard[14].ChessPiece = ChessPiece("black", "pawn", "P", 14));
            that.BlackPieces.push(that.ChessBoard[15].ChessPiece = ChessPiece("black", "pawn", "P", 15));
            
            that.WhitePieces.push(that.ChessBoard[48].ChessPiece = ChessPiece("white", "pawn", "P", 48));
            that.WhitePieces.push(that.ChessBoard[49].ChessPiece = ChessPiece("white", "pawn", "P", 49));
            that.WhitePieces.push(that.ChessBoard[50].ChessPiece = ChessPiece("white", "pawn", "P", 50));
            that.WhitePieces.push(that.ChessBoard[51].ChessPiece = ChessPiece("white", "pawn", "P", 51));
            that.WhitePieces.push(that.ChessBoard[52].ChessPiece = ChessPiece("white", "pawn", "P", 52));
            that.WhitePieces.push(that.ChessBoard[53].ChessPiece = ChessPiece("white", "pawn", "P", 53));
            that.WhitePieces.push(that.ChessBoard[54].ChessPiece = ChessPiece("white", "pawn", "P", 54));
            that.WhitePieces.push(that.ChessBoard[55].ChessPiece = ChessPiece("white", "pawn", "P", 55));
            that.WhitePieces.push(that.ChessBoard[56].ChessPiece = ChessPiece("white", "rook", "R", 56));
            that.WhitePieces.push(that.ChessBoard[57].ChessPiece = ChessPiece("white", "knight", "N", 57));
            that.WhitePieces.push(that.ChessBoard[58].ChessPiece = ChessPiece("white", "bishop", "B", 58));
            that.WhitePieces.push(that.ChessBoard[59].ChessPiece = ChessPiece("white", "queen", "Q", 59));
            that.WhitePieces.push(that.ChessBoard[60].ChessPiece = ChessPiece("white", "king", "K", 60));
            that.WhitePieces.push(that.ChessBoard[61].ChessPiece = ChessPiece("white", "bishop", "B", 61));
            that.WhitePieces.push(that.ChessBoard[62].ChessPiece = ChessPiece("white", "knight", "N", 62));
            that.WhitePieces.push(that.ChessBoard[63].ChessPiece = ChessPiece("white", "rook", "R", 63));
            
        },
        draw: function() {
            graphics.view.clearScreen();
            if (that.ChessboardImage != null)
            {
                that.Graphics.context.drawImage(that.ChessboardImage, 100, 100, 500,500);
            }
            that.TextDrawing.drawHeader5Text(that.Graphics.context, "Random Chess", 100, 50);
            
            if (that.Transition != null && that.Transition.Progress > 1)
            {
                that.ChessBoard[that.Transition.OldPosition].ChessPiece = null;
                that.ChessBoard[that.Transition.NewPosition].ChessPiece = that.Transition.ChessPiece;
                that.Transition.ChessPiece.Index = that.Transition.NewPosition;
                that.Transition = null;
            }
            
            for (var i = 0; i < 64; ++i)
            {
                let x = 112 + (i % 8) * 62.5;
                let y = 150 + Math.floor(i / 8) * 62.5;
                let chessPiece = that.ChessBoard[i].ChessPiece;
                if (chessPiece == null)
                    continue;
                
                if (that.Transition != null) {
                    if (that.Transition.OldPosition == i)
                        continue;
                }
                
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
            
            if (that.Transition != null) {
                let initialX = 112 + (that.Transition.OldPosition % 8) * 62.5;
                let initialY = 150 + Math.floor(that.Transition.OldPosition / 8) * 62.5;
                let finalX = 112 + (that.Transition.NewPosition % 8) * 62.5;
                let finalY = 150 + Math.floor(that.Transition.NewPosition / 8) * 62.5;
                
                let diffX = finalX - initialX;
                let diffY = finalY - initialY;
                
                let currentX = initialX + that.Transition.Progress * diffX;
                let currentY = initialY + that.Transition.Progress * diffY;
                
                let color = "gold";
                if (that.Transition.ChessPiece.Color == "white")
                    color = "silver";
                that.TextDrawing.drawOutlinedText(
                    that.Graphics.context, 
                    that.Transition.ChessPiece.Symbol, 
                    currentX, 
                    currentY,
                    color,
                    color,
                    38,
                    'Arial'
                );
                
                that.Transition.UpdateProgress();
            }
        },
        update: function() {
            if (that.Transition != null)
                return;
            
            that.FrameCount = that.FrameCount + 1;
            if (that.FrameCount < 25)
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
            {
                that.FrameCount = 40;
                return;
            }
            
            var count = pieces.length;
            
            var availablePieces = [];
            var availableMoves = [];
            for (var i = 0; i < count; i++)
            {
                let thePiece = pieces[i];
                if (thePiece != null && thePiece.Active)
                {
                    var moves = null;
                    if (thePiece.Kind == "pawn")
                        moves = PawnMoves();
                    else if (thePiece.Kind == "rook")
                        moves = RookMoves();
                    else if (thePiece.Kind == "bishop")
                        moves = BishopMoves();
                    else if (thePiece.Kind == "knight")
                        moves = KnightMoves();
                    else if (thePiece.Kind == "queen")
                    {
                        moves = RookMoves();
                        let bishopMoves = BishopMoves();
                        for (var j = 0; j < bishopMoves.length; ++j)
                            moves.push(bishipMoves);
                    }
                    
                    if (moves == null)
                        continue;
                    
                    var potentialMoves = moves.GetPotentialMoves(that.ChessBoard, thePiece.Index, that.NextTurn);
                    if (potentialMoves.length > 0)
                    {
                        availableMoves.push(potentialMoves);
                        availablePieces.push(thePiece);
                    }
                }
            }
            
            var availableCount = availablePieces.length;
            if (availableCount < 1)
                return;
            
            var index = Math.floor(Math.random() * 10000) % availableCount;
            var chessPiece = availablePieces[index];
            
            var moves = availableMoves[index];
            if (moves.length > 0)
            {
                var moveIndex = Math.floor(Math.random() * 10000) % moves.length;
                var theMove = moves[moveIndex];
            
                var oldIndex = chessPiece.Index;
                
                var currentPiece = that.ChessBoard[theMove].ChessPiece;
                
                if (currentPiece != null)
                {
                    if (currentPiece.Kind == "king")
                    {
                        alert(chessPiece.Kind + " threatens");
                        that.NextTurn = "none";
                        return;
                    }
                    currentPiece.Active = false;
                    currentPiece.Index = -1;
                }
                
                that.Transition = PieceTransition(chessPiece, oldIndex, theMove);
                if (that.NextTurn == "white")
                    that.NextTurn = "black";
                else
                    that.NextTurn = "white";
            }
        }
    }
    return that;
}