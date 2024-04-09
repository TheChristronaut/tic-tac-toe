const TicTacToeGame = {
    board: document.querySelector('.board'),
    currentPlayer: 'X',
    gameState: ['', '', '', '', '', '', '', '', ''],
    gameActive: true,

    handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (this.gameState[cellIndex] !== '' || !this.gameActive) {
            return;
        }

        this.handleCellPlayed(clickedCell, cellIndex);
        this.handleResultValidation();
    },

    handleCellPlayed(clickedCell, cellIndex) {
        this.gameState[cellIndex] = this.currentPlayer;
        clickedCell.textContent = this.currentPlayer;
    },

    handleResultValidation() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];

            if (this.gameState[a] !== '' && this.gameState[a] === this.gameState[b] && this.gameState[a] === this.gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`Player ${this.currentPlayer} has won!`);
            this.gameActive = false;
            return;
        }

        if (!this.gameState.includes('')) {
            alert('The game is a draw!');
            this.gameActive = false;
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },

    startGame() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-cell-index', i);
            cell.addEventListener('click', this.handleCellClick.bind(this));
            this.board.appendChild(cell);
        }
    }
};

TicTacToeGame.startGame();