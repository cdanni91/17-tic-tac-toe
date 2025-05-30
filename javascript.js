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

            const rowCoordinate = "0";
            const columnCoordinate = "0";

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


    const maxRounds = 9;
    let roundsPlayed = 0;

    /* prints the board */
    function showBoard(board) {
        console.log(board);
    }


    function clearBoard() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = ""; 
                }
            }
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

    function checkIfWinner(board,player1,player2) {

        roundsPlayed += 1;

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

                console.log("ROUND OVER");

            
                addScore(); // add the point to the player
                clearBoard(); // cleans the board array
                cleanGameBoard();

                function addScore () {

                    // asummes thats a tie and doesnt do nothing
                    if (roundsPlayed >= maxRounds) {
    
                        roundsPlayed = 0;
    
                        return};
    
                    player1.isTurn === false ?  (console.log("Winner Player 1"), player1.score +=1) : 
                                                (console.log("Winner Player 2"), player2.score +=1);
    
                        roundsPlayed = 0;
                                            }         
                

            }
        }
        
        endGame(isWin);

        //resets the gameboard if max rounds have been play = tie
        if (roundsPlayed > maxRounds) {

            cleanGameBoard();
        }
        
        /* isWin is returned later so endGame can use it too */
        return isWin;

        

        function cleanGameBoard () {
            const gameElement = document.querySelector("#game");

            if (gameElement) {
            // Get all direct children of #game
            const children = gameElement.children;

            // Iterate through the children and clear their content
            for (let i = 0; i < children.length; i++) {
                children[i].textContent = "";
            }
    
        }
        }


        

    }
    
   

    

    return {
        showBoard,
        defineWhosTurn,
        checkIfWinner,
        
    };

}






function frontCreator () {

    let name1 = "";
    let name2 = "";
    let player1 = {};
    let player2 = {};
    let mark = "";
    let isBoardCreated = false;
    
    


    function pressStartButton(playerFactory) {

        const startGameButton = document.querySelector("#start-game");
        const gameContainer = document.querySelector("#game");



        startGameButton.addEventListener("click", () => {

            if (isBoardCreated) return; // if the board is already created it doesnt let you do it again

            setPlayers();
            renderBoard(board);
            clearScores();

            isBoardCreated = true; //
            
        })


        function setPlayers () {

                
                function setPlayerNames () {
                    const player1NameInput = document.querySelector("#player_1");
                    const player2NameInput = document.querySelector("#player_2");
                    const player1NameSlot = document.querySelector("#player-1-name");
                    const player2NameSlot = document.querySelector("#player-2-name");

                    // clears the default name and puts the one in the input fields
                    player1NameSlot.innerText = player1NameInput.value;
                    player2NameSlot.innerText = player2NameInput.value;

                    name1 = player1NameInput.value;
                    name2 = player2NameInput.value;

                }

                

                function createPlayers(name1, name2) {

                    player1 = playerFactory.createPlayer(name1,"X",true);
                    player2 = playerFactory.createPlayer(name2,"O",false);

                    //console.log(player1, player2);
                    
                }

                //get the names and create the players
                setPlayerNames();
                createPlayers(name1,name2);
                
                

        }
    

        function renderBoard (board) {

                let i = 0
                
                board.forEach((row, rowIndex) => {
                    
                    let j = rowIndex;

                    row.forEach((cell, colIndex) => {

                        let k = colIndex;

                        const square = document.createElement("div");
                        square.innerText = ""; 
                        square.setAttribute("square_number", `${i}`);
                        square.classList.add("square");
            
                        square.addEventListener("click", () => {
                            updateCell(square); 
                        });
                        

                        function updateCell(element) {

                            

                            if (element.innerText != "") return; // si el elemento tiene contenido, no haga nada

                            mark = GM.defineWhosTurn(player1,player2);
                            element.innerText = mark; // actualiza el elemento visual
                            board[j][k] = mark; // actualiza el board
                            GM.checkIfWinner(board,player1,player2); // revisa si hay un ganador
                            updateScoreBoard(); //actualiza el scoreboard

                            
                        }


            
                        gameContainer.appendChild(square);
                        i++;
                    })
                });
        }


        
        
        
        
    }
    

    function pressResetButton() {

        const resetGameButton = document.querySelector("#reset-game");

            resetGameButton.addEventListener("click", () =>{

                isBoardCreated = false; // lets you create the game board again
                deleteBoard();
                clearScores();

            })

         
            function deleteBoard() {
                const gameBoard = document.querySelector("#game");
                gameBoard.innerHTML = "";
            }
            
    }


    function clearScores () {
            const player1Score = document.querySelector("#player-1-scoreboard");
            const player2Score = document.querySelector("#player-2-scoreboard");
            player1Score.innerText = 0;
            player2Score.innerText = 0;
        }

    
    function updateScoreBoard () {

            const player1Score = document.querySelector("#player-1-scoreboard");
            const player2Score = document.querySelector("#player-2-scoreboard");
            player1Score.innerText = player1.score;
            player2Score.innerText = player2.score;
    }

    

    
    return {
        pressStartButton,
        pressResetButton,
        clearScores,
        updateScoreBoard
    }



}




// create board
const myGame = gameBoard();
myGame.createBoard(3,3);
const board = myGame.getBoard();

// create players
const playerFactory = player();

// create the game master
const GM = gameMaster();

const playerJoystick = joystick();

//testing the front game
const front = frontCreator();

front.pressStartButton(playerFactory);
front.pressResetButton();












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