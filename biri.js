


// IIFE
(function AppController () {
    const back = createBack();
    back.createRandomArray();
    const board = back.getBoard();
    const front = createFront();
    front.renderBoard(board);



function createFront () {

    function renderBoard (board) {

        // Crear una tabla
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";

        board.forEach((row, rowIndex) => {

            let k = rowIndex;

            const tr = document.createElement("tr");
            row.forEach((cell, columnIndex) => {

                let p = columnIndex;

                const td = document.createElement("td");
                td.addEventListener("click", () => {
                    updateCell(td);
                    updateBoard(td,k,p);
                    
                });

                td.textContent = cell;
                td.style.border = "1px solid black";
                td.style.padding = "10px";
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        // Agregar la tabla al main
        main.appendChild(table);

        console.log(board);

        function updateCell (td) {
            td.innerText = "";
        }

        function updateBoard (td,row,column) {
            board[row][column] = td.innerText;
        }


    }

    return {
        renderBoard
    }

}

function createBack() {

    const board = [];

    function createRandomArray () {
        
        for (let i=0; i < 3; i++) {
            board[i] = [];
            for (let j=0; j <3; j++) {
                board[i][j] = "O";
            }
        }
        console.log(board);
    }


    function getBoard () {
        return board;
    }

    return {
        createRandomArray,
        getBoard
    }

}


}

)();
