let numberOfBombs = 0;
let numberOfFlags = 0;
let totalNumberOfCells = 0;
let allCells = new Array();
let gameLevel = "";
let isGameOver = false;
let numberOfCols = "";
let numberOfRows = "";
let adjacentFlag = 0;
let numberOfClicks = 0;
let difficulty = new Array([9,9], [16,16], [30,16]);
let finalResult = document.getElementById('finalResult');
let flagsRemain = document.getElementById('flagsRemain');


var firstClick = function(cell) {
  var executed = false;
  return function() {
      if (!executed) {
          executed = true;
          console.log(cell);
      }
  };
};

function hardLevel()
{
  while(gameBoard.hasChildNodes()) gameBoard.removeChild(gameBoard.firstChild);
  gameLevel = 'hard';
  finalResult.innerHTML = "";
  gameBoard.style.height = "420px";
  gameBoard.style.width = "720px";
  numberOfBombs = 99;
  flagsRemain.innerHTML = numberOfBombs;
  numberOfCols = difficulty[2][0];
  numberOfRows = difficulty[2][1];

  let gameArray = createMatrix(numberOfCols, numberOfRows);
  totalNumberOfCells = countNumberOfCells(gameArray);
  setGameBoard(totalNumberOfCells, numberOfBombs);
};

function easyLevel()
{
  while(gameBoard.hasChildNodes()) gameBoard.removeChild(gameBoard.firstChild);
  gameLevel = 'easy';
  finalResult.innerHTML = "";
  gameBoard.style.height = "230px";
  gameBoard.style.width = "230px";
  numberOfBombs = 10;
  flagsRemain.innerHTML = numberOfBombs;
  numberOfCols = difficulty[0][0];
  numberOfRows = difficulty[0][1];

  let gameArray = createMatrix(numberOfCols, numberOfRows);
  totalNumberOfCells = countNumberOfCells(gameArray);
  setGameBoard(totalNumberOfCells, numberOfBombs);
};

function mediumLevel()
{
  while(gameBoard.hasChildNodes()) gameBoard.removeChild(gameBoard.firstChild);
  gameLevel = 'medium';
  finalResult.innerHTML = "";
  gameBoard.style.height = "400px";
  gameBoard.style.width = "400px";
  numberOfBombs = 40;
  flagsRemain.innerHTML = numberOfBombs;
  numberOfCols = difficulty[1][0];
  numberOfRows = difficulty[1][1];

  let gameArray = createMatrix(numberOfCols, numberOfRows);
  totalNumberOfCells = countNumberOfCells(gameArray);
  setGameBoard(totalNumberOfCells, numberOfBombs);
};

function setDifficulty()
{
  const gameBoard = document.getElementById('gameBoard');
  var difficultyType = document.getElementById("difficulty");
  difficultyType = difficultyType.options[difficultyType.selectedIndex].text;

  console.log(difficultyType);
  if(difficultyType === 'Easy') easyLevel();
  if(difficultyType === 'Medium') mediumLevel();
  if(difficultyType === 'Hard') hardLevel(); 
} 

function setGameBoard( totalNumberOfCells, numberOfBombs)
{
  const arrayOfBombs = new Array(numberOfBombs).fill('bomb');
  const arrayOfTile = new Array(totalNumberOfCells - numberOfBombs).fill('empty');
  const totalArray = arrayOfBombs.concat(arrayOfTile);
  const mixedArray = totalArray.sort( () => Math.random() - 0.5 );

  for(let i=0; i<totalNumberOfCells; i++)
  {
    const cell = document.createElement('div');
    cell.setAttribute('id', i);
    cell.classList.add(mixedArray[i]);
    gameBoard.appendChild(cell);
    setActionEvents(cell);

    allCells.push(cell);
  }
  
  for (let i = 0; i < totalNumberOfCells; i++) 
  {
    let total = 0
    const isLeftEdge = (i % totalNumberOfCells === 0)
    const isRightEdge = (i % totalNumberOfCells === totalNumberOfCells -1)

    
    switch(gameLevel)
    {
      case "easy" :
        if (allCells[i].classList.contains('empty')) 
        {
          if (i > 0 && !isLeftEdge && allCells[i -1].classList.contains('bomb')) total ++
          if (i > 8 && !isRightEdge && allCells[i +1 - numberOfCols].classList.contains('bomb')) total ++
          if (i > 9 && allCells[i - numberOfCols].classList.contains('bomb')) total ++
          if (i > 10 && !isLeftEdge && allCells[i -1 - numberOfCols].classList.contains('bomb')) total ++
          if (i < 72 && !isLeftEdge && allCells[i -1 + numberOfCols].classList.contains('bomb')) total ++
          if (i < 79 && !isRightEdge && allCells[i +1].classList.contains('bomb')) total ++
          if (i < 70 && !isRightEdge && allCells[i +1 + numberOfCols].classList.contains('bomb')) total ++
          if (i < 71 && allCells[i + numberOfCols].classList.contains('bomb')) total ++
          allCells[i].setAttribute('data', total)
        }
        break;
      case "medium" :
        if (allCells[i].classList.contains('empty')) 
        {
          if (i > 0 && !isLeftEdge && allCells[i -1].classList.contains('bomb')) total ++
          if (i > 15 && !isRightEdge && allCells[i +1 - numberOfCols].classList.contains('bomb')) total ++
          if (i > 16 && allCells[i - numberOfCols].classList.contains('bomb')) total ++
          if (i > 17 && !isLeftEdge && allCells[i -1 - numberOfCols].classList.contains('bomb')) total ++
          if (i < 254 && !isLeftEdge && allCells[i -1].classList.contains('bomb')) total ++
          if (i < 240 && !isRightEdge && allCells[i +1].classList.contains('bomb')) total ++
          if (i < 238 && !isRightEdge && allCells[i +1 + numberOfCols].classList.contains('bomb')) total ++
          if (i < 239 && allCells[i + numberOfCols].classList.contains('bomb')) total ++
          allCells[i].setAttribute('data', total)
        }
        break;
      case "hard" :
        if (allCells[i].classList.contains('empty')) 
        {
          if (i > 0 && !isLeftEdge && allCells[i -1].classList.contains('bomb')) total ++
          if (i > 29 && !isRightEdge && allCells[i +1 - numberOfCols].classList.contains('bomb')) total ++
          if (i > 30 && allCells[i - numberOfCols].classList.contains('bomb')) total ++
          if (i > 31 && !isLeftEdge && allCells[i -1 - numberOfCols].classList.contains('bomb')) total ++
          if (i < 478 && !isRightEdge && allCells[i +1].classList.contains('bomb')) total ++
          if (i < 450 && !isLeftEdge && allCells[i -1 + numberOfCols].classList.contains('bomb')) total ++
          if (i < 448 && !isRightEdge && allCells[i +1 + numberOfCols].classList.contains('bomb')) total ++
          if (i < 449 && allCells[i + numberOfCols].classList.contains('bomb')) total ++
          allCells[i].setAttribute('data', total)
        }
        break
    }

   
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
  // This code is triggered when there is a left click
  cell.addEventListener('click', function() 
  {
    console.log(numberOfClicks);
    // Checks to see if first click contains a bomb.
    if(numberOfClicks === 0)
    {
      if(cell.classList.contains('bomb'))
      {
        cell.classList.add("revealed");
        for(let i=0; i<allCells.length; i++)
        {
          if(allCells[i].getAttribute('data') == 0)
          {
            allCells[i].classList.add('bomb');
            allCells[i].classList.remove('empty');
            allCells[i].removeAttribute('data');

            numberOfClicks++;
            break;
          }

        }
        cell.classList.remove("bomb");
      }
      return 1;
    }
    revealed(cell); 
    numberOfBombs++;
  });

  // This code is triggered when there is a right click
  cell.oncontextmenu = function(e) 
  {
    e.preventDefault();
   attachFlag(cell);
  }
  
}

// This function reveals a cell when triggered.
function revealed( cell ) 
{
  firstClick(cell);
  let cellId = cell.getAttribute("id");
  if (isGameOver) return 1;

  //This code is triggered when there is a middle click
  cell.onauxclick = function(e) 
  { 
    e.preventDefault(); 
    
    // Looping through each cell to reveal content.
    allCells.forEach( cell => 
    {
      // Check to see if the revealed cell has a number greater than 0.
      if(cell.classList.contains('revealed') &&  cell.getAttribute("data") > 0 )
      {
        // Trying to get surrounding adjacent cells (Diagonal, Horizontal, Vertical). 
        if( cell.getAttribute('data') == getAdjacentCells(cell.getAttribute('id')) )
        {
          //Looping through all cells if condition is met
          allCells.forEach( cell => 
          {
            // Check to see if cell is not empty and is not flagged
            if( !(cell.classList.contains('empty') && cell.classList.contains('flag')) )
            {
              /**
               * Check to see if each cell has a data attribute greater than 0
               * If data attribute is greater than 0 then the cell is empty. Don't append the data value to the innerHtml.
               * Reveal the cells.
               */
              if(cell.getAttribute('data') > 0 )
              {
                cell.innerHTML = cell.getAttribute('data');
                cell.classList.add('revealed'); 
              }
            } 
          });
        }    
      }
    });
  }
  
  // Check to see if the cell is flagged
  if(cell.classList.contains('flag'))
  {
    // Prevent Left clicking.
    cell.setAttribute('onClick', 'return false');
    return 1;
  }

  // Check to see if the revealed cell contains a bomb.
  if(cell.classList.contains('bomb'))
  {
    // End Game.
    return gameOver();
  }
  else
  {
    // Cells data value is equal to number of bombs surrounding it.
    let totalSurrondingBombs = cell.getAttribute('data');
    if (totalSurrondingBombs != 0) 
    {
      // Cell is no more empty. Reveal cell and append it's data value to the innerHtml.
      cell.classList.remove('empty');
      cell.classList.add('revealed')
      cell.innerHTML = totalSurrondingBombs;
      return
    }
  }
  // If check is revealed or flagged do nothing.
  if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return 1 ;
  checkAdjacentCell(cellId);

  //cell.classList.remove('empty');
  cell.classList.add('revealed');
}

// This function attaches flags to a cell
function attachFlag( cell ) 
{
  if (isGameOver) return 1
  /**
   * check to see if cell is not revealed and flag used is less that the number of bombs
   * Total flag used must be equal to the number of bombs
   */
  if (!cell.classList.contains('revealed') && (numberOfFlags < numberOfBombs) ) 
  {
    // check to see if cell is not flagged
    if(!cell.classList.contains('flag'))
    {
      // Flag cell
      cell.classList.add('flag');
      cell.innerHTML = ' 🚩';

      // Increment number of flags used and append remaining flag to the cells innerHtml
      numberOfFlags++;
      flagsRemain.innerHTML = numberOfBombs - numberOfFlags ;
      //Minesweeper.checkForWin();
    }
    else
    {
      // Cell is flagged decrease the number of cell used and append remove flag from cell.
      cell.classList.remove('flag');
      cell.innerHTML = '';
      numberOfFlags--;
      flagsRemain.innerHTML = numberOfBombs - numberOfFlags;
    }  
  }  
}

// This function get the adjacent flagged cells of a cell.
function getAdjacentCells(cellId)
{
  //NB. This code needs to be looked at. there is an error in here.
  if(allCells[parseInt(cellId) - 1].classList.contains('flag')) adjacentFlag++; 
  if(allCells[parseInt(cellId) + 1].classList.contains('flag')) adjacentFlag++;
  if(allCells[parseInt(cellId) - numberOfCols].classList.contains('flag')) adjacentFlag++;
  if(allCells[parseInt(cellId) + numberOfCols].classList.contains('flag')) adjacentFlag++;
  if(allCells[parseInt(cellId-1) - numberOfCols].classList.contains('flag')) adjacentFlag++;
  if(allCells[parseInt(cellId-1) + numberOfCols].classList.contains('flag')) adjacentFlag++;
  if(allCells[parseInt(cellId) + (numberOfCols+1)].classList.contains('flag')) adjacentFlag++;
  if(allCells[(parseInt(cellId) - numberOfCols) +1].classList.contains('flag')) adjacentFlag++;
  return adjacentFlag;
}


// This function checks adjacent cells and reveals reveals adjacent cells when a cell is empty
function checkAdjacentCell(currentId) 
{
  const isLeftEdge = (currentId % numberOfCols === 0)
  const isRightEdge = (currentId % numberOfCols === numberOfCols -1)

  if(gameLevel == 'easy')
  {
    setTimeout(() => 
    {
      if (currentId > 0 && !isLeftEdge) 
      {
        const cellId = allCells[parseInt(currentId) -1].id;
        const cell = document.getElementById(cellId);
        revealed(cell);
      }
      if (currentId > 8 && !isRightEdge) 
      {
        const cellId = allCells[parseInt(currentId) +1 -numberOfCols].id
        const cell = document.getElementById(cellId)
        revealed(cell)
      }
      if (currentId > 9) 
      {
        const cellId = allCells[parseInt(currentId -numberOfCols)].id
        const cell = document.getElementById(cellId)
        revealed(cell)
      }
      if (currentId > 10 && !isLeftEdge) 
      {
        const cellId = allCells[parseInt(currentId) -1 -numberOfCols].id
        const cell = document.getElementById(cellId)
        revealed(cell)
      }
      if (currentId < 72 && !isRightEdge) 
      {
        const cellId = allCells[parseInt(currentId) +1].id
        const cell = document.getElementById(cellId)
        revealed(cell)
      }
      if (currentId < 79 && !isLeftEdge) 
      {
        const cellId = allCells[parseInt(currentId) -1 +numberOfCols].id
        const cell = document.getElementById(cellId)
        revealed(cell)
      }
      if (currentId < 70  && !isRightEdge) 
      {
        const cellId = allCells[parseInt(currentId) +1 +numberOfCols].id
        const cell = document.getElementById(cellId)
        revealed(cell)
      }
      if (currentId < 71) 
      {
        const cellId = allCells[parseInt(currentId) +numberOfCols].id
        const cell = document.getElementById(cellId);
        revealed(cell);
      }
    }, 10);
  }

  if(gameLevel == 'medium')
  {
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = allCells[parseInt(currentId) -1].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId > (numberOfCols-1) && !isRightEdge) {
        const newId = allCells[parseInt(currentId) +1 -numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId > numberOfCols) {
        const newId = allCells[parseInt(currentId -numberOfCols)].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId > (numberOfCols+1) && !isLeftEdge) {
        const newId = allCells[parseInt(currentId) -1 -numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
        if (currentId < (totalNumberOfCells-2) && !isRightEdge) {
          const newId = allCells[parseInt(currentId) +1].id
          const newSquare = document.getElementById(newId)
          revealed(newSquare)
        }
        if (currentId < (totalNumberOfCells-numberOfCols) && !isLeftEdge) {
          const newId = allCells[parseInt(currentId) -1 +numberOfCols].id
          const newSquare = document.getElementById(newId)
          revealed(newSquare)
        }
        if (currentId < (totalNumberOfCells-(numberOfCols+2)) && !isRightEdge) {
          const newId = allCells[parseInt(currentId) +1 +numberOfCols].id
          const newSquare = document.getElementById(newId)
          revealed(newSquare)
        }
        if (currentId < (totalNumberOfCells-(numberOfCols+1))) {
          const newId = allCells[parseInt(currentId) +numberOfCols].id
          const newSquare = document.getElementById(newId)
          revealed(newSquare)
        }
      }, 10)

  }

  if(gameLevel == 'hard')
  {
    setTimeout(() => 
    {
      if (currentId > 0 && !isLeftEdge) 
      {
        const newId = allCells[parseInt(currentId) -1].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId > (numberOfCols-1) && !isRightEdge) 
      {
        const newId = allCells[parseInt(currentId) +1 -numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId > numberOfCols) 
      {
        const newId = allCells[parseInt(currentId -numberOfCols)].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId > (numberOfCols+1) && !isLeftEdge) 
      {
        const newId = allCells[parseInt(currentId) -1 -numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }     
      if (currentId < (totalNumberOfCells-2) && !isRightEdge) 
      {
        const newId = allCells[parseInt(currentId) +1].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId < (totalNumberOfCells-numberOfCols) && !isLeftEdge) 
      {
        const newId = allCells[parseInt(currentId) -1 +numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId < (totalNumberOfCells-(numberOfCols+2)) && !isRightEdge) 
      {
        const newId = allCells[parseInt(currentId) +1 +numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
      if (currentId < (totalNumberOfCells-(numberOfCols+1))) 
      {
        const newId = allCells[parseInt(currentId) +numberOfCols].id
        const newSquare = document.getElementById(newId)
        revealed(newSquare)
      }
    }, 10)
  } 
}

  //check neighboring squares once square is clicked
// function checkSquare(currentId) 
// {
  // const isLeftEdge = (currentId % sizeOfCell === 0)
  // const isRightEdge = (currentId % sizeOfCell === sizeOfCell - 1)

  // setTimeout(() => {
  //   if (currentId > 0 && !isLeftEdge) 
  //   {
  //     const newId = allCells[parseInt(currentId) -1].id
  //     //const newId = parseInt(currentId) - 1   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId > 9 && !isRightEdge) 
  //   {
  //     const newId =  allCells[parseInt(currentId) +1 - sizeOfCell].id
  //     //const newId = parseInt(currentId) +1 -width   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId > 10) 
  //   {
  //     const newId =  allCells[parseInt(currentId - sizeOfCell)].id
  //     //const newId = parseInt(currentId) -width   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId > 11 && !isLeftEdge) 
  //   {
  //     const newId =  allCells[parseInt(currentId) -1 - sizeOfCell].id
  //     //const newId = parseInt(currentId) -1 -width   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId < 98 && !isRightEdge) 
  //   {
  //     const newId = allCells[parseInt(currentId) + 1].id
  //     //const newId = parseInt(currentId) +1   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId < 90 && !isLeftEdge) 
  //   {
  //     const newId = allCells[parseInt(currentId)  -1 + sizeOfCell].id
  //     //const newId = parseInt(currentId) -1 +width   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId < 88 && !isRightEdge) 
  //   {
  //     const newId = allCells[parseInt(currentId) +1 + sizeOfCell].id
  //     //const newId = parseInt(currentId) +1 +width   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  //   if (currentId < 89) 
  //   {
  //     const newId = allCells[parseInt(currentId)  + sizeOfCell].id
  //     //const newId = parseInt(currentId) +width   ....refactor
  //     const newSquare = document.getElementById(newId)
  //     revealed(newSquare)
  //   }
  // }, 10)
// }

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
      cell.classList.add('revealed');
    }
  });
  finalResult.innerHTML = "You lost. You are not a <b>VIKING</b>. GAME OVER !"; 
  isGameOver = true; 
  return 1;
}









class Minesweeper
{
  static finalResult = document.getElementById('finalResult');
 
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







//    //add Flag with right click


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

 
