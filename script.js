"use strict";
// REWRITE CHECKWINNER TO NOT STRICT EQUAL LOGIC
const displayInterface = {};
const Gameboard = (function(){
    let board = [[false, false, false],
            [false, false, false],
            [false, false, false]];
    const winBoards = {
                one: [[true, false, false],
                    [true, false, false],
                    [true, false, false]],
                two: [[false, true, false],
                    [false, true, false],
                    [false, true, false]],
                three: [[false, false, true],
                        [false, false, true],
                        [false, false, true]],
                four: [[true, true, true],
                    [false, false, false],
                    [false, false, false]],
                five: [[false, false, false],
                    [true, true, true],
                    [false, false, false]],
                six: [[false, false, false],
                    [false, false, false],
                    [true, true, true]],
                seven: [[true, false, false],
                        [false, true, false],
                        [false, false, true]],
                eight: [[false, false, true],
                        [false, true, false],
                        [true, false, false]]
            };

    function clearBoard(){
        board = [[false, false, false],
            [false, false, false],
            [false, false, false]];
            console.log("cleared")
        }

    function boardToBinary(mark){
        const boardBinary = structuredClone(board);
        // console.log(boardBinary);
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++){
                if (boardBinary[row][col] === mark){
                    boardBinary[row][col] = true;
                } else{boardBinary[row][col] = false}
            }
        }
        // console.log(boardBinary);
        return boardBinary;
    }

    const checkBoardFilled = function(){
        const boardContent = [].concat(...board);
        // console.log(board)
        // console.log(boardContent)
        // console.log(boardContent.includes(undefined))
        const boardFilled = boardContent.includes(false) ? false : true;
        return boardFilled;
    }

    const setMark = function(row, col, mark){
        if(board[row][col] === false){
            board[row][col] = mark;
        } else {
            return
        }
        console.log(board[row][col])
    };

    const getBoard = function(){
        console.log(board);
         return board}
    const getWinBoards = function(){return winBoards}
    return {getBoard, getWinBoards, checkBoardFilled, boardToBinary, setMark, clearBoard};
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
        console.log({row, col})
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
        console.log(names)
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
        console.log(players.turn === players.X)
        if (players.turn === players.X){
            players.turn = players.O
        } else players.turn = players.X
    }

    function setFistTurn(players){
        console.log(players.X)
        players.turn = players.X
    }

return {createPlayers, getPlayers, changePlayerTurn, setFistTurn}
})();



const GameFunctions = (function () {
    // const players = Players.getPlayers();
        // check
    function checkResult(player){
        const boardState = Gameboard.boardToBinary(player.marker);
        console.log(boardState)
        const winBoards = Gameboard.getWinBoards();
        const boardFilled = Gameboard.checkBoardFilled();
        // console.log(winBoards);
        let win = false;
        let resultText = "";
        for (const winBoard in winBoards) {
            if (JSON.stringify(winBoards[winBoard]) === JSON.stringify(boardState)){
                win = true;
                player.incrementScore();
                console.log(winBoards[winBoard]);
                console.log("I'm in win if")
                resultText = `${player.name} wins`;
            }
        }
            if (boardFilled && !win){
                resultText = "It's a draw"
            } else if (!boardFilled && !win){
                resultText = false; 
            }
        return resultText;
    }

        // play round
    function playRound(players, move){
        console.log("at least i'm here") 
        displayInterface.clearDisplayStatus();
                const currentPlayer = players.turn;
                const row = move.row;
                const col = move.col;
                currentPlayer.makeMove(row, col);
                let result = checkResult(currentPlayer);
                console.log({result});
                if (result !== false){ 
                setTimeout(() => {
                    let scoreX = players.X.score;
                    let scoreO = players.O.score;
                    // alert("Round ended")
                    console.log({scoreX, scoreO})
                    Players.setFistTurn(players);
                    Gameboard.clearBoard();
                    displayInterface.clearBoardContent();
                    displayInterface.updateDisplayScore(currentPlayer);
                    displayInterface.updateDisplayStatus(result);
                }, 100); 
                // setTimeout(()=>{
                //     displayInterface.clearDisplayStatus();
                // }, 1)
                } else {
                console.log("i should change turns");
                Players.changePlayerTurn(players);
                }            
        }
        
        const playGame = function(players){
            console.log(players)
         //    let wantsToPlay = true;
         //     while(wantsToPlay){
         //     GameFunctions.playRound(players)
         //     Gameboard.clearBoard();
         //     }
         }

 return{playRound, playGame}
})();


const displayRegistration = (function () {
    const container = document.querySelector(".container");
    const registration = displayRegistrationContent();

    function displayRegistrationContent () {
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
        registrationRow1.appendChild(labelX);
        registrationRow1.appendChild(inputX);

        const labelO = document.createElement("label");
        labelO.for="o-player";
        labelO.textContent="O player";
        const inputO = document.createElement("input");
        inputO.name = "o-player";
        inputO.id = "o-player";
        inputO.required=true;
        registrationRow2.appendChild(labelO);
        registrationRow2.appendChild(inputO);

        registration.appendChild(registrationRow1);
        registration.appendChild(registrationRow2);

        const buttonReg = document.createElement("button");
        buttonReg.classList=("btn", "reg-btn");
        buttonReg.textContent="Play";

        registration.appendChild(buttonReg);
        container.appendChild(registration);
        return{inputX, inputO, buttonReg}
    }
    //    function checkInputs(){
//     let isValid = false;
//     if (registration.inputX.value!==""){
//         registration.inputX.
//     }
//     }
//    }
   function getNames(){
    const nameX = registration.inputX.value;
    const  nameO = registration.inputO.value;
    const names = [nameX, nameO]
    console.log(names)
    return names;
   }

    return{registration, getNames}
})


const displayGameContent = function () {
    const container = document.querySelector(".container");
    // when function called create interface
    const players = Players.getPlayers();
    console.log(players)
    clearDisplay();
    const status = displayStatus();
    const scoreComponents = displayScore();
    const boardContainer = displayBoardContainer();
    const board = Gameboard.getBoard();
    const newGameBtn = displayNewGameButton();
    displayBoardContent(board);
    GameFunctions.playGame(players);


  function displayStatus () {
    const statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    container.appendChild(statusContainer);
    return statusContainer;
  }
   function displayScore(){
    const players = Players.getPlayers();
    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");
    const playerX = document.createElement("div");
    playerX.classList.add("x-name");
    playerX.textContent = players.X.name;
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
   scoreContainer.appendChild(playerX)
   scoreContainer.appendChild(scoreX);
   scoreContainer.appendChild(colon);
   scoreContainer.appendChild(scoreO);
   scoreContainer.appendChild(playerO);
   container.appendChild(scoreContainer);
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
    container.appendChild(gameContainer);
    return gameContainer;
   }

   function displayBoardContent(board){
    console.log(board)
    const cells = boardContainer.querySelectorAll(".cell");
    cells.forEach((cell) => {
        console.log(cell);
        const row = cell.dataRow;
        const col = cell.dataCol;
        cell.textContent = (board[row][col] === false) ? " " : board[row][col];
    })   
   }

   function displayNewGameButton (){
    const newGameBtn = document.createElement("button");
    newGameBtn.classList.add("btn", "new-game");
    newGameBtn.textContent="New Game";
    container.appendChild(newGameBtn);
    return newGameBtn
   }

   function clearDisplay(){
    container.innerHTML = "";
   }

   function clearBoardContent(){
    const cells = boardContainer.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.textContent = " ";
    })
   }   



function updateDisplayStatus(resultText){
    console.log("Uuuupdating status")
    status.textContent = resultText;
    }

    function clearDisplayStatus(){
        status.textContent = "";
        }

    function updateDisplayScore(currentPlayer){
        
            const playerXScore = scoreComponents.scoreX;
            const playerOScore = scoreComponents.scoreO;
            // console.log(scoreComponents.scoreX)
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
               GameFunctions.playRound(players, move);
            }
         }
        }
    )
    console.log(newGameBtn)
    newGameBtn.addEventListener("click", function () {
        Gameboard.clearBoard();
        clearBoardContent();
        clearDisplay();
        const regElements = displayRegistration();
        const registration = regElements.registration;

        registration.buttonReg.addEventListener(("click"), () => {
        const playersNames = regElements.getNames();
        Players.createPlayers(playersNames);
        displayGameContent();
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
        const playersNames = regElements.getNames();
        Players.createPlayers(playersNames);
        displayGameContent();
    })
})();

// write input check with limited max length, 
// *** changeTurns;





