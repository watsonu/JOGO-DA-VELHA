document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    // Função para criar o tabuleiro
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    createBoard();
    // Função para verificar se o jogo terminou com um vencedor
    function checkWinner() {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameOver = true;
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes('')) {
            gameOver = true;
            return 'Empate';
        }

        return null;
    }

    // Função para atualizar a mensagem de status
    function updateStatus() {
        if (gameOver) {
            const winner = checkWinner();
            if (winner == 'Empate') {
                status.textContent = 'Deu empate!';
            } else {
                status.textContent = `O jogador ${winner} venceu!`;
            }
        } else {
            status.textContent = `Vez do jogador ${currentPlayer}`;
        }
    }

    // Função para lidar com o clique em uma célula do tabuleiro
    function handleCellClick(e) {
        if (gameOver) return;

        const cell = e.target;
        const index = cell.dataset.index;

        if (gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            if (checkWinner()) {
                gameOver = true;
                updateStatus();
                //status.textContent = `Jogador ${currentPlayer} venceu!`; // Mostra o vencedor
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus();
            }
        }
    }

    // Adiciona o evento de clique a todas as células
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Reinicia o jogo quando o botão "Reiniciar" é clicado
    restartButton.addEventListener('click', () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = ''; // Limpa o conteúdo da célula
            cell.classList.remove('X', 'O'); // Remove as classes X e O
        });
        currentPlayer = 'X';
        updateStatus();
    });
    // Inicializa a mensagem de status
    updateStatus();
});
