const width = 10
let blocks = []

const isGameOver = (i = 0, j = 0) => {
  if (i === blocks.length) return true
  if (j === blocks[i].length) return isGameOver(i + 1, 0)
  if (blocks[i][j].isEmpty()) return false
  return isGameOver(i, j + 1)
}

const getValue = (r, c) => {
  return blocks[r] && blocks[r][c] && blocks[r][c].getBomb() ? 1 : 0
}

function Block(i, j) {
  const d = document.createElement('div')
  d.className = 'block'
  let isBomb = false

  d.oncontextmenu = e => {
    if (d.className.includes('selected')) return
    d.className += ' flagged'
    e.preventDefault()
  }

  d.onclick = () => {
    if (d.className.includes('selected')) return
    d.className = 'block selected'
    if (isGameOver()) {
      if (confirm('You Win. Play Again?')) return startGame()
    }
    if (isBomb) {
      if (confirm('You Lose. Play Again?')) return startGame()
      return (d.innerHTML = 'B')
    }

    const dirs = [
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1],
      [i, j - 1],
      [i, j + 1],
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1]
    ]

    const val = dirs.reduce((acc, d) => acc + getValue(...d), 0)
    d.innerHTML = val || ''
    if (val) return

    dirs.forEach(([r, c]) => blocks[r] && blocks[r][c] && blocks[r][c].select())
  }
  document.body.appendChild(d)
  this.isEmpty = () => {
    return !(d.className.includes('selected') || isBomb)
  }
  this.setBomb = () => {
    isBomb = true
  }
  this.getBomb = () => {
    return isBomb
  }
  this.select = () => {
    return d.onclick()
  }
}

const startGame = () => {
  document.body.style.width = `${width * 50}px`
  document.body.innerHTML = ''
  blocks = []
  build()
  setBombs()
}

const build = (r = 0, c = 0, store = []) => {
  if (r === width) return
  if (store.length === width) {
    blocks.push(store)
    return build(r + 1, 0, [])
  }
  store.push(new Block(r, c))
  return build(r, c + 1, store)
}

const setBombs = (i = 0) => {
  if (i === width) return
  const r = Math.floor(Math.random() * width)
  const c = Math.floor(Math.random() * width)
  if (blocks[r][c].getBomb()) return setBombs(i)
  blocks[r][c].setBomb()
  return setBombs(i + 1)
}

startGame()
