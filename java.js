
/* flow test */


/* create and retrieve the gameboard */
const myGame = gameBoard();
myGame.createBoard(3,3);
const board = myGame.getBoard();


/* create both players, assignin the first player the first turn */
const playerCreator = player();
const player1 = playerCreator.createPlayer("Bob","X", true);
const player2 = playerCreator.createPlayer("Luis", "O", false);

/* creates the joystick to play */
const playerJoystick = joystick();

/* create the GM to manage the game flow */
const GM = gameMaster();
    //define whos turn is it
    mark = GM.defineWhosTurn(player1,player2);

/* mark the board */
playerJoystick.markBoard(board,0,0,mark);
    //shows the board
    GM.showBoard(board);
    //define whos turn is it
    mark = GM.defineWhosTurn(player1,player2);

/* mark the board */
playerJoystick.markBoard(board,1,1,mark);
    //shows the board
    GM.showBoard(board);
    //define whos turn is it
    mark = GM.defineWhosTurn(player1,player2);
    /* check if winner - false */
    console.log(GM.checkIfWinner(board))


/* make a player win */
playerJoystick.markBoard(board,0,1,mark);
playerJoystick.markBoard(board,0,2,mark);
GM.showBoard(board);
    /* check if winner - true - endgame triggers */
    console.log(GM.checkIfWinner(board))

