document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const winnerText = document.getElementById("winner");
    let cells = [];
    let currentPlayer = "X";
    let gameActive = true;
    let gameMode = "player"; // Default: 2 Player Mode

    function createBoard() {
        board.innerHTML = "";
        cells = [];
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleMove);
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    function handleMove(e) {
        if (!gameActive) return;
        const cell = e.target;
        if (cell.textContent !== "") return;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        if (checkWinner()) {
            winnerText.textContent = `Player ${currentPlayer} Wins! 🎉`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (gameMode === "ai" && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    }

    function aiMove() {
        let availableCells = cells.filter(cell => cell.textContent === "");
        if (availableCells.length === 0) return;
        let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.textContent = "O";
        randomCell.classList.add("taken");

        if (checkWinner()) {
            winnerText.textContent = "AI Wins! 🤖";
            gameActive = false;
        } else {
            currentPlayer = "X";
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                cells[a].style.background = cells[b].style.background = cells[c].style.background = "#4caf50";
                return true;
            }
            return false;
        });
    }

    function resetGame() {
        gameActive = true;
        winnerText.textContent = "";
        currentPlayer = "X";
        createBoard();
    }

    function setMode(mode) {
        gameMode = mode;
        resetGame();
    }

    createBoard();
    window.resetGame = resetGame;
    window.setMode = setMode;
});
