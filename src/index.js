import Maze from './Maze.js'

let maze
let animated

const cellSize = 20
let COLS, ROWS
let WIDTH, HEIGHT

const initVariables = function (p5) {
	COLS = Math.trunc(p5.windowWidth * 0.9 / cellSize) - 1
	ROWS = Math.trunc(p5.windowHeight * 0.9 / cellSize) - 1
	WIDTH = COLS * cellSize
	HEIGHT = ROWS * cellSize 
}

const createForm = function (p5) {
	const div = p5.createDiv()
	div.id("form")
	div.style('font-size', '30px')


	animated = p5.createCheckbox("Animated", true)
	animated.changed(() => {
		maze.animated = animated.checked()
	})
	animated.parent(div)

	
	const createMaze = p5.createButton('Create Maze')
	createMaze.mousePressed(() => {
		maze.createMaze()
	})
	createMaze.parent(div)
}

new p5(p5 => {

	p5.setup = function () {
		initVariables(p5)
		p5.createCanvas(WIDTH, HEIGHT)
		
		createForm(p5)

		maze = new Maze(COLS, ROWS, { x: 0, y: 0}, { x: COLS - 1, y: ROWS - 1}, animated.checked())
	}
    
	p5.draw = function () {
        p5.background(0)
        maze.draw(p5)

		maze.nextStep()
	}
})
