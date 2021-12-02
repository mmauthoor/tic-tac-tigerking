// Questions: 
// How will computer recognise when a win state has been achieved - i.e. that all noughts are in correct formation, or all crosses? 

// Need ability for computer to tell when a win state has been reached, i.e. all of one type (image, etc.) in a row/column/diagonal, OR the grid is full. 
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

// Functions that I'll need
// toggle between players - DONE
// Check if token already present in cell - DONE
// Check if there are 3 or more of a player's tokens on the board - DONE
// if so, are they in a single row/column/diagonal? 
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
            hasPlayerWon(playerCellClass, playerCellChoice);
            // want to check if the current cell shares the same row/column as others of its type
        }


        togglePlayers();
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

function hasPlayerWon(playerCellClass, playerCellChoice) {
    let playerCellChoiceRow = playerCellChoice.dataset.row;
    let playerCellChoiceCol = playerCellChoice.dataset.col;
    // console.log("The most recent cell placed was " + playerCellChoiceRow + playerCellChoiceCol );

    let playerTotalCells = document.querySelectorAll(playerCellClass);
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
        declareWinner(playerCellClass);
    } else {
        // maybe could change to a forEach? 
        for (let i = 0; i < playerTotalCells.length; i++) {
            let currentCell = playerTotalCells[i];
            let cellCoordinates = currentCell.dataset.row + currentCell.dataset.col; 
            let middleCellCoordinates = "22";

            if (cellCoordinates === middleCellCoordinates) {
                let firstDiagonalCounter = 0;
                let secondDiagonalCounter = 0;
                for (i = 0; i < playerTotalCells.length; i++) {

                }
                console.log("we have a middle square");
            }
        }
        // hard code if  cells are all in diagonal position. i.e. if in 11, 22, 33 OR 13, 22, 31
    }
}


function declareWinner(winner) {
    if (winner === ".joe-cell") {
        console.log("joe wins!!");
    // Special joe message here
    } else if (winner === ".carole-cell") {
        // if carole wins
    console.log("carole wins!!");
    // Great job, you cool cats and kittens! vs I'm never going to financially recover from this
    }   
}

function isBoardFull() {
    let occupiedCells = document.querySelectorAll(".occupied");
    console.log(occupiedCells);
    if (occupiedCells.length === gridCells.length) {
        console.log("No winner");
    }
}

function handleRestart() {
    gridCells.forEach(cell => cell.classList.remove("joe-cell", "carole-cell", "occupied"));
}


// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerChoice));
// Need a handler to click on restart button, start button

