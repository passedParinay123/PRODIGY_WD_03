let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let isAIMode = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const twoPlayerModeButton = document.getElementById('twoPlayerMode');
const aiModeButton = document.getElementById('aiMode');

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} Wins!`;
            updateScore();
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            message.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s Turn`;
            if (isAIMode && currentPlayer === 'O' && gameActive) {
                setTimeout(makeAIMove, 500);
            }
        }
    }
}

function makeAIMove() {
    const availableCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);
    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        if (checkWin()) {
            message.textContent = `Player O Wins!`;
            updateScore();
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            message.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = 'X';
            message.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s Turn`;
    if (isAIMode && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function setTwoPlayerMode() {
    isAIMode = false;
    twoPlayerModeButton.classList.add('active');
    aiModeButton.classList.remove('active');
    resetGame();
}

function setAIMode() {
    isAIMode = true;
    twoPlayerModeButton.classList.remove('active');
    aiModeButton.classList.add('active');
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
twoPlayerModeButton.addEventListener('click', setTwoPlayerMode);
aiModeButton.addEventListener('click', setAIMode);