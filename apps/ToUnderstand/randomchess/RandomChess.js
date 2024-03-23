var ChessPiece = function(color, kind, symbol, value, id) {
    let that = {
        Color: color,
        Kind: kind,
        Symbol: symbol,
        Value: value,
        Id: id
    }
    return that;
}

var squareLength = 62.5;

var KingMoves = function() {
    let that = {
        GetPotentialMoves: function(chessboard, currentIndex, color) {
            var indices = [];
            // up
            var tempIndex = currentIndex;
                tempIndex = currentIndex - 8;
                if (tempIndex >= 0 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            // right
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 7)
            {
                tempIndex = currentIndex + 1;
                if (tempIndex < 64 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // left
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 0)
            {
                tempIndex = currentIndex - 1;
                if (tempIndex >= 0 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // down
            var tempIndex = currentIndex;
                tempIndex = currentIndex + 8;
                if (tempIndex < 64 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            return indices;
        }
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
                if (tempIndex >= 0 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // up 1- right 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 6)
            {
                tempIndex = currentIndex - 6;
                if (tempIndex >= 0 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // down 2 -right 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 7)
            {
                tempIndex = currentIndex + 17;
                if (tempIndex < 64 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // down 1 -right 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 < 6)
            {
                tempIndex = currentIndex + 10;
                if (tempIndex < 64 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // down 2 - left 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 0)
            {
                tempIndex = currentIndex + 15;
                if (tempIndex < 64 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // down 1 - left 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 1)
            {
                tempIndex = currentIndex + 6;
                if (tempIndex < 64 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // up 2 -left 1
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 0)
            {
                tempIndex = currentIndex - 17;
                if (tempIndex >= 0 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
                    indices.push(tempIndex);
            }
            // up 1 -left 2
            var tempIndex = currentIndex;
            if (currentIndex % 8 > 1)
            {
                tempIndex = currentIndex - 10;
                if (tempIndex >= 0 && (chessboard[tempIndex] == null || chessboard[tempIndex].Color != color))
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (chessboard[tempIndex] != null)
                {
                    if (chessboard[tempIndex].Color != color)
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
                if (tempIndex >= 0 && chessboard[tempIndex] == null) {
                    indices.push(tempIndex);
                    
                    //check double move
                    tempIndex = currentIndex - 16;
                    if (tempIndex >= 0 && currentIndex < 16 && chessboard[tempIndex] == null) {
                        indices.push(tempIndex);
                    }
                }
                //check capture
                if (currentIndex % 8 > 1)
                { 
                    tempIndex = currentIndex - 9;
                    if (tempIndex >= 0 && chessboard[tempIndex] != null && chessboard[tempIndex].Color == "black")
                       indices.push(tempIndex);
                }
                
                if (currentIndex % 8 < 7)
                {
                    tempIndex = currentIndex - 7;
                    if (tempIndex >=0 && chessboard[tempIndex] != null && chessboard[tempIndex].Color == "black")
                        indices.push(tempIndex);
                }
                
            } else if (color == "black") {
                //check single move
                let tempIndex = currentIndex + 8;
                if (tempIndex < 64 && chessboard[tempIndex] == null) {
                    indices.push(tempIndex);
                    
                    //check double move
                    tempIndex = currentIndex + 16;
                    if (tempIndex < 64 && currentIndex > 48 && chessboard[tempIndex] == null) {
                        indices.push(tempIndex);
                    }
                }
                
                // check capture
                if (currentIndex % 8 > 1)
                {
                    tempIndex = currentIndex + 7;
                    if (tempIndex < 64 && chessboard[tempIndex] != null && chessboard[tempIndex].Color == "white")
                        indices.push(tempIndex);
                }
                
                if (currentIndex % 8 < 7)
                {
                    tempIndex = currentIndex + 9;
                    if (tempIndex < 64 && chessboard[tempIndex] != null && chessboard[tempIndex].Color == "white")
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
		ProgressIncrement: .04,
        UpdateProgress: function() {
            that.Progress = that.Progress + this.ProgressIncrement;
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
        TestChessBoard: [],
        WhitePieces: [],
        BlackPieces: [],
        NextTurn: "white",
        FrameCount: 0,
        Transition: null,
        GetChessPieceLocation: function (chessBoard, chessPiece) {
            for (var i = 0; i < 64; i++)
            {
                let currentPiece = chessBoard[i];
                if (currentPiece != null && currentPiece.Id == chessPiece.Id)
                    return i;
            }
            return -1;
        },
        GetAvailableMoves: function(chessBoard, pieces, color) {
            var count = pieces.length;
            var availablePieces = [];
            var availableMoves = [];
            for (var i = 0; i < count; i++)
            {
                let thePiece = pieces[i];
                let location = that.GetChessPieceLocation(chessBoard, thePiece);
                if (thePiece != null && location > -1)
                {
					var potentialMoves = null;
                    var moves = null;
                    if (thePiece.Kind == "pawn")
					{
                        moves = PawnMoves();
						potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
					}
                    else if (thePiece.Kind == "rook")
					{
                        moves = RookMoves();
						potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
					}
                    else if (thePiece.Kind == "bishop")
					{
                        moves = BishopMoves();
						potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
					}
                    else if (thePiece.Kind == "knight")
					{
                        moves = KnightMoves();
						potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
					}
                    else if (thePiece.Kind == "queen")
                    {
                        moves = BishopMoves();
						potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
						
                        let rookMoves = RookMoves();
						let potentialRookMoves = rookMoves.GetPotentialMoves(chessBoard, location, color);
                        for (var j = 0; j < potentialRookMoves.length; ++j)
						{
                            potentialMoves.push(potentialRookMoves[j]);
						}
                    }
                    else if (thePiece.Kind == "king") {
                        moves = KingMoves();
						potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
                    }
                    
                    if (moves == null)
                        continue;
                    
                    //var potentialMoves = moves.GetPotentialMoves(chessBoard, location, color);
                    if (potentialMoves.length > 0)
                    {
                        availableMoves.push(potentialMoves);
                        availablePieces.push(thePiece);
                    }
                }
            }
            var result = [availablePieces, availableMoves];
            return result;
            
        },
        initialize: function() {
            var newImage = new Image();
            newImage.src = "randomchess/chessboard.png";
            newImage.addEventListener("load", function() {
                that.ChessboardImage = newImage;
                that.Graphics.needsRedraw = true;
            });
            
            that.BlackPieces.push(that.ChessBoard[0] = ChessPiece("black", "rook", '\u265c', 6, 0));
            that.BlackPieces.push(that.ChessBoard[1] = ChessPiece("black", "knight", '\u265e', 5, 1));
            that.BlackPieces.push(that.ChessBoard[2] = ChessPiece("black", "bishop", '\u265d', 5, 2));
            that.BlackPieces.push(that.ChessBoard[3] = ChessPiece("black", "queen", '\u265b', 8, 3));
            that.BlackPieces.push(that.ChessBoard[4] = ChessPiece("black", "king", '\u265a', 20, 4));
            that.BlackPieces.push(that.ChessBoard[5] = ChessPiece("black", "bishop", '\u265d', 5, 5));
            that.BlackPieces.push(that.ChessBoard[6] = ChessPiece("black", "knight", '\u265e', 5, 6));
            that.BlackPieces.push(that.ChessBoard[7] = ChessPiece("black", "rook", '\u265c', 6, 7));
            that.BlackPieces.push(that.ChessBoard[8] = ChessPiece("black", "pawn", '\u265f', 1, 8));
            that.BlackPieces.push(that.ChessBoard[9] = ChessPiece("black", "pawn", '\u265f', 1, 9));
            that.BlackPieces.push(that.ChessBoard[10] = ChessPiece("black", "pawn", '\u265f', 1, 10));
            that.BlackPieces.push(that.ChessBoard[11] = ChessPiece("black", "pawn", '\u265f', 1, 11));
            that.BlackPieces.push(that.ChessBoard[12] = ChessPiece("black", "pawn", '\u265f', 1, 12));
            that.BlackPieces.push(that.ChessBoard[13] = ChessPiece("black", "pawn", '\u265f', 1, 13));
            that.BlackPieces.push(that.ChessBoard[14] = ChessPiece("black", "pawn", '\u265f', 1, 14));
            that.BlackPieces.push(that.ChessBoard[15] = ChessPiece("black", "pawn", '\u265f', 1, 15));
            
            that.WhitePieces.push(that.ChessBoard[48] = ChessPiece("white", "pawn", '\u2659', 1, 48));
            that.WhitePieces.push(that.ChessBoard[49] = ChessPiece("white", "pawn", '\u2659', 1, 49));
            that.WhitePieces.push(that.ChessBoard[50] = ChessPiece("white", "pawn", '\u2659', 1, 50));
            that.WhitePieces.push(that.ChessBoard[51] = ChessPiece("white", "pawn", '\u2659', 1, 51));
            that.WhitePieces.push(that.ChessBoard[52] = ChessPiece("white", "pawn", '\u2659', 1, 52));
            that.WhitePieces.push(that.ChessBoard[53] = ChessPiece("white", "pawn", '\u2659', 1, 53));
            that.WhitePieces.push(that.ChessBoard[54] = ChessPiece("white", "pawn", '\u2659', 1, 54));
            that.WhitePieces.push(that.ChessBoard[55] = ChessPiece("white", "pawn", '\u2659', 1, 55));
            that.WhitePieces.push(that.ChessBoard[56] = ChessPiece("white", "rook", '\u2656', 1, 56));
            that.WhitePieces.push(that.ChessBoard[57] = ChessPiece("white", "knight", '\u2658', 5, 57));
            that.WhitePieces.push(that.ChessBoard[58] = ChessPiece("white", "bishop", '\u2657', 5, 58));
            that.WhitePieces.push(that.ChessBoard[59] = ChessPiece("white", "queen", '\u2655', 8, 59));
            that.WhitePieces.push(that.ChessBoard[60] = ChessPiece("white", "king", '\u2654', 20, 60));
            that.WhitePieces.push(that.ChessBoard[61] = ChessPiece("white", "bishop", '\u2657', 5, 61));
            that.WhitePieces.push(that.ChessBoard[62] = ChessPiece("white", "knight", '\u2658', 5, 62));
            that.WhitePieces.push(that.ChessBoard[63] = ChessPiece("white", "rook", '\u2656', 6, 63));
            
        },
        draw: function() {
			
			let chessPieceX = 100;
			let chessPieceY = 152;
			let fontSize = 45;
			let transitionFontSize = 45;
            graphics.view.clearScreen();
            if (that.ChessboardImage != null)
            {
                that.Graphics.context.drawImage(that.ChessboardImage, 100, 100, 500,500);
            }
            that.TextDrawing.drawHeader5Text(that.Graphics.context, "Random Chess", 100, 50);
            
            if (that.Transition != null && that.Transition.Progress > (1 + that.Transition.ProgressIncrement))
            {
                that.ChessBoard[that.Transition.OldPosition] = null;
                that.ChessBoard[that.Transition.NewPosition] = that.Transition.ChessPiece;
                that.Transition = null;
            }
            
            for (var i = 0; i < 64; ++i)
            {
                let x = chessPieceX + (i % 8) * squareLength;
                let y = chessPieceY + Math.floor(i / 8) * squareLength;
                let chessPiece = that.ChessBoard[i];
                if (chessPiece == null)
                    continue;
                
                if (that.Transition != null) {
                    if (that.Transition.OldPosition == i)
                        continue;
                }
                
                let color = "black";
                if (chessPiece.Color == "white")
                    color = "white";
                that.TextDrawing.drawOutlinedText(
                    that.Graphics.context, 
                    chessPiece.Symbol, 
                    x, 
                    y,
                    color,
                    color,
                    fontSize,
                    'Arial'
                );
            }
            
            if (that.Transition != null) {
                let initialX = chessPieceX + (that.Transition.OldPosition % 8) * squareLength;
                let initialY = chessPieceY + Math.floor(that.Transition.OldPosition / 8) * squareLength;
                let finalX = chessPieceX + (that.Transition.NewPosition % 8) * squareLength;
                let finalY = chessPieceY + Math.floor(that.Transition.NewPosition / 8) * squareLength;
                
                let diffX = finalX - initialX;
                let diffY = finalY - initialY;
                
                let currentX = initialX + that.Transition.Progress * diffX;
                let currentY = initialY + that.Transition.Progress * diffY;
                
                let color = "black";
                if (that.Transition.ChessPiece.Color == "white")
                    color = "white";
                that.TextDrawing.drawOutlinedText(
                    that.Graphics.context, 
                    that.Transition.ChessPiece.Symbol, 
                    currentX, 
                    currentY,
                    color,
                    color,
                    transitionFontSize,
                    'Arial'
                );
                
                that.Transition.UpdateProgress();
            }
        },
        update: function() {
            if (that.Transition != null)
                return true;
            
            that.FrameCount = that.FrameCount + 1;
            if (that.FrameCount < 1)
            {
                return true;
            }
			
			// Pause for a second
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
              if ((new Date().getTime() - start) > 1000) {
                break;
              }
            }  
			
            that.FrameCount = 0;
			
			var available = null;
			var availablePieces = null;
			var availableMoves = null;
			var pieces = null;
			
			// BEGIN check for check mate.  Exit on check mate.
			var checkColor = null;
			if (that.NextTurn == "white")
			{
				checkColor = "black";
                pieces = that.BlackPieces;
			}
			else
			{
				checkColor = "white";
                pieces = that.WhitePieces;
			}
			
            available = that.GetAvailableMoves(that.ChessBoard, pieces, checkColor);
            availablePieces = available[0];
            availableMoves = available[1];
			
			for (var m = 0; m < availablePieces.length; m++) {
				for (var n = 0; n < availableMoves[m].length; n++) {
					let attacker = availablePieces[m];
					let target = that.ChessBoard[(availableMoves[m])[n]];
					if (target != null && target.Color != attacker.Color) {
						if (target.Kind == "king")
						{
							that.NextTurn = "none";
							return false;
						}
					}
				}
			}
			// END check for check mate
			
			
			
            pieces = null;
            var enemyPieces = null;
            if (that.NextTurn == "white") {
                pieces = that.WhitePieces;
                enemyPieces = that.BlackPieces;
            } else if (that.NextTurn == "black") {
                pieces = that.BlackPieces;
                enemyPieces = that.WhitePieces;
            } else
            {
                that.FrameCount = 40;
                return false;
            }
			
            available = that.GetAvailableMoves(that.ChessBoard, pieces, that.NextTurn);
            availablePieces = available[0];
            availableMoves = available[1];
            
            var theMove = -1;

            var tries = 0;
            var maxTries = 20;
            var chessPiece = null;
            while (tries < maxTries) {
                var availableCount = availablePieces.length;
                if (availableCount < 1)
                    return false;
                
                var chessPieceIndex = -1;
                var chessPieceMoveIndex = -1;
                var targetValue = -1;
                
                // Find highest value capture move.  If there are no capture moves, default to random
                // Do this randomly
                var choice = Math.random();
                if (choice >= .4)
                {
                    for (var m = 0; m < availablePieces.length; m++) {
                        for (var n = 0; n < availableMoves[m].length; n++) {
                            let attacker = availablePieces[m];
                            let target = that.ChessBoard[(availableMoves[m])[n]];
                            if (target != null && target.Color != attacker.Color) {
                                if (target.Value > targetValue)
                                {
                                    chessPieceIndex = m;
                                    chessPieceMoveIndex = n;
                                    targetValue = target.Value;
                                }
                            }
                        }
                    }
                }
                
                var index = Math.floor(Math.random() * 10000) % availableCount;
                
                if (chessPieceIndex >= 0)
                {
                    index = chessPieceIndex;
                }
                chessPiece = availablePieces[index];
                
                var moves = availableMoves[index];
                if (moves.length > 0)
                {
                    var moveIndex = Math.floor(Math.random() * 10000) % moves.length;
                    
                    if (chessPieceMoveIndex >= 0)
                        moveIndex = chessPieceMoveIndex;
                    
                    
                    theMove = moves[moveIndex];
                    for (let q = 0; q < that.ChessBoard.length; q++)
                    {
                        that.TestChessBoard[q] = that.ChessBoard[q];
                    }
                    
                    let oldIndex = that.GetChessPieceLocation(that.TestChessBoard, chessPiece);
                    
                    that.TestChessBoard[oldIndex] = null;
                    that.TestChessBoard[theMove] = chessPiece;
                    let enemyColor = "white";
                    if (that.NextTurn == "white")
                        enemyColor = "black";
                    let availableEnemy = that.GetAvailableMoves(that.TestChessBoard, enemyPieces, enemyColor);
                    let enemyMoves = availableEnemy[1];
                    var allEnemyMoves = [];
                    for (let e = 0; e < enemyMoves.length; e++)
                    {
                        for (let f = 0; f < enemyMoves[e].length; f++)
                        {
                            if (allEnemyMoves.indexOf(enemyMoves[e][f]) < 0)
                                allEnemyMoves.push((enemyMoves[e])[f]);
                        }
                    }
                    if (allEnemyMoves.indexOf(theMove) < 0) {
                        tries = maxTries
                    }
                }
                tries++;
            }
            if (theMove > -1) {
                var oldIndex = that.GetChessPieceLocation(that.ChessBoard, chessPiece);
                
                var currentPiece = that.ChessBoard[theMove];
                
                if (currentPiece != null)
                {
                    if (currentPiece.Kind == "king")
                    {
                        that.NextTurn = "none";
                        return false;
                    }
                }
                
                that.Transition = PieceTransition(chessPiece, oldIndex, theMove);
                if (that.NextTurn == "white")
                    that.NextTurn = "black";
                else
                    that.NextTurn = "white";
                
                if (chessPiece.Kind == "pawn") {
                    if ((chessPiece.Color == "white" && Math.floor(theMove / 8) == 0)
                        || (chessPiece.Color == "black" && Math.floor(theMove / 8) == 7)) {
               
                            chessPiece.Kind = "queen";
                            chessPiece.Symbol = "Q";
                            chessPiece.Value = 8;                            
                        }
                }
            } else {
                return false;
            }
            return true;
        },
        reset: function() {
            //setTimeout(()=>{
            //    SceneController = RandomChess(Graphics, TextDrawing);
            //    SceneController.initialize();
            //
            //}, 4000);
            return true;
        }
    }
    return that;
}
