const createPlayer = (name, symbol) => {
    return { 
        name, 
        symbol 
    };
};
const playerOne = createPlayer('player one', 'X');
const playerTwo = createPlayer('player two', 'O');


const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    //Will populate the board array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(" ");
        }
    }
    console.log(board)
    //Method for getting entire board for our UI
    const getBoard = () => board;


    const placeMark = (row, column, playerMark) => {
        if (row < 0 || row > 2 || column < 0 || column > 2 || board[row][column] !== " ") return;
        board[row][column] = playerMark;
        console.log(board)
    };

    const displayBoard = () => {
        console.log(`
            ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
            ---------
            ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
            ---------
            ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
        `)
    }

    return { getBoard, placeMark, displayBoard};
})();


function GameController() {

}

//A function that will change the value of the current space in the board
// function setSpaceValue() {
//     let value = "";

//     const addMark = (playerMark) => {
//         value = playerMark;
//     }

//     const getValue = () => value;

//     return {
//         addMark,
//         getValue
//     };
// }
