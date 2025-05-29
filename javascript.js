function gameBoard() {
    
    const board = [];

    function createBoard (rows, columns) {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = [];
            }
        }

        // testing board
        /* board[0][0] = "X"
        board[0][1] = "X"
        board[0][2] = "X"
        board[1][0] = "O"
        board[1][1] = "O"
        board[1][2] = "O"
        board[2][0] = "X"
        board[2][1] = "O"
        board[2][2] = "X"
        console.log(board); */
    }

    function getBoard () {
        return board;
    }


    return {
        createBoard,
        getBoard,
        
    };
}


function player() {

    function createPlayer(name,symbol,isTurn) {

        const score = 0;

        return {name, symbol, isTurn, score};
    }

    return {
        createPlayer
    };
}



function joystick() {

    function markBoard (board, mark) {

        let isValidMove = false;


        function askForCoordinates(){

            const rowCoordinate = prompt("What row?");
            const columnCoordinate = prompt("What column?");

            return [parseInt(rowCoordinate), parseInt(columnCoordinate)];

        }

        function checkIfValid(board, row, column) {
            // Verifica si la posición está dentro del rango y está vacía
            if (isNaN(row) || isNaN(column)) return false;
            if (row < 0 || row > 2 || column < 0 || column > 2) return false;
            if (row < 0 || row > 2 || column < 0 || column > 2) return false;
            if (board[row][column].length) return false;
            
            return true;
        }

        

        // obliga al usuario a que la posicion a marcar sea valida
        while (!isValidMove) {

        const [rowCoordinate, columnCoordinate] = askForCoordinates();
        
        // si no es valido repite el turno
        if(!checkIfValid(board,rowCoordinate,columnCoordinate)) continue;

        // si es valido marca el tablero y permite romper el loop
        board[rowCoordinate][columnCoordinate].push(mark);
        isValidMove = true;

        }
    }

    return {
            markBoard
    };
}



function gameMaster() {

    /* prints the board */
    function showBoard(board) {
        console.log(board);
    }

    /* alternate the turns */
    function defineWhosTurn (player1, player2) {

        let mark = "";

        if (player1.isTurn) {
            mark = player1.symbol;
            player1.isTurn = false;
            player2.isTurn = true;
        } else {
            mark = player2.symbol;
            player2.isTurn = false;
            player1.isTurn = true;
        }

        return mark
    }

    function checkIfWinner(board) {

        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]], // fila superior
            [[1, 0], [1, 1], [1, 2]], // fila del medio
            [[2, 0], [2, 1], [2, 2]], // fila inferior
            [[0, 0], [1, 0], [2, 0]], // columna izquierda
            [[0, 1], [1, 1], [2, 1]], // columna del medio
            [[0, 2], [1, 2], [2, 2]], // columna derecha
            [[0, 0], [1, 1], [2, 2]], // diagonal principal
            [[0, 2], [1, 1], [2, 0]]  // diagonal secundaria
          ];

          const isWin = winningCombinations.some(combination => {


            const [a, b, c] = combination;

            const cellA = board[a[0]][a[1]][0];
            const cellB = board[b[0]][b[1]][0];
            const cellC = board[c[0]][c[1]][0];

            return cellA && cellA === cellB && cellB === cellC;

            });

            

            /* console.log(isWin); */

            /* Lo que esto hace es que cada elemento dentro 
            de winningCombinatios se separe en 3 variables que
            por destructuring automaticamente el elemento 0 asigna
            a la letra "a", el 1 a la "b" y el 2 al a "c".

            const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]], (primer elemento)
            [[1, 0], [1, 1], [1, 2]], (segundo)
            [[2, 0], [2, 1], [2, 2]], (tercero)
            ...] 

               a       b       c
            [[0, 0], [0, 1], [0, 2]],
            

            (2) Teniendo en cuenta que a,b,c son arrays donde
            basicamente el primer elemento es el row y el segundo
            es la column de nuestro tablero

            a[0] a[1]   b[0]  b[1]   c[0]  c[1]
            [0,    0]   [0,     1]   [0,     2]
            row   col   row    col   row    col

            board = [

                0      1      2          
            [ A["X"], B["X"], C["X"] ], 0
            [ ["O"], ["O"], ["O"] ],    1
            [ ["X"], [],    ["X"] ]     2
            ];


            Forma la celda A de la siguiente manera:

            cellA = board[  a[0]    a[1]  [0]  ]
                             0       0    el valor de la celda


            Al ir iterando entre cada combinacion ganadora y
            como cada combinacion ganadora en realidad es una coordenada
            en realidad lo que se estan comparando son si los elementos
            dentro de cada coordenada son iguales lo que daria la victoria
            
            (3) Por ultimo, si cellA no esta vacia, y cellA, cell B
            y cellC son iguales es un winner move
            */


        /* add a nested function so it triggers when isWin is true */            
        function endGame (isWin) {
            if (isWin) {
                console.log("GAME OVER");
            }
        }
    
        endGame(isWin);
        
        /* isWin is returned later so endGame can use it too */
        return isWin;
    }
    


    

    return {
        showBoard,
        defineWhosTurn,
        checkIfWinner
    };

}


function frontCreator () {


    function pressStartGame(playerFactory) {

        const startGameButton = document.querySelector("#start-game");
        const gameContainer = document.querySelector("#game");


        function setPlayers () {

            startGameButton.addEventListener("click", () => {

                function setPlayerNames () {
                    const player1NameInput = document.querySelector("#player_1");
                    const player2NameInput = document.querySelector("#player_2");
                    const player1NameSlot = document.querySelector("#player-1-name");
                    const player2NameSlot = document.querySelector("#player-2-name");

                    // clears the default name and puts the one in the input fields
                    player1NameSlot.innerText = player1NameInput.value;
                    player2NameSlot.innerText = player2NameInput.value;

                    const name1 = player1NameInput.value;
                    const name2 = player2NameInput.value;

                    return {name1, name2};
                }

                // get the names of the players
                const {name1, name2} = setPlayerNames();

                function createPlayers(name1, name2) {

                    const player1 = playerFactory.createPlayer(name1,"X",true);
                    const player2 = playerFactory.createPlayer(name2,"O",false);

                    console.log(player1, player2);

                    return {player1, player2}
                }

                createPlayers(name1,name2);
                clearScores();

            });

        

        }
        

        


        function createBoard (board) {
            startGameButton.addEventListener("click", () => {

                let i = 0

                board.forEach(column => {
                    //console.log(column);

                    column.forEach((cell, index) => {
                        console.log(cell);

                        const square = document.createElement("div");
                        square.innerText = cell;
                        square.setAttribute("square_number",`${i}`)
                        gameContainer.appendChild(square);
                        i++
                    
                    
                    })
                    
                });

            });
        }


        
        setPlayers();
        createBoard(board); 
        
        
    }
    

    function pressResetGame() {

        const resetGameButton = document.querySelector("#reset-game");

            

         
            function clearBoard() {

                resetGameButton.addEventListener("click", () => {

                const gameBoard = document.querySelector("#game");
                gameBoard.innerHTML = "";
                
                clearScores();

                });
                
            }
            
        
        clearBoard();
    }


    function clearScores () {
            const player1Score = document.querySelector("#player-1-scoreboard");
            const player2Score = document.querySelector("#player-2-scoreboard");
            player1Score.innerText = 0;
            player2Score.innerText = 0;
        }


    return {
        pressStartGame,
        pressResetGame,
        clearScores,
        
    }



}




// create board
const myGame = gameBoard();
myGame.createBoard(3,3);
const board = myGame.getBoard();

// create players
const playerFactory = player();


//testing the front game
const front = frontCreator();

front.pressStartGame(playerFactory);
front.pressResetGame();












// console tic tac toe
/* const game = function playGame() {

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

game(); */









/* 
const winningCombinations = [

    [ X ] [ X ] [ X ] 
    [   ] [   ] [   ]
    [   ] [   ] [   ]

    [   ] [   ] [   ]
    [ X ] [ X ] [ X ] 
    [   ] [   ] [   ]

    [   ] [   ] [   ]
    [   ] [   ] [   ]
    [ X ] [ X ] [ X ] 

    [ X ] [   ] [   ]
    [ X ] [   ] [   ]
    [ X ] [   ] [   ]

    [   ] [ X ] [   ]
    [   ] [ X ] [   ]
    [   ] [ X ] [   ]

    [   ] [   ] [ X ]
    [   ] [   ] [ X ]
    [   ] [   ] [ X ]

    [ X ] [   ] [   ]
    [   ] [ X ] [   ]
    [   ] [   ] [ X ]

    [   ] [   ] [ X ]
    [   ] [ X ] [   ]
    [ X ] [   ] [   ]

]


 */