document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const renderBoard = () => {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') return;
        gameBoard[index] = currentPlayer;
        renderBoard();
        handleResultValidation();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            announceWinner(currentPlayer);
            return;
        }

        if (!gameBoard.includes('')) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }
    };

    const announceWinner = (winner) => {
        setTimeout(() => {
            alert(`${winner} wins!`);
        }, 100);
    };

    resetButton.addEventListener('click', () => {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
        renderBoard();
    });

    renderBoard();
});
