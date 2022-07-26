const board = document.querySelector('.board')
const squares = document.querySelectorAll('.square')
const winnerText = document.querySelector('.winner-text')
const winnerMessage = document.querySelector('.winner-message')
const restartBtn = document.querySelector('.restart-btn')

const X_CLASS = "x"
const O_CLASS = "o"
const WINNING = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let xTurn = true

startGame()

function startGame() {
    squares.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHoverClass()
    winnerMessage.style.display = "none"
}

function handleClick(e) {
    const cell = e.target
    const currentClass = xTurn ? X_CLASS : O_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    xTurn = !xTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(xTurn) {
        board.classList.add(X_CLASS)
    } else {
        board.classList.add(O_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING.some(combination => {
        return combination.every(index => {
            return squares[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winnerText.innerText = "DRAW!"
    } else {
        winnerText.innerText = `${xTurn ? "Crosses Wins!" : "Circles Wins!"}`
    }
    winnerMessage.style.display = "flex"
}

function isDraw() {
    return [...squares].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

restartBtn.addEventListener('click', startGame)