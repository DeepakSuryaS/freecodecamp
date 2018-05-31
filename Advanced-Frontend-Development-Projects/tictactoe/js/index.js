var origBoard;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
  //set the endgame element to none again after replay is clicked
  document.querySelector('.endgame').style.display = "none";
  
  //look for Array.from() method on MDN
  origBoard = Array.from(Array(9).keys());
  
  //before starting the game remove all the x and o from the board
  for(var i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    
    //since we will highlight the boxes after victory, we will have to remove that highlighting so that we can play the game again
    cells[i].style.removeProperty('background-color');
    
    //call the turnClick function
    cells[i].addEventListener('click', turnClick, false);
  }
}

//pass in the id of the cell that is clicked to call the turn function
function turnClick(square) {
  if(typeof origBoard[square.target.id] == 'number') {
    turn(square.target.id, huPlayer);
    if(!checkTie()) turn(bestSpot(), aiPlayer);
  }
}

//turn function
/*we could've directly made the turn func instead of calling it through the turnClick but it would then be impossible to distinguish between the AI Player and Human Player. only the human player will click*/
function turn(squareId, player) {
  //now, in the origBoard array we record which cell was clicked by the respective player
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  
  //determine the winner
  let gameWon = checkWin(origBoard, player);
  if(gameWon) gameOver(gameWon);
}
 
function checkWin(board, player) {
  let plays = board.reduce((acc, ele, index) =>
                          (ele === player) ? acc.concat(index) : acc, []);
  let gameWon = null;
  //this for...of loop iterates through all the arrays in the winCombos and check if the player has played according to any of the winCombos
  //below mentioned index is the index of the arrays contained in the winCombos array and win represents the combos
  for(let [index, win] of winCombos.entries()) {
    if(win.every(elemOfWin => plays.indexOf(elemOfWin) > -1)){
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for(let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "rgba(0, 250, 0, 0.8)" : "rgba(0, 0, 250, 0.6)";
    }
  for(var i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player == huPlayer ? "Hurray, You Won!" : "Uh oh! You lost.")
}

function declareWinner(who) {
  document.querySelector('.endgame').style.display = 'block';
  document.querySelector('.endgame .text').innerText = who;
}

function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');  
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if(emptySquares().length == 0) {
    for(var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'red';
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Its a tie!");
    return true;
  }
  return false;
}


//here comes the minimax algorithm 
function minimax(newBoard, player) {
  var availSpots = emptySquares();
  //check if someone has won
  if(checkWin(newBoard, huPlayer)) {
    return {score: -10};
  } else if(checkWin(newBoard, aiPlayer)) {
    return {score: 10};
  } else if(availSpots.length === 0) {
    return {score: 0};
  }
  var moves = [];
  for(var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    
    if(player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else if(player == huPlayer) {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }
    
    newBoard[availSpots[i]] = move.index;
    
    moves.push(move);
  }
  
  var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}