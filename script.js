"use strict";
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

const GameFunctions = (function () {
        // initialize players
    function initializePlayers(){
        const nameX = prompt("Your name");
        const nameO = prompt("Who's against you?");
        const playerX = new Player(nameX, true);
        const playerO = new Player(nameO, false);
        const players = [playerX, playerO];
        return players
        }

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
    function playRound(players){
            let endRound = false;
            let playerTurn = 0;
            while(endRound === false){  
                const currentPlayer = players[playerTurn];
                const row = prompt("row");
                const col = prompt("col");
                currentPlayer.makeMove(row, col);
                let result = checkResult(currentPlayer);
                console.log({result});
                if (result !== false){ //if result is present, quit loop
                    break;
                }
                playerTurn = (playerTurn + 1) % players.length;
            }
            let scoreX = players[0].score;
            let scoreO = players[1].score;
            alert("Round ended")
            console.log({scoreX, scoreO})
        }
        

 return{initializePlayers, playRound}
})();

const displayController = (function () {

})();
const Game = (function(){
   const players = GameFunctions.initializePlayers();
   let wantsToPlay = true;
    while(wantsToPlay){
    GameFunctions.playRound(players)
    Gameboard.clearBoard();
    }
})();





