const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
//const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const countWinners = document.getElementById('counter')
let scoreElement = document.getElementById("score");


let circleTurn;
xWon = 0;
oWon = 0;
startGame()



//restartButton.addEventListener('click', startGame)

function newGame (){
 
  xWon = 0;
  oWon = 0;
  startGame();
}


function startGame() {
  
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  console.log(xWon + "  o: " + oWon);
  setBoardHoverClass();
  showScores();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  

  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function showScores() {
  //let percentage = Math.round((score / questions.length) *100);
  
  let scoreHTML =
      `
  <div class="score">
    <h2 id='score'> X score: ${xWon}</h2>
    <h2 class=>  O score: ${oWon} </h2>
  </div>
  `;
  scoreElement.innerHTML = scoreHTML;
};

function endGame(draw) {
 
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's"  : "X's"} Wins!`;
    if(circleTurn)
      oWon++;
    else xWon++;
    console.log(xWon + "..  o: " + oWon)
    //countWinners.textContent = xwins;
    //countWinners.innerText = `${xwins } !`;
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      if(cellElements[index].classList.contains(currentClass)){
       //cellElements[index].style.backgroundColor = "#08D9D6";
        //boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
        return true;
      }
      //return cellElements[index].classList.contains(currentClass)
    })
  })
}