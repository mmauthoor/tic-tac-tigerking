// DOM objects
let startGamePopup = document.querySelector(".start-game-popup");

let containerDiv = document.querySelector(".container-div");
let gridCells = document.querySelectorAll(".grid-cell");
let gameStatusDiv = document.querySelector(".game-status-div");

let startBtn = document.querySelector(".start-btn");
let restartBtns = document.querySelectorAll(".restart-btn");

let player1WinCountSpan = document.querySelector(".player1-win-count-span"); 
let player2WinCountSpan = document.querySelector(".player2-win-count-span"); 

let player1WinModal = document.querySelector(".player1-win-modal");
let player2WinModal = document.querySelector(".player2-win-modal");
let tieModal = document.querySelector(".tie-modal");


// Start game status
let currentPlayer = "Player 1";
let player1WinCounter = 0;
let player2WinCounter = 0;

function handlePlayerMove(event) {
    let chosenCell = event.target;
    let playerCellClass = "";
    if (isCellVacant(chosenCell)) {
        if (currentPlayer === "Player 1") {
            chosenCell.classList.add("player1-cell", "occupied");
            playerCellClass = ".player1-cell";
        } else if (currentPlayer === "Player 2") {
            chosenCell.classList.add("player2-cell", "occupied");
            playerCellClass = ".player2-cell";
        }
        if (hasPlayerMade3Moves(playerCellClass)) {
            if (isWin(playerCellClass)) {
                declareWinner(playerCellClass);
            } else if (isBoardFull()) {
                isTie();
            } else {
                togglePlayers();
            }
        } else {
            togglePlayers();
        }
    } else {
        gameStatusDiv.textContent = `There's a tiger in this cage already! Choose a different one, ${currentPlayer}!`;
    }
}

function togglePlayers() {
    if (currentPlayer === "Player 1") {
        currentPlayer = "Player 2";
        gameStatusDiv.textContent = "Player 2, it's your turn!";
    } else if (currentPlayer === "Player 2") {
        currentPlayer = "Player 1";
        gameStatusDiv.textContent = "Player 1, it's your turn!";
    }
}

function isCellVacant(cell) {
    return !cell.classList.contains("occupied");
}

function hasPlayerMade3Moves(playerCellClass) {
    let playerTotalCells = document.querySelectorAll(playerCellClass);
    return playerTotalCells.length >= 3;
}

function isWin(playerCellClass) {
    let playerTotalCells = document.querySelectorAll(playerCellClass); 
    let isWinConfirmed = false;
    let winCombos = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let playerCellIds = [];
    playerTotalCells.forEach(cell => {
        playerCellIds.push(Number(cell.dataset.id));
    });

    for (let i = 0; i < winCombos.length; i++) {
        let winCombo = winCombos[i];
        let playerWinCombo = [];

        winCombo.forEach(cellId => {
            if (playerCellIds.includes(cellId)) {
                playerWinCombo.push(Number(cellId));
            }
        });
        if (playerWinCombo.length === 3) {
            isWinConfirmed = true;
            playerTotalCells.forEach(cell => {
                if (playerWinCombo.includes(Number(cell.dataset.id))) {
                    cell.classList.add("winning-combo");
                }
            });
            break;
        }
    }
    return isWinConfirmed;
}

function declareWinner(winner) {
    gameStatusDiv.textContent = "We have a winner!";
    if (winner === ".player1-cell") {
        player1WinModal.style.display = "block";
        player1WinCounter++;
        player1WinCountSpan.textContent = player1WinCounter;
    } else if (winner === ".player2-cell") {
        player2WinModal.style.display = "block";
        player2WinCounter++;
        player2WinCountSpan.textContent = player2WinCounter;
    }   
}

function isBoardFull() {
    let occupiedCells = document.querySelectorAll(".occupied");
    return occupiedCells.length === gridCells.length;
}

function isTie() {
    tieModal.style.display = "block";
}

function handleStart() {
    containerDiv.classList.toggle("hide");
    startGamePopup.classList.toggle("hide");
}

function handleRestart() {
    gridCells.forEach(cell => cell.classList.remove("player1-cell", "player2-cell", "occupied", "winning-combo"));
    player1WinModal.style.display = "none";
    player2WinModal.style.display = "none";
    tieModal.style.display = "none";
    currentPlayer = "Player 1";
    gameStatusDiv.textContent = "Player 1, you go first!";
}

// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerMove));
startBtn.addEventListener("click", handleStart);
restartBtns.forEach(button => button.addEventListener("click", handleRestart));

