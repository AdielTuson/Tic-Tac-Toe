const createPlayer = (name, symbol) => {
    return { 
        name, 
        symbol 
    };
};
// const playerOne = createPlayer('player one', 'X');
// const playerTwo = createPlayer('player two', 'O');


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
        if (board[row][column] !== " ") return;
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
    const playerOne = createPlayer('player one', 'X');
    const playerTwo = createPlayer('player two', 'O');
    let currentPlayer = playerOne;
    console.log(currentPlayer.symbol)

    const playTurn = () => {
        const row = prompt('Pick a row');
        if (row < 0 || row > 2 || row === '') return;
        console.log(row);
        const column = prompt('pick a column');
        if (column < 0 || column > 2 || column === '') return;
        console.log(column);
        
        Gameboard.placeMark(row, column, currentPlayer.symbol);
        changePlayer();
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }


    return { playTurn, changePlayer }
}
const game = GameController();
