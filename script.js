const createPlayer = (name, symbol) => {
    return { 
        name, 
        symbol 
    };
};

const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const emptySpace = " ";
    let board = [
        ["O", "X", "O"],
        ["O", "O", "X"],
        ["X", "O", "X"]
    ];
    
    console.log(board)
    //Method for getting entire board for our UI
    const getBoard = () => board;

    const placeMark = (row, column, playerMark) => {
        if (board[row][column] !== emptySpace) return;
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

    const checkForWin = () => {
        //Check rows
        for (let i = 0; i < rows; i++) {
            if ((board[i][0] !== emptySpace) && (board[i][0] === board[i][1]) && (board[i][1] === board[i][2])) return true;
        }
        //Check columns
        for (let i = 0; i < columns; i++) {
            if ((board[0][i] !== emptySpace) && (board[0][i] === board[1][i]) && (board[1][i] === board[2][i])) return true;
        }

        //Check diagonals
        if (board[1][1] === emptySpace) return false;
        
        if (board[0][0] === board[1][1] && board[1][1] ===
        board[2][2]) return true;
        
        if (board[2][0] === board[1][1] && board[1][1] ===
        board[0][2]) return true;

        //Check for tie 
        if (!board.some(row => row.includes(emptySpace))) return "Tie";
        
        return false;
    }

    const resetBoard = () => {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
    }

    return { getBoard, placeMark, displayBoard, checkForWin , resetBoard };
})();


function GameController() {
    const board = Gameboard;
    const playerOne = createPlayer('player one', 'X');
    const playerTwo = createPlayer('player two', 'O');
    let currentPlayer = playerOne;

    console.log(currentPlayer.symbol)

    const playTurn = () => {
        const row = prompt('Pick a row');
        if (row < 0 || row > 2 || row === ' ') return;

        const column = prompt('pick a column');
        if (column < 0 || column > 2 || column === ' ') return;
        
        board.placeMark(row, column, currentPlayer.symbol);
        checkEndGame();
        changePlayer();
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const checkEndGame = () => {
        if (board.checkForWin() === true) {
            alert(`${currentPlayer.name} is the winner!`);
        }

        else if (board.checkForWin() === 'Tie') {
            alert("It's a tie!");
        }
    }

    const resetGame = () => {
        board.resetBoard();
        currentPlayer = playerOne;
    }

    return { playTurn, resetGame }
}
const game = GameController();



const handleDisplay = {
    renderBoard: function() {
        const board = Gameboard.getBoard();
        const boardElement = document.querySelector('.game-board');
        for (row of board) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');

            for (cell of row) {
                const cellElement = document.createElement('div');
                cellElement.textContent = cell;
                cellElement.classList.add('cell');
                rowElement.appendChild(cellElement);
            }
            boardElement.appendChild(rowElement);
        }
    },

    placeMark: function() {
        const boardCells = document.querySelectorAll('.cell');
        boardCells.forEach((cellElement) => {
            cellElement.addEventListener('click', () => {
                const row = 
                game.playTurn();
            })
        })
    }        
}
