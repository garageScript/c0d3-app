const checkLightsOff = (arr, i = 0, j = 0) => {
  if (j === Size) {
    Size = +prompt('You won! Play again with different size? 0 to stop playing')
    if (Size) {
      container.innerHTML = ''
      blocks = []
      startGame()
    }
    return true
  }
  if (i === Size) {
    return checkLightsOff(arr, 0, j + 1)
  }
  if (arr[j][i].isOn()) return false
  return checkLightsOff(arr, i + 1, j)
}

let blocks = []
let Size = 2

function Block(r, c) {
  let light = false
  const element = document.createElement('div')
  element.className = 'block'
  container.appendChild(element)
  element.onclick = () => {
    if (!light) return
    this.toggleLight()
    blocks[r + 1] && blocks[r + 1][c].toggleLight()
    blocks[r - 1] && blocks[r - 1][c].toggleLight()
    blocks[r][c + 1] && blocks[r][c + 1].toggleLight()
    blocks[r][c - 1] && blocks[r][c - 1].toggleLight()
    checkLightsOff(blocks)
  }
  this.isOn = () => {
    return light
  }

  this.toggleLight = () => {
    light = !light
    element.className = light ? 'block selected' : 'block'
  }
}

const build = (arr, i = 0, j = 0, tmp = []) => {
  if (j === Size) return
  if (i === Size) {
    arr.push(tmp)
    return build(arr, 0, j + 1, [])
  }
  tmp.push(new Block(j, i))
  return build(arr, i + 1, j, tmp)
}

const generateRandom = () => {
  return {
    x: Math.floor(Math.random() * Size),
    y: Math.floor(Math.random() * Size)
  }
}

const startGame = () => {
  container.style.width = `${Size * 50}px`
  build(blocks)

  const random = generateRandom()
  console.log('random', random)
  console.log(blocks)
  blocks[random.x][random.y].toggleLight()
}
startGame()
