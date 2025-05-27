function gameBoard() {
    
    const board = [];

    function createBoard (rows, columns) {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = [];
            }
        }
    }

    return createBoard;
}


function player() {

    function createPlayer(name,XorO) {
        return {name, XorO};
    }

    return createPlayer;

}

function joystick() {

    function markBoard (row, column) {
        if (board[row][column].length) return;
        board[row][column] = "X";
    }

    return markBoard;
}


function displayMonitor() {

    function showBoard() {

        console.log(board);

    }
}




/* 
    const markCell = (row, column) => {
        if (board[row][column].length) return;
        board[row][column] = "X";
    }

    const showBoard = () => {
        console.log(board);
    }

    return {
        createBoard,
        markCell,
        showBoard
    };
}

const myGameBoard = gameBoard();

myGameBoard.createBoard(3, 3);
console.log("Before marking:");
myGameBoard.showBoard();
myGameBoard.markCell(0, 0);
console.log("After marking:");
myGameBoard.showBoard();
 */