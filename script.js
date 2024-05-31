const ROWS = 6;
const COLUMNS = 7;
const DEPTH = 4;
let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(''));
let gameOver = false;

window.onload = () => {
    let params = {};
    window.location.href.split('?')[1].split('&').forEach(pair=>{
        params[pair.split('=')[0]] = pair.split('=')[1]
    })

    if(params.moves){
        params.moves.split('').forEach(move=>{
            handleUserMove(parseInt(move))
        })
    }
}
if(window != window.parent){
    document.write()
}

function cloneBoard(board) {
    return board.map(row => row.slice());
}

function getValidMoves(board) {
    const validMoves = [];
    for (let col = 0; col < COLUMNS; col++) {
        if (board[0][col] === '') {
            validMoves.push(col);
        }
    }
    return validMoves;
}

function placePiece(board, col, piece) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === '') {
            board[row][col] = piece;
            break;
        }
    }
}

function evaluateBoard(board, piece) {
    let score = 0;

    function countPieces(r, c, dr, dc) {
        let count = 0;
        for (let k = 0; k < 4; k++) {
            const rr = r + k * dr;
            const cc = c + k * dc;
            if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLUMNS && board[rr][cc] === piece) {
                count++;
            }
        }
        return count;
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            score += countPieces(row, col, 1, 0) === 4 ? Infinity : countPieces(row, col, 1, 0);
            score += countPieces(row, col, 0, 1) === 4 ? Infinity : countPieces(row, col, 0, 1);
            score += countPieces(row, col, 1, 1) === 4 ? Infinity : countPieces(row, col, 1, 1);
            score += countPieces(row, col, 1, -1) === 4 ? Infinity : countPieces(row, col, 1, -1);
        }
    }
    if(score > 4){score == 3.95}
    return score;
}

function minimax(board, depth, isMaximizing, steps) {
    const validMoves = getValidMoves(board);
    if (depth === 0 || checkWin(board, 'x') || checkWin(board, 'o') || validMoves.length === 0) {
        if (checkWin(board, 'x')) return { score: Infinity, steps };
        if (checkWin(board, 'o')) return { score: -Infinity, steps };
        return { score: evaluateBoard(board, 'x') - evaluateBoard(board, 'o'), steps };
    }

    steps += 1;

    if (isMaximizing) {
        let maxEval = -Infinity;
        let bestMove;
        for (let move of validMoves) {
            const newBoard = cloneBoard(board);
            placePiece(newBoard, move, 'x');
            const eval = minimax(newBoard, depth - 1, false, steps).score;
            if (eval > maxEval) {
                maxEval = eval;
                bestMove = move;
            }
        }
        return { score: maxEval, move: bestMove, steps };
    } else {
        let minEval = Infinity;
        let bestMove;
        for (let move of validMoves) {
            const newBoard = cloneBoard(board);
            placePiece(newBoard, move, 'o');
            const eval = minimax(newBoard, depth - 1, true, steps).score;
            if (eval < minEval) {
                minEval = eval;
                bestMove = move;
            }
        }
        return { score: minEval, move: bestMove, steps };
    }
}

function showMessage(t){
    let load = document.createElement("p");
    load.id = "load-message"
    load.innerHTML = "Loading..."
    if(t == 1){
        document.body.appendChild(load)
    } else if(t == 0){
        document.getElementById("load-message").remove()
    }
} 

function addLink(){
    let a = document.createElement("a");
    a.href = window.parent.location.href;
    a.innerHTML = "Refresh";
    document.body.appendChild(a);
}

function findBestMove(board) {
    const { move, steps } = minimax(board, DEPTH, true, 0);
    if (move !== undefined) {
        placePiece(board, move, 'x');
    }
    return { board, steps };
}

function rateUserMove(board, col) {
    const testBoard = cloneBoard(board);
    placePiece(testBoard, col, 'o');
    const score = evaluateBoard(testBoard, 'o');
    return (score / (4 * (ROWS - 1))).toFixed(2);
}

function renderBoard(board, winningCells = []) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < COLUMNS; col++) {
            const td = document.createElement('td');
            if (board[row][col] === 'x') {
                td.className = 'x';
            } else if (board[row][col] === 'o') {
                td.className = 'o';
            }
            td.textContent = board[row][col];
            if (winningCells.some(cell => cell.row === row && cell.col === col)) {
                td.classList.add('highlight');
            }
            if (!gameOver) {
                td.addEventListener('click', () => handleUserMove(col));
            }
            tr.appendChild(td);
        }
        boardElement.appendChild(tr);
    }
}

function handleUserMove(col) {
    if (gameOver || !getValidMoves(board).includes(col)) return;
    const userMoveRating = rateUserMove(board, col);
    placePiece(board, col, 'o');
    renderBoard(board);
    if (checkWin(board, 'o')) {
        addLink()
        highlightWinningCells(board, 'o');
        document.getElementById('winner').textContent = 'You win!';
        gameOver = true;
        return;
    }
    showMessage(1)
    const startTime = performance.now();
    const { board: newBoard} = findBestMove(board);
    board = newBoard;
    const endTime = performance.now();
    renderBoard(board);
    let oldRating;
    if(document.getElementById('processing-time').innerText){
        oldRating = Number(document.getElementById('processing-time').innerText.split(',')[1].split('Rating: ')[1])
    } else {
        oldRating = 0;
    }
    document.getElementById('processing-time').textContent = `Time: ${(endTime - startTime).toFixed(2)} ms, Rating: ${(userMoveRating - oldRating).toFixed("2")}`;
    showMessage(0)
    if (checkWin(board, 'x')) {
        addLink()
        highlightWinningCells(board, 'x');
        document.getElementById('winner').textContent = 'Computer wins!';
        gameOver = true;
    }
}

function checkWin(board, piece) {
    function countPieces(r, c, dr, dc) {
        let count = 0;
        for (let k = 0; k < 4; k++) {
            const rr = r + k * dr;
            const cc = c + k * dc;
            if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLUMNS && board[rr][cc] === piece) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (countPieces(row, col, 1, 0) === 4 ||
                countPieces(row, col, 0, 1) === 4 ||
                countPieces(row, col, 1, 1) === 4 ||
                countPieces(row, col, 1, -1) === 4) {
                return true;
            }
        }
    }
    return false;
}

function highlightWinningCells(board, piece) {
    let winningCells = [];

    function countPieces(r, c, dr, dc) {
        let count = 0;
        let cells = [];
        for (let k = 0; k < 4; k++) {
            const rr = r + k * dr;
            const cc = c + k * dc;
            if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLUMNS && board[rr][cc] === piece) {
                count++;
                cells.push({ row: rr, col: cc });
            } else {
                break;
            }
        }
        if (count === 4) {
            winningCells = cells;
        }
        return count;
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            countPieces(row, col, 1, 0);
            countPieces(row, col, 0, 1);
            countPieces(row, col, 1, 1);
            countPieces(row, col, 1, -1);
        }
    }

    renderBoard(board, winningCells);
}

renderBoard(board);
