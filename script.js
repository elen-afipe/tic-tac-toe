"use strict";
const displayInterface = {};
const Gameboard = (function(){
    let board = [[false, false, false],
            [false, false, false],
            [false, false, false]];
            const winCells = {
                one: [
                    {row: 0, col: 0},
                    {row: 1, col: 0},
                    {row: 2, col: 0}
                ], 
                two: [
                    {row: 0, col: 1},
                    {row: 1, col: 1},
                    {row: 2, col: 1}
                ], 
                three: [
                    {row: 0, col: 2},
                    {row: 1, col: 2},
                    {row: 2, col: 2}
                ], 
                four: [
                    {row: 0, col: 0},
                    {row: 0, col: 1},
                    {row: 0, col: 2}
                ], 
                five: [
                    {row: 1, col: 0},
                    {row: 1, col: 1},
                    {row: 1, col: 2}
                ], 
                six: [
                    {row: 2, col: 0},
                    {row: 2, col: 1},
                    {row: 2, col: 2}
                ], 
                seven: [
                    {row: 0, col: 0},
                    {row: 1, col: 1},
                    {row: 2, col: 2}
                ], 
                eight: [
                    {row: 0, col: 2},
                    {row: 1, col: 1},
                    {row: 2, col: 0}
                ] 
            };

    function clearBoard(){
        board = [[false, false, false],
            [false, false, false],
            [false, false, false]];
        }

    function boardToBinary(mark){
        const boardBinary = structuredClone(board);
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++){
                if (boardBinary[row][col] === mark){
                    boardBinary[row][col] = true;
                } else{boardBinary[row][col] = false}
            }
        }
        return boardBinary;
    }

    const checkBoardFilled = function(){
        const boardContent = [].concat(...board);
        const boardFilled = boardContent.includes(false) ? false : true;
        return boardFilled;
    }

    const setMark = function(row, col, mark){
        if(board[row][col] === false){
            board[row][col] = mark;
        } else {
            return
        }
    };

    const getBoard = function(){
         return board}
    const getWinCells = function(){return winCells}
    return {getBoard, getWinCells, checkBoardFilled, boardToBinary, setMark, clearBoard};
})();




const Players = (function () {
    let players = null;
    function Player(name, first){
        this.name = name;
        this.marker = (first)?"X":"O";
        this.score = 0;
    }

    Player.prototype.makeMove = function (row, col){
        row = parseInt(row);
        col = parseInt(col);
        Gameboard.setMark(row, col, this.marker)
    }
    Player.prototype.incrementScore = function(){
        this.score++;
    }
    Player.prototype.getScore = function(){
        return this.score;
    }
            // initialize players
    function createPlayers(names){
        const nameX = names[0];
        const nameO = names[1];
        const playerX = new Player(nameX, true);
        const playerO = new Player(nameO, false);
        players = {
            X: playerX,
            O: playerO,
            turn: playerX 
        };
        return players;
        }

    function getPlayers (){
        return players;
    };

    function changePlayerTurn(players){
        if (players.turn === players.X){
            players.turn = players.O
        } else players.turn = players.X
    }

    function setFistTurn(players){
        players.turn = players.X
    }

return {createPlayers, getPlayers, changePlayerTurn, setFistTurn}
})();



const GameFunctions = (function () {
        // check
    function checkResult(player){
        const boardState = Gameboard.boardToBinary(player.marker);
        const winCells = Gameboard.getWinCells();
        const boardFilled = Gameboard.checkBoardFilled();
        let win = false;
        let resultText = "";
        for (const pattern in winCells) {
            const positions = winCells[pattern];
            if (positions.every(pos => boardState[pos.row][pos.col] === true)) {
                win = true;
                player.incrementScore();
                resultText = `${player.name} won!`;
            }
        }
            if (boardFilled && !win){
                resultText = "It's a draw!"
            } else if (!boardFilled && !win){
                resultText = false; 
            }
        return resultText;
    }

        // play round
    function playRound(players, move){
        displayInterface.clearDisplayStatus();
                const currentPlayer = players.turn;
                const row = move.row;
                const col = move.col;
                currentPlayer.makeMove(row, col);
                let result = checkResult(currentPlayer);
                if (result !== false){ 
                setTimeout(() => {
                    let scoreX = players.X.score;
                    let scoreO = players.O.score;
                    Players.setFistTurn(players);
                    Gameboard.clearBoard();
                    displayInterface.clearBoardContent();
                    displayInterface.updateDisplayScore(currentPlayer);
                    displayInterface.updateDisplayStatus(result);
                }, 100); 
            
                } else {
                Players.changePlayerTurn(players);
                }            
        }

 return{playRound}
})();


const displayRegistration = (function () {
    const container = document.querySelector(".container");
    const registration = displayRegistrationContent();

    function displayRegistrationContent () {
        const toast = document.createElement("div");
        toast.classList.add("warning", "hidden");
        toast.textContent = "";
        container.appendChild(toast);

        const registration = document.createElement("div");
        registration.classList.add("reg-container");
        const registrationRow1 = document.createElement("div");
        const registrationRow2 = document.createElement("div");
        registrationRow1.classList.add("reg-row");
        registrationRow2.classList.add("reg-row");

        const labelX = document.createElement("label");
        labelX.for="x-player";
        labelX.textContent="X player";
        const inputX = document.createElement("input");
        inputX.name = "x-player";
        inputX.id = "x-player";
        inputX.required=true;
        inputX.maxLength = 12;
        registrationRow1.appendChild(labelX);
        registrationRow1.appendChild(inputX);

        const labelO = document.createElement("label");
        labelO.for="o-player";
        labelO.textContent="O player";
        const inputO = document.createElement("input");
        inputO.name = "o-player";
        inputO.id = "o-player";
        inputO.required=true;
        inputO.maxLength = 12;
        registrationRow2.appendChild(labelO);
        registrationRow2.appendChild(inputO);

        registration.appendChild(registrationRow1);
        registration.appendChild(registrationRow2);

        const buttonReg = document.createElement("button");
        buttonReg.classList.add("btn", "reg-btn");
        buttonReg.textContent="Play";

        registration.appendChild(buttonReg);
        container.appendChild(registration);
        return{inputX, inputO, buttonReg}
    }
    function showToast(message = "Type players names!", duration = 2000){
        const toast = document.querySelector(".warning");
        toast.textContent = message;
        toast.classList.remove("hidden");
        setTimeout(()=> toast.classList.add("show"), 50); 
      
        setTimeout(()=>{
          toast.classList.remove("show");
          setTimeout(() => toast.classList.add("hidden"), 400); 
        }, duration);
    }

    function checkInputs(){
        if (registration.inputX.value==="" ||  registration.inputX.value===""){
        showToast();
            return false;
        } else return true;
    }

   function getNames(){
    const nameX = registration.inputX.value;
    const  nameO = registration.inputO.value;
    const names = [nameX, nameO]
    return names;
   }

    return{registration, getNames, checkInputs}
})


const displayGameContent = function () {
    const container = document.querySelector(".container");
    const gameContentContainer = document.createElement("div");
    gameContentContainer.classList="game-cont-container";
    // when function called create interface
    const players = Players.getPlayers();
    clearDisplay();
    const status = displayStatus();
    const scoreComponents = displayScore();
    const boardContainer = displayBoardContainer();
    const board = Gameboard.getBoard();
    const newGameBtn = displayNewGameButton();
    container.appendChild(gameContentContainer);
    displayBoardContent(board);



  function displayStatus () {
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    gameContentContainer.appendChild(statusContainer);
    return statusContainer;
  }
   function displayScore(){
    const players = Players.getPlayers();
    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");
    const playerX = document.createElement("div");
    playerX.classList.add("x-name");
    playerX.textContent = players.X.name;
    const scoreBox = document.createElement("div");
    scoreBox.classList ="score-box";
    const scoreX = document.createElement("div");
    scoreX.classList.add("x-score");
    scoreX.textContent = players.X.score;
    const colon = document.createElement("div");
    colon.classList.add("colon")
    colon.textContent = ":";
    const scoreO = document.createElement("div");
    scoreO.classList.add("o-score");
    scoreO.textContent = players.O.score;
    const playerO = document.createElement("div");
    playerO.classList.add("o-name");
    playerO.textContent = players.O.name;
   scoreContainer.appendChild(playerX);
   scoreBox.appendChild(scoreX);
   scoreBox.appendChild(colon);
   scoreBox.appendChild(scoreO);
   scoreContainer.appendChild(scoreBox);
   scoreContainer.appendChild(playerO);
   gameContentContainer.appendChild(scoreContainer);
   return{scoreContainer, playerX, scoreX, scoreO, playerO}
   }

    
   function displayBoardContainer (){
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");
        for (let row = 0; row <=2; row++){
            for (let col = 0; col <=2; col++){
                const cell = document.createElement("div");
                cell.dataRow = row;
                cell.dataCol = col;
                cell.classList.add(`row${row}`, `col${col}`, 'cell')
                gameContainer.appendChild(cell);
            }
        }
        gameContentContainer.appendChild(gameContainer);
    return gameContainer;
   }

   function displayBoardContent(board){
    const cells = boardContainer.querySelectorAll(".cell");
    cells.forEach((cell) => {
        const row = cell.dataRow;
        const col = cell.dataCol;
        cell.textContent = (board[row][col] === false) ? " " : board[row][col];
    })   
   }

   function displayNewGameButton (){
    const newGameBtn = document.createElement("button");
    newGameBtn.classList.add("btn", "new-game");
    newGameBtn.textContent="New Game";
    gameContentContainer.appendChild(newGameBtn);
    return newGameBtn
   }

   function clearDisplay(){
    container.innerHTML = "";
   }

   function clearBoardContent(){
    const cells = boardContainer.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.textContent = " ";
        cell.classList.remove("X", "O")
    })
   }   



function updateDisplayStatus(resultText){
    
    status.classList.remove("fade-animation"); 
    void status.offsetWidth;
    status.classList.add("fade-animation");
    status.textContent = resultText;
    }

    function clearDisplayStatus(){
        status.textContent = "";
        }

    function updateDisplayScore(currentPlayer){
        
            const playerXScore = scoreComponents.scoreX;
            const playerOScore = scoreComponents.scoreO;
            if(currentPlayer.marker === "X"){
                playerXScore.textContent = currentPlayer.score;
            } else { playerOScore.textContent = currentPlayer.score;}
        }
 
    boardContainer.addEventListener("click", 
    function(event){
        const players = Players.getPlayers();
        const currentPlayer = players.turn;
        const cell = event.target;
        const row = cell.dataRow;
        const col = cell.dataCol;
        const move = {
            row: row,
            col:col
        }
        if (cell.classList.contains("cell")){
            if(cell.textContent === " "){
                cell.textContent = currentPlayer.marker;
                cell.classList.add(currentPlayer.marker)
               GameFunctions.playRound(players, move);
            }
         }
        }
    )
   
    newGameBtn.addEventListener("click", function () {
        Gameboard.clearBoard();
        clearBoardContent();
        clearDisplay();
        const regElements = displayRegistration();
        const registration = regElements.registration;

        registration.buttonReg.addEventListener(("click"), () => {
        const validInputs = regElements.checkInputs();
        if(validInputs){
        const playersNames = regElements.getNames();
        Players.createPlayers(playersNames);
        displayGameContent();
        }
    })
    })

    displayInterface.clearBoardContent = clearBoardContent;
    displayInterface.updateDisplayScore = updateDisplayScore;
    displayInterface.updateDisplayStatus = updateDisplayStatus;
    displayInterface.clearDisplayStatus = clearDisplayStatus;
return {displayStatus, displayScore, displayBoardContainer, displayNewGameButton, clearDisplay, updateDisplayScore, updateDisplayStatus, clearBoardContent}
}

const Game = (function(){
    const regElements = displayRegistration();
    const registration = regElements.registration;
   registration.buttonReg.addEventListener(("click"), () => {
    const validInputs = regElements.checkInputs();
        if(validInputs){
        const playersNames = regElements.getNames();
        Players.createPlayers(playersNames);
        displayGameContent();
        }
    })
})();

// write input check with limited max length, 
// *** changeTurns;





