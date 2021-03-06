const { Engine, Render, Runner, World, Bodies } = Matter

const width = 600
const height = 600
const cells = 3

const engine = Engine.create()
const { world } = engine
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
})
Render.run(render)
Runner.run(Runner.create(), engine)

//Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
]

World.add(world, walls)

const grid = new Array(cells).fill([]).map(() => new Array(cells).fill(false))

const verticals = new Array(cells)
  .fill(null)
  .map(() => new Array(cells - 1).fill(false))

const horizontals = new Array(cells - 1)
  .fill(null)
  .map(() => new Array(cells).fill(false))

const startRow = Math.floor(Math.random() * cells)
const startColumn = Math.floor(Math.random() * cells)

const stepThroughCell = (row, column) => {
  if (grid[row][column]) return
  grid[row][column] = true
}

stepThroughCell(startRow, startColumn)
console.log(grid)
