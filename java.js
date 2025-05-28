
/* test program */


/* Create board */
const myGame = gameBoard();
myGame.createBoard(3,3);

const board = myGame.getBoard();

/* show board */
const GM = gameMaster();
/* monitor.showBoard(); */


/* Create a player */
const p = player();
const player1 = p.createPlayer("Bob","X", true);
const player2 = p.createPlayer("Luis", "O", false);
/* console.log(player1.isTurn);
console.log(player2.isTurn);
console.log(GM.defineWhosTurn(player1,player2));
console.log(GM.defineWhosTurn(player1,player2));
console.log(GM.defineWhosTurn(player1,player2)); */



/* Make a play and shows it */
const playerJoystick = joystick();



myGame.checkIfWinner(board);
playerJoystick.markBoard(board,0,0,player1.symbol);
playerJoystick.markBoard(board,1,0,player1.symbol);
playerJoystick.markBoard(board,2,0,player1.symbol);
GM.showBoard(board);
myGame.checkIfWinner(board);
playerJoystick.markBoard(board,2,1,player2.symbol);
playerJoystick.markBoard(board,2,2,player2.symbol);
GM.showBoard(board);
myGame.checkIfWinner(board);
