
var time = 0;
var numberOfMines = 10;
var numberOfClicks = 0;
var gameover = false;

function buildGrid(columns, rows) {
  // Fetch grid and clear out old elements.
  var grid = document.getElementById("minefield");
  grid.innerHTML = "";

  // Build DOM Grid
  var tile;
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < columns; x++) {
      tile = createTile(x, y);
      grid.appendChild(tile);
    }
  }



  var style = window.getComputedStyle(tile);

  var width = parseInt(style.width.slice(0, -2));
  var height = parseInt(style.height.slice(0, -2));

  grid.style.width = (columns * width) + "px";
  grid.style.height = (rows * height) + "px";
}

function createTile(x, y) {
  var tile = document.createElement("div");

  tile.classList.add("tile");
  tile.classList.add("hidden");

  tile.addEventListener("auxclick", function (e) { e.preventDefault(); }); // Middle Click
  tile.addEventListener("contextmenu", function (e) { e.preventDefault(); }); // Right Click
  tile.addEventListener("mouseup", handleTileClick); // All Clicks
  tile.addEventListener("mousedown", addSmileyLimbo);

  return tile;
}



function startGame() {
  document.getElementById("flagCount").innerHTML = numberOfMines;
  buildGrid(9, 9);
  setMineTile();
  startTimer();
}

function smileyDown() {
  var smiley = document.getElementById("smiley");
  smiley.classList.add("face_down");
}

function smileyUp() {
  var smiley = document.getElementById("smiley");
  smiley.classList.remove("face_down");
}


function addSmileyLimbo()
{
  var smiley = document.getElementById("smiley");
  smiley.classList.add("face_limbo");
}

function removeSmileyLimbo()
{
  var smiley = document.getElementById("smiley");
  smiley.classList.remove("face_limbo");
}

function handleTileClick(event) {
  var flagUsed = 0;
  var tile = event.srcElement;
  var flagCount = document.getElementById("flagCount");


  // Left Click
  if (event.which === 1) {
    //TODO reveal the tile
    removeSmileyLimbo();
    revealTile(tile);
   
  }
  // Middle Click
  else if (event.which === 2) {
    //TODO try to reveal adjacent
    removeSmileyLimbo();
    if (tile.classList.contains("clear")) {

    }


  }
  // Right Click
  else if (event.which === 3) {
    //TODO toggle a tile flag
    removeSmileyLimbo();
    if (!tile.classList.contains("clear") ) {
      if (tile.classList.contains("flag")) {
        tile.classList.remove("flag");
        flagCount.innerHTML++;
      }
      else {
        if (flagUsed < flagCount.innerHTML) {
          tile.classList.add("flag");
          flagUsed++;
          flagCount.innerHTML = flagCount.innerHTML - flagUsed;
        }
        win();
      }
    }
  }
}

function setDifficulty() {
  var flagCount = document.getElementById("flagCount");
  var difficultySelector = document.getElementById("difficulty");
  var difficulty = difficultySelector.selectedIndex;

  //TODO implement me
  if (difficulty == 0) {
    flagCount.innerHTML = numberOfMines = 10;
    buildGrid(9, 9);
    setMineTile();
  }
  if (difficulty == 1) {
    flagCount.innerHTML = numberOfMines = 40;
    buildGrid(16, 16);
    setMineTile();
  }
  if (difficulty == 2) {
    flagCount.innerHTML = numberOfMines = 99;
    buildGrid(30, 16);
    setMineTile();
  }

}

function startTimer() {
  timeValue = 0;
  window.setInterval(onTimerTick, 1000);
}

function onTimerTick() {
  timeValue++;
  updateTimer();
}

function updateTimer() {
  document.getElementById("timer").innerHTML = timeValue;
}


function revealTile(tile)
{
  if(gameover) return 1;
  var gameBoard = document.getElementById("minefield").children;
  if (!tile.classList.contains("flag")) {
    if (!tile.classList.contains("clear")) {

      // check number of clicks.
      if(numberOfClicks == 0 && tile.getAttribute("data"))
      {
        tile.removeAttribute("data");
        tile.classList.remove("hidden");
        tile.classList.add("clear");
        // Loop through tile and make the first non-mine tile a mine tile. 
        for(let tile of gameBoard)
        {
          if(!tile.getAttribute("data"))
          {
            tile.setAttribute("data", "mine");
            break;
          } 
        }
        numberOfClicks++;
      }
      else if(numberOfClicks > 0 && tile.getAttribute("data"))
      {
        tile.classList.add("mine_hit");
        // Reveal all mine tile if tile revealed is a mine.
        for(let tile of gameBoard)
        {
          if(tile.getAttribute("data")) 
          {
            tile.classList.remove("hidden");
            tile.classList.add("mine");
          }
        }
        gameOver();
      }
      else 
      {
        tile.classList.remove("hidden");
        tile.classList.add("clear");
        numberOfClicks++;
      }
    }
  }
}

function setMineTile() {
  var gameBoard = document.getElementById("minefield").children;
  var totalMine = 0;

  for (let x of gameBoard) {
    let board = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    board.setAttribute("data", "mine");
    totalMine++
    if (totalMine == numberOfMines) break;
  }
}

function win()
{
  var finalMessage = document.getElementById("finalResult");
  var gameBoard = document.getElementById("minefield").children;
  var smiley = document.getElementById("smiley");
  var countMine = 0;
 
  for(let tile of gameBoard)
  {
    if(tile.classList.contains("flag") && tile.getAttribute("data")) countMine++;
    console.log(countMine);
    if(countMine == numberOfMines)
    {
      smiley.classList.add("face_win");
      finalMessage.removeAttribute("hidden");
      finalMessage.innerHTML = "Congratulations You Won. You score is "+timeValue+". Refresh your browser to play another level";
    }
  }

}

function gameOver()
{
  gameover = true;
  var finalMessage = document.getElementById("finalResult");
  var smiley = document.getElementById("smiley");
  smiley.classList.add("face_lose");
  finalMessage.removeAttribute("hidden");
  finalMessage.innerHTML = "Sorry your lost. You score is "+timeValue+". GAME OVER!. Refresh your browser to play another level";
}