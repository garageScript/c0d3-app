const blockSize = 30
const height = 10
const width = 30
board.style.height = `${height * blockSize}px`
board.style.width = `${width * blockSize}px`

function Block() {
  this.getNextPos = dir => {
    switch (dir) {
      case 0: // Left
        return { top: this.top, left: this.left - 1 }
      case 1: // Up
        return { top: this.top - 1, left: this.left }
      case 2: // Right
        return { top: this.top, left: this.left + 1 }
      case 3: // Down
        return { top: this.top + 1, left: this.left }
      default:
        return { top: this.top, left: this.left }
    }
  }
  this.setPos = (top, left) => {
    this.top = top
    this.left = left
    element.style.top = `${this.top * blockSize}px`
    element.style.left = `${this.left * blockSize}px`
    element.style.height = `${blockSize}px`
    element.style.width = `${blockSize}px`
  }
  const element = document.createElement('div')
  element.classList.add('block')
  board.appendChild(element)
  this.setPos(
    Math.floor(Math.random() * height),
    Math.floor(Math.random() * width)
  )
}

const snake = {
  head: new Block(),
  direction: 0,
  move: () => {
    let pos = snake.head.getNextPos(snake.direction)
    if (pos.top === food.top && pos.left === food.left) {
      food.next = snake.head
      snake.head.previous = food
      snake.head = food
      food = new Block()
      return
    }
    updateGame(pos) // Check to see if out of bounds
    snake.tail.setPos(pos.top, pos.left)
    if (snake.head === snake.tail) return

    // Set up new tail
    const tmp = snake.tail
    snake.tail = tmp.previous
    snake.tail.next = null // Tail next is always null

    // Setup new head
    tmp.previous = null // Head never have previous
    tmp.next = snake.head
    snake.head.previous = tmp
    snake.head = tmp
  }
}
snake.tail = snake.head // head and tail both start at the same place

let shouldContinue = true
const checkSnakeNode = (pos, node) => {
  if (!node) return false
  if (pos.top === node.top && pos.left === node.left) return true
  return checkSnakeNode(pos, node.next)
}

const updateGame = pos => {
  if (
    pos.top < 0 ||
    pos.top >= height ||
    pos.left < 0 ||
    pos.left >= width ||
    checkSnakeNode(pos, snake.head)
  ) {
    shouldContinue = false
  }
}

const move = () => {
  if (!shouldContinue) {
    return alert('Game over. Please refresh the page to continue')
  }
  snake.move()
  setTimeout(move, 500)
}
setTimeout(move, 1000)

let food = new Block()

document.onkeyup = e => {
  if (e.keyCode > 36 && e.keyCode < 41) {
    snake.direction = e.keyCode - 37
  }
}
