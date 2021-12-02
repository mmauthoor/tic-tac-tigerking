


// Need win state and lose state
// Need restart ability

// Important for variables to have semantic names, code to be clear etc


// Nice to haves: 
// after 1 game, would go on to TK2 - Jeff Lowe v Tim Stark
// start-up screen: Welcome to the jungle: Tic Tac Tiger King. Click to start
// Then show the grid and diff sides
// sound effects
// 

// DOM objects
let gridCells = document.querySelectorAll(".grid-cell");
let gameStatusDiv = document.querySelector(".game-status-div");
let restartBtn = document.querySelector(".restart-btn");

// Functions that I'll need
// toggle between players - DONE
// Check if token already present in cell - DONE
// Check if there are 3 or more of a player's tokens on the board - DONE
// if so, are they in a single row/column/diagonal? - DONE
// Check if all the cells on the board are filled - DONE



// Start game player status
let currentPlayer = "Player 1";

function handlePlayerChoice(event) {
    let playerCellChoice = event.target;
    let playerCellClass = "";
    if (isCellVacant(playerCellChoice)) {
        
        if (currentPlayer === "Player 1") {
            playerCellChoice.classList.add("joe-cell", "occupied");
            playerCellClass = ".joe-cell";
        } else if (currentPlayer === "Player 2") {
            playerCellChoice.classList.add("carole-cell", "occupied");
            playerCellClass = ".carole-cell";
        }
        if (checkPlayerCellNumber(playerCellClass)) {
            if (hasPlayerWon(playerCellClass, playerCellChoice)) {
                declareWinner(playerCellClass);
                gameOver();
            } else if (isBoardFull()) {
                console.log("board is full - it's a tie");
                gameOver();
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
    if (cell.classList.contains("occupied")) {
        return false;
    } else {
        return true;
    }
}

function checkPlayerCellNumber(playerCells) {
    let playerTotalCells = document.querySelectorAll(playerCells);
    if (playerTotalCells.length >= 3) {
        return true;
    } else {
        return false;
    }
}

function checkRowColWins(playerCellChoice, playerTotalCells) {
    let playerCellChoiceRow = playerCellChoice.dataset.row;
    let playerCellChoiceCol = playerCellChoice.dataset.col;

    let playerRowCounter = 0;
    let playerColCounter = 0;
    // Could maybe swap out for a for each function??
    for (let i = 0; i < playerTotalCells.length; i++) {
        let currentCell = playerTotalCells[i];
        // console.log(currentCell);
        if (currentCell.dataset.row === playerCellChoiceRow) {
            playerRowCounter++;
            // console.log("The current row Counter is " + playerRowCounter)
        }
        if (currentCell.dataset.col === playerCellChoiceCol) {
            playerColCounter++;
            // console.log("The current col counter is " + playerColCounter);
            // console.log(playerTotalCells);
        }
    }
    if (playerRowCounter === 3 || playerColCounter === 3) {
        return true;
    }
}

function checkDiagonalWins(playerTotalCells) {
    let cellCoordinateArray = [];
    for (let i = 0; i < playerTotalCells.length; i++) {
        let currentCell = playerTotalCells[i];
        let cellCoordinates = currentCell.dataset.row + currentCell.dataset.col;
        cellCoordinateArray.push(cellCoordinates); 
        // console.log(cellCoordinateArray);
        }
        if (cellCoordinateArray.includes("11") && cellCoordinateArray.includes("22") && cellCoordinateArray.includes("33") || cellCoordinateArray.includes("13") && cellCoordinateArray.includes("22") && cellCoordinateArray.includes("31")) {
            return true;
        }
}

function hasPlayerWon(playerCellClass, playerCellChoice) {
    let playerTotalCells = document.querySelectorAll(playerCellClass); 
    if (checkRowColWins(playerCellChoice, playerTotalCells)) {
        return true;
    } else if (checkDiagonalWins(playerTotalCells)) {
        return true;
    } 
}

function declareWinner(winner) {
    if (winner === ".joe-cell") {
        gameStatusDiv.textContent = "joe wins!!";
    // Special joe message here
    } else if (winner === ".carole-cell") {
        // if carole wins
    gameStatusDiv.textContent = "carole wins!!";
    // Great job, you cool cats and kittens! vs I'm never going to financially recover from this
    }   
}

function isBoardFull() {
    let occupiedCells = document.querySelectorAll(".occupied");
    return occupiedCells.length === gridCells.length;
}

function gameOver() {
    gridCells.forEach(cell => cell.classList.add("greyout-cell"));
    alert("game over!")

    // add overlay to all grid cells
    // remove cliability for all cells but reactivate 
}

function handleRestart() {
    gridCells.forEach(cell => cell.classList.remove("joe-cell", "carole-cell", "occupied"));
    // also remove greyed out sheet over them
    currentPlayer = "Player 1";
    // also add clickability back
}


// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerChoice));
restartBtn.addEventListener("click", handleRestart);
// Need a handler to click on restart button, start button

