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

    function getBoard () {
        return board;
    }






    return {
        createBoard,
        getBoard
    };
}




function player() {

    function createPlayer(name,XorO) {
        return {name, XorO};
    }

   

    return {createPlayer,
            
    };
}





function joystick() {

    function markBoard (board, row, column) {
        if (board[row][column].length) return;
        board[row][column].push("X");
    }

    return {
            markBoard

    };
}


function displayMonitor(board) {

    function showBoard() {
        console.log(board);
    }

    return {
        showBoard
    };
}

/* Create board */
const myGame = gameBoard();
myGame.createBoard(3,3);

const board = myGame.getBoard();

/* show board */
const monitor = displayMonitor(board);
monitor.showBoard();


/* Create a player */
const p = player();
const player1 = p.createPlayer("Bob","X");
console.log(player1);



/* Make a play and shows it */
const playerJoystick = joystick();

playerJoystick.markBoard(board,1,1);
monitor.showBoard();

playerJoystick.markBoard(board,2,1);
monitor.showBoard();







