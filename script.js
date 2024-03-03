const createPlayer = (name, symbol) => {
    let score = 0;

    const setScore = () => {
        score++
    }

    const getScore = () => score;
    

    return { 
        name, 
        symbol,
        setScore,
        getScore 
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
        if (row < 0 || row > 2 || row === ' ') return;

        if (column < 0 || column > 2 || column === ' ') return;
        
        board.placeMark(row, column, currentPlayer.symbol);
        changePlayer();
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const setPlayerOneName = (name) => playerOne.name = name;
    const setPlayerTwoName = (name) => playerTwo.name = name;


    const getCurrentPlayer = () => currentPlayer;

    const resetGame = () => {
        board.resetBoard();
    }

    return { playTurn, resetGame, getCurrentPlayer, setPlayerOneName, setPlayerTwoName }
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
        const getPlayerMark = () => game.getCurrentPlayer().symbol;

        const getPlayerName = () => game.getCurrentPlayer().name;

        const updateCellContent = (cellElement) => {
            cellElement.textContent = getPlayerMark();
        }

        let enableInteraction = true;
        
        const handleWin = (winner) => {
            const isWin = Gameboard.checkForWin();
            if (isWin === false) return;
            if (isWin === true) {
                let message = `${winner.name} is the winner!`;
                this.setInformationSection(message);
                console.log(winner.getScore())
                this.updatePlayerScore(winner);
            }
            else if (isWin === "Tie") {
                let message = "Its a Tie!"
                this.setInformationSection(message);
            }
            enableInteraction = false;
        }

        const boardCells = document.querySelectorAll('.cell');
        boardCells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (enableInteraction === false) return;

                const cellRow = cell.getAttribute('data-row');
                const cellColumn = cell.getAttribute('data-column');
                const thisPlayer = game.getCurrentPlayer();
                //Prevent placing mark in a non empty space
                if (cell.textContent !== '') return;

                updateCellContent(cell);
                
                game.playTurn(cellRow, cellColumn);
                this.setInformationSection(`${getPlayerName()}'s turn (${getPlayerMark()})`);
                handleWin(thisPlayer);
            })
        })
    },

    setInformationSection : function(information) {
        const informationSection = document.querySelector('.display-information');
        informationSection.textContent = information;
    },

    setPlayerNames: function() {
        const playerOneName = document.querySelector('#player-one-name').value;
        const playerTwoName = document.querySelector('#player-two-name').value;

        game.setPlayerOneName(playerOneName);
        game.setPlayerTwoName(playerTwoName);

        document.querySelector('#player-one').textContent = playerOneName;

        document.querySelector('#player-two').textContent = playerTwoName;
    },

    updatePlayerScore: function(player) {
        player.setScore();

        const playerOneScore = document.querySelector('#player-one-score');
        const playerTwoScore = document.querySelector('#player-two-score');

        if (player.symbol === 'X') {
            playerOneScore.textContent = player.getScore();
        }

        else if ( player.symbol === 'O') {
            playerTwoScore.textContent = player.getScore();
        }
    },

    resetDisplay: function() {
        game.resetGame();
        this.setInformationSection(`${game.getCurrentPlayer().name}'s turn (${game.getCurrentPlayer().symbol})`)
        this.boardElement.innerHTML = '';
        this.renderBoard();
        this.handleTurn();
        enableInteraction = true;
    }

}


//Initiate game
const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.addEventListener('click', () => {
    handleDisplay.resetDisplay();
})

const startGameBtn = document.querySelector('#start-game-btn');
startGameBtn.addEventListener('click', ()=> {
    const form = document.querySelector('.enter-names-form');
    form.addEventListener('submit', () => {
        const main = document.querySelector('.main');
        newGameBtn.classList.remove('hidden');
        main.classList.remove("hidden");

        handleDisplay.setPlayerNames();
        handleDisplay.resetDisplay();
    })
})






