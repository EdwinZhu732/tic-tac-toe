const player = (name, symbol) => {
    return {name, symbol};
};

const gameBoard = (() =>{
    let myBoard = [];
    let squares = document.querySelectorAll(".square");

    for (let i = 0; i < 9; i++){
        myBoard.push("");
    }

    function clearBoard() {
        for (i = 0; i < 9; i++) {
            if (myBoard[i] !== ""){
                squares[i].textContent = "";
                squares[i].classList.remove(myBoard[i]);
                myBoard[i] = "";
            }
        }
    };

    function addSymbol(index, symbol){
        if (myBoard[index] === ""){
            myBoard[index] = symbol;
            squares[index].classList.add(symbol);
            squares[index].textContent = symbol;
        }
    }

    function getSymbol(index){
        return myBoard[index];
    }

    return {clearBoard, addSymbol, getSymbol};
})();

const game = (() =>{
    let player1 = player('X', 'X');
    let player2 = player('O', 'O');
    let currentPlayer = player1;
    let gameFinished = false;
    let spacesRemaining = 9;
    
    let squares = document.querySelectorAll(".square");
    let restart = document.querySelector(".restart");
    let turn = document.querySelector(".turn");
    turn.textContent = `${currentPlayer.name}'s Turn`;
    let myForm = document.querySelector("#form");

    squares.forEach(ele => {
        ele.addEventListener("click", () => {
            if (ele.textContent === "" && !gameFinished){
                gameBoard.addSymbol(ele.dataset.index, currentPlayer.symbol);
                spacesRemaining--;
                checkWinner(currentPlayer);
            }
        });
    });

    function checkWinner(player){
        if ((gameBoard.getSymbol(0) == player.symbol && gameBoard.getSymbol(1) == player.symbol && gameBoard.getSymbol(2) == player.symbol) ||
            (gameBoard.getSymbol(3) == player.symbol && gameBoard.getSymbol(4) == player.symbol && gameBoard.getSymbol(5) == player.symbol) ||
            (gameBoard.getSymbol(6) == player.symbol && gameBoard.getSymbol(7) == player.symbol && gameBoard.getSymbol(8) == player.symbol) ||
            (gameBoard.getSymbol(0) == player.symbol && gameBoard.getSymbol(3) == player.symbol && gameBoard.getSymbol(6) == player.symbol) ||
            (gameBoard.getSymbol(1) == player.symbol && gameBoard.getSymbol(4) == player.symbol && gameBoard.getSymbol(7) == player.symbol) ||
            (gameBoard.getSymbol(2) == player.symbol && gameBoard.getSymbol(5) == player.symbol && gameBoard.getSymbol(8) == player.symbol) ||
            (gameBoard.getSymbol(2) == player.symbol && gameBoard.getSymbol(4) == player.symbol && gameBoard.getSymbol(6) == player.symbol) ||
            (gameBoard.getSymbol(0) == player.symbol && gameBoard.getSymbol(4) == player.symbol && gameBoard.getSymbol(8) == player.symbol))
        {
            turn.textContent = `${currentPlayer.name} has won!`;
            gameFinished = true;
        }
        else if (spacesRemaining === 0){
            turn.textContent = `It's a tie!`;
            gameFinished = true;
        }
        else{
            if (currentPlayer == player1){
                currentPlayer = player2;
                turn.textContent = `${currentPlayer.name}'s Turn`;
            }
            else{
                currentPlayer = player1;
                turn.textContent = `${currentPlayer.name}'s Turn`;
            }
        }
    }

    restart.addEventListener("click", () =>{
        gameBoard.clearBoard();
        gameFinished = false;
        currentPlayer = player1;
        turn.textContent = `${currentPlayer.name}'s Turn`;
        spacesRemaining = 9;
    })

    myForm.addEventListener("submit", getNames, false);

    function getNames(event){
        if (event.type === "submit"){
            player1.name = event.target.p1.value;
            player2.name = event.target.p2.value;
            event.target.p1.value = "";
            event.target.p2.value = "";
        }
        event.preventDefault();
        gameBoard.clearBoard();
        gameFinished = false;
        currentPlayer = player1;
        turn.textContent = `${currentPlayer.name}'s Turn`;
        spacesRemaining = 9;
    }
    return {};
})();

