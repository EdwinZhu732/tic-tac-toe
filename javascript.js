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
    let player1 = player('Player X', 'X');
    let player2 = player('Player O', 'O');
    let currentPlayer = player1;
    let gameFinished = false;
    let spacesRemaining = 9;
    
    let squares = document.querySelectorAll(".square");
    let restart = document.querySelector(".restart");
    let turn = document.querySelector(".turn");

    squares.forEach(ele => {
        ele.addEventListener("click", () => {
            if (ele.textContent === ""){
                gameBoard.addSymbol(ele.dataset.index, currentPlayer.symbol);
                if (currentPlayer == player1){
                    currentPlayer = player2;
                    turn.textContent = "Player O's Turn";
                }
                else{
                    currentPlayer = player1;
                    turn.textContent = "Player X's Turn"
                }
            }
        });
    });

    restart.addEventListener("click", () =>{
        gameBoard.clearBoard();
        gameFinished = false;
        currentPlayer = player1;
        turn.textContent = "Player X's Turn"
    })

    return {};
})();

