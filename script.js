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
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
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

    const playTurn = (row, column) => {
        console.log(row, column)
        if (row < 0 || row > 2 || row === ' ') return;

        if (column < 0 || column > 2 || column === ' ') return;
        
        board.placeMark(row, column, currentPlayer.symbol);
        changePlayer();
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const getCurrentPlayer = () => currentPlayer;

    const resetGame = () => {
        board.resetBoard();
        currentPlayer = playerOne;
    }

    return { playTurn, resetGame, getCurrentPlayer }
}
const game = GameController();


//An obj to handle logic and render to UI
const handleDisplay = {
    boardElement: document.querySelector('.game-board'),

    renderBoard: function() {
        const boardArray = Gameboard.getBoard();
        let rowIndex = 0;

        for (row of boardArray) {
            let columnIndex = 0;
            for (cell of row) {
                const cellElement = document.createElement('div');
                cellElement.setAttribute('data-row', rowIndex);
                cellElement.setAttribute('data-column', columnIndex);
                cellElement.classList.add('cell');
                this.boardElement.appendChild(cellElement);
                columnIndex++;
            }
            rowIndex++;
        }
    },

    handleTurn: function() {
        const boardCells = document.querySelectorAll('.cell');
        boardCells.forEach((cell) => {
            cell.addEventListener('click', () => {
                const cellRow = cell.getAttribute('data-row');
                const cellColumn = cell.getAttribute('data-column');
                const player = getPlayerName();

                //Prevent placing mark in a non empty space
                if (cell.textContent !== '') return;

                updateCellContent(cell);
                game.playTurn(cellRow, cellColumn);
                handleWin(player);
            })
        })

        const getPlayerMark = () => game.getCurrentPlayer().symbol;

        const getPlayerName = () => game.getCurrentPlayer().name;

        const updateCellContent = (cellElement) => {
            cellElement.textContent = getPlayerMark();
        }

        const handleWin = (winner) => {
            const isWin = Gameboard.checkForWin();
            if (isWin === false) return;
            if (isWin === true) {
                console.log(winner);
                this.resetDisplay();
            }
            else if (isWin === "Tie") {
                console.log("Tie!")
                this.resetDisplay();
            }
        }
    },

    resetDisplay: function() {
        game.resetGame();
        this.boardElement.innerHTML = '';
        this.renderBoard();
        this.handleTurn();
    }

}
handleDisplay.renderBoard();
handleDisplay.handleTurn();