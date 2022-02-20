let gameArray = '';
let numberOfBombs = 0;
let numberedCells = 0;
let isGameOver = false;
let finalResult = document.getElementById('finalResult');

function setDifficulty()
{
  const gameBoard = document.getElementById('gameBoard');
  const easy = document.getElementById('btn1');
  const medium = document.getElementById('btn2');
  const hard = document.getElementById('btn3');
  let numberOfCols = "";
  let numberOfRows = "";

  easy.addEventListener('click', function()
  {
    while(gameBoard.hasChildNodes()) gameBoard.removeChild(gameBoard.firstChild);
    finalResult.innerHTML = "";
    gameBoard.style.height = "230px";
    gameBoard.style.width = "230px";
    numberOfBombs = 10;
    numberedCells = numberOfBombs + numberOfBombs ;
    numberOfCols = Minesweeper.difficulty[0][0];
    numberOfRows = Minesweeper.difficulty[0][1];

    gameArray = createMatrix(numberOfCols, numberOfRows);
    let totalNumberOfCells = countNumberOfCells(gameArray);
    setGameBoard(totalNumberOfCells, numberOfBombs, numberedCells);
  });

  medium.addEventListener('click', function()
  {
    while(gameBoard.hasChildNodes()) gameBoard.removeChild(gameBoard.firstChild);
    finalResult.innerHTML = "";
    gameBoard.style.height = "400px";
    gameBoard.style.width = "400px";
    numberOfBombs = 40;
    numberedCells = numberOfBombs + numberOfBombs ;
    numberOfCols = Minesweeper.difficulty[1][0];
    numberOfRows = Minesweeper.difficulty[1][1];

    gameArray = createMatrix(numberOfCols, numberOfRows);
    let totalNumberOfCells = countNumberOfCells(gameArray);
    setGameBoard(totalNumberOfCells, numberOfBombs, numberedCells);
  });

  hard.addEventListener('click', function()
  {
    while(gameBoard.hasChildNodes()) gameBoard.removeChild(gameBoard.firstChild);
    finalResult.innerHTML = "";
    gameBoard.style.height = "420px";
    gameBoard.style.width = "720px";
    numberOfBombs = 99;
    numberedCells = numberOfBombs + numberOfBombs ;
    numberOfCols = Minesweeper.difficulty[2][0];
    numberOfRows = Minesweeper.difficulty[2][1];

    gameArray = createMatrix(numberOfCols, numberOfRows);
    let totalNumberOfCells = countNumberOfCells(gameArray);
    setGameBoard(totalNumberOfCells, numberOfBombs, numberedCells);
  });
   
} 

function setGameBoard( totalNumberOfCells, numberOfBombs, numberedCells )
{
  const arrayOfBombs = new Array(numberOfBombs).fill('bomb');
  const arrayOfNumbers = new Array(numberedCells).fill('num');
  const arrayOfTile = new Array(totalNumberOfCells - numberOfBombs - numberedCells).fill('empty');
  const totalArray = arrayOfBombs.concat(arrayOfTile).concat(arrayOfNumbers);
  const mixedArray = totalArray.sort( () => Math.random() - 0.5 );

  for(let i=0; i<totalNumberOfCells; i++)
  {
    const cell = document.createElement('div');
    cell.setAttribute('id', i);
    cell.classList.add(mixedArray[i],'cell');

    if(mixedArray[i] == 'num') cell.setAttribute('data', (Math.floor(Math.random() * 3) + 1) );
    gameBoard.appendChild(cell);
    setActionEvents(cell);
  }
  
}

function createMatrix(cols, rows)
{
  if(cols == 0 || rows == 0 ) return "Colums or Rows can't be 0";
  let colArr = new Array(cols);
  for(let i=0; i<colArr.length; i++)
  {
    colArr[i] = new Array(rows);
  }
  return colArr;
}

function countNumberOfCells(gameArray)
{
  let totalNumberOfCells = 0;
  for(let i=0; i<gameArray.length; i++)
  {
    for(let j=0; j<gameArray[i].length; j++) totalNumberOfCells++;
  }
  return totalNumberOfCells;
}

function setActionEvents( cell )
{
  cell.addEventListener('click', function() 
  {
    revealed(cell); 
  });

  cell.oncontextmenu = function(e) 
  {
    e.preventDefault();
    // Minesweeper.addFlag(square);
    alert('programming');
  }
}

function revealed( cell ) 
{
  cell.classList.add('revealed');
  if(cell.classList.contains('bomb')) gameOver();

  // if (isGameOver) return 1;
  // if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return 1 
  // else 
  // {
  //   let total = cell.getAttribute('data')
  //   console.log(total)
  //   if (total != 0) 
  //   {
  //     cell.classList.add('checked')
  //     if (total == 1) cell.classList.add('one')
  //     if (total == 2) cell.classList.add('two')
  //     if (total == 3) cell.classList.add('three')
  //     if (total == 4) cell.classList.add('four')
  //     cell.innerHTML = total
  //     return
  //   }
  //   Minesweeper.checkSquare(cell.id);
  //}
  // // square.classList.add('checked')
}

  //game over
  function gameOver() 
  {
    let finalResult = document.getElementById('finalResult');
    let cells = gameBoard.childNodes;
    cells.forEach( (cell) => 
    {
      if (cell.classList.contains('bomb')) 
      {
        cell.innerHTML = '💣';
        cell.classList.remove('bomb');
        cell.classList.add('checked');
      }
    });
    finalResult.innerHTML = "You lost. You are not a <b>VIKING</b>. GAME OVER !"; 
    isGameOver = true; 
  }









class Minesweeper
{
  static finalResult = document.getElementById('finalResult');
  static difficulty = new Array([9,9], [16,16], [30,16]);
  static numberOfBombs = 20
  static flags = 0;
  static squares = new Array();
  static isGameOver = false;


 

  

  // The begining of the game
  static createGameUI() 
  {
    setDifficulty();
    
    // document.getElementById('flagsRemain').innerHTML = this.numberOfBombs;
    // const numberOfCells = Minesweeper.countNumberOfCells( Minesweeper.createMatrix(31,9));

    // // Creating an empty array with the length equals to the number of bombs ie. 20
    // const arrayOfBombs = Array(this.numberOfBombs).fill('bomb')
    // const cellsWithoutBombs = numberOfCells - this.numberOfBombs;
    
    // // Creating an empty array with the length equals to  the
    // const arrayOfCellsWithouBombs = Array(cellsWithoutBombs).fill('valid')
    // const allCells = arrayOfCellsWithouBombs.concat(arrayOfBombs)
    // const shuffledArray = allCells.sort(() => Math.random() -0.5)
    
    // for(let i = 0; i < numberOfCols*numberOfRows; i++) 
    // {
    //   console.log(i);
    //   const square = document.createElement('div');
    //   square.setAttribute('id', i);
    //   square.classList.add(shuffledArray[i]);
    //   document.getElementById('gameBoard').appendChild(square);
    //   this.squares.push(square);

    //   //normal click
    //   square.addEventListener('click', function(e) 
    //   {
    //     Minesweeper.revealed(square)
    //   });

    //   //cntrl and left click
    //   square.oncontextmenu = function(e) 
    //   {
    //     e.preventDefault();
    //     Minesweeper.addFlag(square);
    //   }
    // }
    // console.log(this.squares);
    // //add numbers
    // for (let i = 0; i < this.squares.length; i++) {
    //   let total = 0
    //   const isLeftEdge = (i % this.sizeOfSquares === 0)
    //   const isRightEdge = (i % this.sizeOfSquares === this.sizeOfSquares -1)

    //   if (this.squares[i].classList.contains('valid')) {
    //     if (i > 0 && !isLeftEdge && this.squares[i -1].classList.contains('bomb')) total ++;
    //     if (i > 9 && !isRightEdge && this.squares[i +1 - this.sizeOfSquares].classList.contains('bomb')) total ++;
    //     if (i > 10 && this.squares[i - this.sizeOfSquares].classList.contains('bomb')) total ++;
    //     if (i > 11 && !isLeftEdge && this.squares[i -1 - this.sizeOfSquares].classList.contains('bomb')) total ++;
    //     if (i < 98 && !isRightEdge && this.squares[i +1].classList.contains('bomb')) total ++
    //     if (i < 90 && !isLeftEdge && this.squares[i -1 + this.sizeOfSquares].classList.contains('bomb')) total ++;
    //     if (i < 88 && !isRightEdge && this.squares[i +1 + this.sizeOfSquares].classList.contains('bomb')) total ++;
    //     if (i < 89 && this.squares[i + this.sizeOfSquares].classList.contains('bomb')) total ++;
    //     this.squares[i].setAttribute('data', total);
    //   }
    // }
  }





//   //check neighboring squares once square is clicked
//   static checkSquare(currentId) 
//   {
//     const isLeftEdge = (currentId % this.sizeOfSquares === 0)
//     const isRightEdge = (currentId % this.sizeOfSquares === this.sizeOfSquares - 1)

//     setTimeout(() => {
//       if (currentId > 0 && !isLeftEdge) 
//       {
//         const newId = Minesweeper.squares[parseInt(currentId) -1].id
//         //const newId = parseInt(currentId) - 1   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId > 9 && !isRightEdge) 
//       {
//         const newId =  this.squares[parseInt(currentId) +1 - this.sizeOfSquares].id
//         //const newId = parseInt(currentId) +1 -width   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId > 10) 
//       {
//         const newId =  this.squares[parseInt(currentId -  this.sizeOfSquares)].id
//         //const newId = parseInt(currentId) -width   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId > 11 && !isLeftEdge) 
//       {
//         const newId =  this.squares[parseInt(currentId) -1 - this.sizeOfSquares].id
//         //const newId = parseInt(currentId) -1 -width   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId < 98 && !isRightEdge) 
//       {
//         const newId = this.squares[parseInt(currentId) + 1].id
//         //const newId = parseInt(currentId) +1   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId < 90 && !isLeftEdge) 
//       {
//         const newId = this.squares[parseInt(currentId)  -1 + this.sizeOfSquares].id
//         //const newId = parseInt(currentId) -1 +width   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId < 88 && !isRightEdge) 
//       {
//         const newId = this.squares[parseInt(currentId)  +1 + this.sizeOfSquares].id
//         //const newId = parseInt(currentId) +1 +width   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//       if (currentId < 89) 
//       {
//         const newId = this.squares[parseInt(currentId)  + this.sizeOfSquares].id
//         //const newId = parseInt(currentId) +width   ....refactor
//         const newSquare = document.getElementById(newId)
//         Minesweeper.revealed(newSquare)
//       }
//     }, 10)
//   }

//    //add Flag with right click
//   static addFlag(square) 
//   {
//     if (this.isGameOver) return
//     if (!square.classList.contains('checked') && (this.flags < this.numberOfBombs)) 
//     {
//       if (!square.classList.contains('flag')) 
//       {
//         square.classList.add('flag');
//         square.innerHTML = ' 🚩';
//         this.flags ++;
//         document.getElementById('flagsRemain').innerHTML = this.numberOfBombs- this.flags;
//         Minesweeper.checkForWin();
//       } 
//       else 
//       {
//         square.classList.remove('flag');
//         square.innerHTML = '';
//         this.flags--;
//         this.flagsLeft.innerHTML = this.numberOfBombs- this.flags;
//       }
//     }
//   }

//   //game over
//   static gameOver() 
//   {
//     Minesweeper.finalResult.innerHTML = 'BOOM! Game Over!';
//     Minesweeper.isGameOver = true;

//     //show ALL the bombs
//     this.squares.forEach(square => 
//     {
//       if (square.classList.contains('bomb')) 
//       {
//         square.innerHTML = '💣'
//         square.classList.remove('bomb')
//         square.classList.add('checked')
//       }
//     })
//   }

//   //check for win
//   static checkForWin() 
//   {
//     let squares = this.squares;

//     ///simplified win argument
//     let matches = 0

//     for (let i = 0; i < squares.length; i++) 
//     {
//       if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) 
//       {
//         matches ++
//       }
//       if (matches === this.numberOfBombs) 
//       {
//         this.status.innerHTML = 'YOU WIN!'
//         this.isGameOver = true
//       }
//     }
//   }
// }




}



//console.log( countNumberOfCells( createMatrix(9,9)));
Minesweeper.createGameUI();

 
