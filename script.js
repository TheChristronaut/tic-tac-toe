function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markCell = (row, column, player) => {
        board[row][column].markCell(player);
    };

    const checkForWinner = (player) => {
        for (let i = 0; i < rows; i++) {
            if (board[i][0].getValue() === player &&
                board[i][1].getValue() === player &&
                board[i][2].getValue() === player) {
                return true;
            }
        }

        for (let j = 0; j < columns; j++) {
            if (board[0][j].getValue() === player &&
                board[1][j].getValue() === player &&
                board[2][j].getValue() === player) {
                return true;
            }
        }

        if ((board[0][0].getValue() === player &&
             board[1][1].getValue() === player &&
             board[2][2].getValue() === player) ||
            (board[0][2].getValue() === player &&
             board[1][1].getValue() === player &&
             board[2][0].getValue() === player)) {
            return true;
        }

        return false;
    };

    return {getBoard, markCell, checkForWinner};
}

function Cell() {
    let value = 0;
    const markCell = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {markCell, getValue};
}

function GameControl(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    const players = [{name: playerOneName, mark: 1}, {name: playerTwoName, mark: 2}];
    let currentPlayer = players[0];

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const createNewRound = () => {
        console.log(`${currentPlayer.name}'s turn.`);
    };

    const playTurn = (row, column) => {
        console.log(`${currentPlayer.name}'s choice is...`);
        board.markCell(row, column, currentPlayer.mark);

        if (board.checkForWinner(currentPlayer.mark)) {
            console.log(`${currentPlayer.name} wins!`);
            return;
        };

        switchPlayerTurn();
        createNewRound();
    };

    createNewRound();

    return{playTurn};
}