let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

// Winning combinations for Tic-Tac-Toe
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

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    // Check if the game is active and if the cell is already filled
    if (board[cellIndex] !== "" || !gameActive) {
        return;
    }

    // Update the game state and display
    updateCell(cell, cellIndex);
    checkForWinner();
}

// Update cell with the current player's marker
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check if there's a winner or the game is a draw
function checkForWinner() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    const roundDraw = !board.includes("");
    if (roundDraw) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = `Player X's turn`;
    cells.forEach(cell => (cell.textContent = ""));
}

// Event listeners for each cell and the reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset').addEventListener('click', resetGame);
