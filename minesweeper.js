class Minesweeper
{
  /**
     * numberOfBombs @returns integer
     * siaeOfSquares @returns integer
     * flags @returns array of integers
     * squares @returns array of squares.
     * isGameOver @returns boolean
     */
    static gameBoard = document.getElementById('gameBoard');
    static flagsRemain = document.getElementById('flagsRemain');
    static finalResult = document.getElementById('finalResult');
    static sizeOfSquares = 10;
    static numberOfBombs = 20
    static flags = 0;
    static squares = new Array();
    static isGameOver = false;


  //create Board
  static createGameUI() 
  {
    this.flagsRemain.innerHTML = this.numberOfBombs;

    //get shuffled game array with random bombs
    const bombsArray = Array(this.numberOfBombs).fill('bomb')
    const emptyArray = Array(this.sizeOfSquares * this.sizeOfSquares - this.numberOfBombs).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    for(let i = 0; i < this.numberOfBombs * this.numberOfBombs; i++) 
    {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      this.gameBoard.appendChild(square);
      this.squares.push(square);

      //normal click
      square.addEventListener('click', function(e) 
      {
        Minesweeper.revealed(square)
      });

      //cntrl and left click
      square.oncontextmenu = function(e) 
      {
        e.preventDefault();
        addFlag(square);
      }
    }

    //add numbers
    for (let i = 0; i < this.squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % this.sizeOfSquares === 0)
      const isRightEdge = (i % this.sizeOfSquares === this.sizeOfSquares -1)

      if (this.squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && this.squares[i -1].classList.contains('bomb')) total ++;
        if (i > 9 && !isRightEdge && this.squares[i +1 - this.sizeOfSquares].classList.contains('bomb')) total ++;
        if (i > 10 && this.squares[i - this.sizeOfSquares].classList.contains('bomb')) total ++;
        if (i > 11 && !isLeftEdge && this.squares[i -1 - this.sizeOfSquares].classList.contains('bomb')) total ++;
        if (i < 98 && !isRightEdge && this.squares[i +1].classList.contains('bomb')) total ++
        if (i < 90 && !isLeftEdge && this.squares[i -1 + this.sizeOfSquares].classList.contains('bomb')) total ++;
        if (i < 88 && !isRightEdge && this.squares[i +1 + this.sizeOfSquares].classList.contains('bomb')) total ++;
        if (i < 89 && this.squares[i + this.sizeOfSquares].classList.contains('bomb')) total ++;
        this.squares[i].setAttribute('data', total);
      }
    }
  }


  //click on square actions
static revealed(square) 
{
  let currentId = square.id
  if (this.isGameOver) return
  if (square.classList.contains('checked') || square.classList.contains('flag')) return
  if (square.classList.contains('bomb')) 
  {
    this.gameOver(square)
  } 
  else 
  {
    let total = square.getAttribute('data')
    if (total !=0) {
      square.classList.add('checked')
      if (total == 1) square.classList.add('one')
      if (total == 2) square.classList.add('two')
      if (total == 3) square.classList.add('three')
      if (total == 4) square.classList.add('four')
      square.innerHTML = total
      return
    }
    Minesweeper.checkSquare(currentId)
  }
  square.classList.add('checked')
}

  //check neighboring squares once square is clicked
  static checkSquare(currentId) 
  {
    const isLeftEdge = (currentId % this.sizeOfSquares === 0)
    const isRightEdge = (currentId % this.sizeOfSquares === this.sizeOfSquares - 1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) 
      {
        const newId = Minesweeper.squares[parseInt(currentId) -1].id
        //const newId = parseInt(currentId) - 1   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId > 9 && !isRightEdge) 
      {
        const newId =  this.squares[parseInt(currentId) +1 - this.sizeOfSquares].id
        //const newId = parseInt(currentId) +1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId > 10) 
      {
        const newId =  this.squares[parseInt(currentId -  this.sizeOfSquares)].id
        //const newId = parseInt(currentId) -width   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) 
      {
        const newId =  this.squares[parseInt(currentId) -1 - this.sizeOfSquares].id
        //const newId = parseInt(currentId) -1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId < 98 && !isRightEdge) 
      {
        const newId = this.squares[parseInt(currentId) + 1].id
        //const newId = parseInt(currentId) +1   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) 
      {
        const newId = this.squares[parseInt(currentId)  -1 + this.sizeOfSquares].id
        //const newId = parseInt(currentId) -1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId < 88 && !isRightEdge) 
      {
        const newId = this.squares[parseInt(currentId)  +1 + this.sizeOfSquares].id
        //const newId = parseInt(currentId) +1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
      if (currentId < 89) 
      {
        const newId = this.squares[parseInt(currentId)  + this.sizeOfSquares].id
        //const newId = parseInt(currentId) +width   ....refactor
        const newSquare = document.getElementById(newId)
        Minesweeper.revealed(newSquare)
      }
    }, 10)
  }
  //game over
  static gameOver() 
  {
    Minesweeper.finalResult.innerHTML = 'BOOM! Game Over!';
    Minesweeper.isGameOver = true;

    //show ALL the bombs
    this.squares.forEach(square => 
    {
      if (square.classList.contains('bomb')) 
      {
        square.innerHTML = '💣'
        square.classList.remove('bomb')
        square.classList.add('checked')
      }
    })
  }

  //check for win
  static checkForWin() 
  {
    let squares = this.squares;
    
    ///simplified win argument
    let matches = 0

    for (let i = 0; i < squares.length; i++) 
    {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) 
      {
        matches ++
      }
      if (matches === this.numberOfBombs) 
      {
        this.status.innerHTML = 'YOU WIN!'
        this.isGameOver = true
      }
    }
  }

  

}




Minesweeper.createGameUI();

 
