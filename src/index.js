import Maze from './Maze.js'
import config from './config.js'

const maze = new Maze(config.COLS, config.ROWS, { x: 0, y: 0}, { x: config.COLS - 1, y: config.ROWS - 1})
const mazeGenerator = maze.generate()

new p5(p5 => {

	p5.setup = function () {
		p5.createCanvas(config.WIDTH, config.HEIGHT)
    }
    
	p5.draw = function () {
        p5.background(0)
        maze.draw(p5)

        mazeGenerator.next()
	}
})