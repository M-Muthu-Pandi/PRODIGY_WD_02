let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
const wStatus = document.getElementById('winning-status');
const popup = document.querySelector('.popup');
const closeBtn = document.getElementById('close');
const resetButton = document.getElementById('resetBtn');

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

const currentPlayerTurn = () => `It's <span>${currentPlayer}</span>'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const handleCellPlayed = (clickedCell, clickedCellIndex)=> {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

const handlePlayerChange = ()=> {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const handleResultValidation = ()=> {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        popup.style.display = "block";
        wStatus.textContent = `Player "${currentPlayer}" has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        popup.style.display = "block";
        wStatus.textContent = `Game ended in a draw!`;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

const handleCellClick = (clickedCellEvent)=> {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (gameActive) {
        setTimeout(handleAIMove, 500);
    }
}

const handleAIMove = ()=> {
    let emptyCells = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") {
            emptyCells.push(i);
        }
    }

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const aiCell = document.querySelector(`.cell[data-index="${randomIndex}"]`);

    if (gameActive && currentPlayer === "O") {
        handleCellPlayed(aiCell, randomIndex);
        handleResultValidation();
    }
}

resetButton.addEventListener('click', ()=> {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => cell.textContent = "");
});
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});