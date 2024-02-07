const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    //Will populate the board array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("x");
        }
    }
    
    //Method for getting entire board for our UI
    const getBoard = () => board;


    const placeMark = (row, column, player) => {

    }

    return { board };
})();

//A function that will change the value of the current space in the board
function setSpaceValue() {
    let value = "";

    const addMark = (playerMark) => {
        value = playerMark;
    }

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}

const createPlayer = (name, symbol) => {
    return { 
        name, 
        symbol 
    };
};
const playerOne = createPlayer('player one', 'X');
const playerTwo = createPlayer('player two', 'O');


function GameController() {

}