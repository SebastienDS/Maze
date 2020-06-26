import Maze from './Maze.js'

let maze
let mazeGenerator

const cellSize = 20
let COLS, ROWS
let WIDTH, HEIGHT

new p5(p5 => {

	p5.setup = function () {
		COLS = Math.trunc(p5.windowWidth * 0.9 / cellSize) - 1
		ROWS = Math.trunc(p5.windowHeight * 0.9 / cellSize) - 1
		WIDTH = COLS * cellSize
		HEIGHT = ROWS * cellSize 
		p5.createCanvas(WIDTH, HEIGHT)

		maze = new Maze(COLS, ROWS, { x: 0, y: 0}, { x: COLS - 1, y: ROWS - 1})
		mazeGenerator = maze.generate()
	}
    
	p5.draw = function () {
        p5.background(0)
        maze.draw(p5)

        mazeGenerator.next()
	}
})