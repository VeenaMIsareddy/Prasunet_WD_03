// Initialize variables
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Get references to HTML elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if the cell is already marked or if the game is over
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update game state
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for win
    if (checkWin()) {
        endGame(false);
    } else if (checkTie()) {
        endGame(true);
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = "Player " + currentPlayer + "'s turn";
    }
}

// Function to check for a win
function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for a tie
function checkTie() {
    return gameState.every(cell => cell !== '');
}

// Function to end the game
function endGame(isTie) {
    if (isTie) {
        statusDisplay.textContent = "It's a tie!";
    } else {
        statusDisplay.textContent = "Player " + currentPlayer + " wins!";
    }
    gameActive = false;
}

// Function to handle reset game button click
function handleResetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = "Player " + currentPlayer + "'s turn";
    cells.forEach(cell => cell.textContent = '');
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);

// Initial status display
statusDisplay.textContent = "Player " + currentPlayer + "'s turn";
