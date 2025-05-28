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
            


            */


            const [a, b, c] = combination;

            
            
            

            const cellA = board[a[0]][a[1]][0];
            const cellB = board[b[0]][b[1]][0];
            const cellC = board[c[0]][c[1]][0];
            
          
            return cellA && cellA === cellB && cellB === cellC;
          });

        
        
    }


    return {
        createBoard,
        getBoard,
        checkIfWinner
    };
}




function player() {

    function createPlayer(name,symbol) {
        return {name, symbol};
    }

   

    return {createPlayer
            
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






/* test program */


/* Create board */
const myGame = gameBoard();
myGame.createBoard(3,3);

const board = myGame.getBoard();

/* show board */
const monitor = displayMonitor(board);
/* monitor.showBoard(); */


/* Create a player */
const p = player();
const player1 = p.createPlayer("Bob","X");
/* console.log(player1.symbol); */



/* Make a play and shows it */
const playerJoystick = joystick();



myGame.checkIfWinner(board);
playerJoystick.markBoard(board,0,0);
playerJoystick.markBoard(board,1,0);
playerJoystick.markBoard(board,2,0);
monitor.showBoard();
myGame.checkIfWinner(board);


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

