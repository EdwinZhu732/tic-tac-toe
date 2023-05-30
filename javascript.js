const player = (name, symbol) => {
    return {name, symbol};
};

const gameBoard = (() =>{
    let myBoard = [];
    for (let i = 0; i < 9; i++){
        myBoard.push("");
    }
    let squares = document.querySelectorAll(".square");
    squares.forEach(ele => {
        ele.addEventListener("click", () => {
            ele.textContent = "\u00D7";
            ele.classList.add("cross");
        });
    });
    return {myBoard};
    
})();

const displayController = (() =>{
    let player1 = player('player1', 'cross');
    let player2 = player('player2', 'circle');
    let currentPlayer = player1;
    return {};
})();

