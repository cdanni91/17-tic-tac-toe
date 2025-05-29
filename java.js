
const game = function playGame() {

    // create board
    const myGame = gameBoard();
    myGame.createBoard(3,3);
    const board = myGame.getBoard();
    
    // create both players, assigns the first player the first turn 
    const playerCreator = player();
        // ask the players numbers
    const name1 = prompt("What is your name?")
    const name2 = prompt("Whats yours?")
        // asigns the starting symbol automatically
    const player1 = playerCreator.createPlayer(name1,"X", true);
    const player2 = playerCreator.createPlayer(name2, "O", false);

    // create the joystick to play with
    const playerJoystick = joystick();
    // create the GM to manage the game flow
    const GM = gameMaster();



    ////// plays the game /////

        //the conditions are theres o winner or 9 valid rounds been played
    const maxRounds = 9;
    let roundsPlayed = 0;
    let winnerFound = false;


    while(!winnerFound && roundsPlayed < maxRounds) {

        //define whos turn is it
        let mark = GM.defineWhosTurn(player1,player2);
        //mark the board with the current player mark if valid
        playerJoystick.markBoard(board,mark);
            //checks if the combination is a winner
        if (GM.checkIfWinner(board)) winnerFound = true;
        // shows the board
        GM.showBoard(board);


    
        roundsPlayed += 1;
    }

    

    

}