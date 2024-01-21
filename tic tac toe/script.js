let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;
    checkWinner();
    switchPlayer();

    if (!gameOver && currentPlayer === 'O') {
      setTimeout(makeComputerMove, 500);
    }
  }
}

function switchPlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      displayResult(`${currentPlayer} wins!`);
      return;
    }
  }

  if (board.every(cell => cell !== '')) {
    displayResult("It's a draw!");
  }
}

function displayResult(message, className) {
  gameOver = true;
  const resultElement = document.getElementById('result');
  resultElement.innerText = message;
  resultElement.className = className;
}

function makeComputerMove() {
  const emptyCells = board.reduce((acc, val, index) => {
    if (val === '') acc.push(index);
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    const bestMove = minimax(board, currentPlayer).index;
    makeMove(bestMove);
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const message = (currentPlayer === 'X') ? "Congratulations, You have won the game!" : "You lost the match.";
      const className = (currentPlayer === 'X') ? 'win' : 'lose';
      displayResult(message, className);
      return;
    }
  }

  if (board.every(cell => cell !== '')) {
    displayResult("Match Draw", 'result');
  }
}

function minimax(board, player) {
  const availableMoves = board.reduce((acc, val, index) => {
    if (val === '') acc.push(index);
    return acc;
  }, []);

  if (checkWin(board, 'X')) {
    return { score: -1 };
  } else if (checkWin(board, 'O')) {
    return { score: 1 };
  } else if (availableMoves.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = player;

    const result = minimax(newBoard, (player === 'X') ? 'O' : 'X');
    const score = result.score;

    moves.push({ index: move, score });
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (const move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  } else {
    let bestScore = Infinity;
    for (const move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  }

  return bestMove;
}

function checkWin(board, player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}
