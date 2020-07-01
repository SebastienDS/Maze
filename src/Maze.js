import Cell from './Cell.js'

export default class Maze {

    constructor (cols, rows, start, finish, animated) {
        this.cols = cols
        this.rows = rows
        this.start = start
        this.finish = finish
        this.grid = null
        this.generation = null
        this.animated = animated
        this.createMaze()
    }

    createGrid () {
        const grid = []
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                grid.push(new Cell(i, j))
            }
        }
        return grid
    }

    getCell (i, j) {
        return this.grid[j * this.cols + i]
    }

    isInGrid (i, j) {
        return i >= 0 && i < this.cols && j >= 0 && j < this.rows
    }

    draw (p5) {
        const cellSize = p5.width / this.cols

        this.grid.forEach(cell => {
            cell.draw(p5, cellSize)
        })
    }

    *generate () {
        const stack = []

        const initialCell = this.getCell(this.start.x, this.start.y)
        initialCell.visited = true
        stack.push(initialCell)

        while (stack.length > 0) {
            const currentCell = stack.pop()
            currentCell.active = true
            yield
            const neighbours = this.getNeighbours(currentCell).filter(n => !n.visited)
            if (neighbours.length > 0) {
                stack.push(currentCell)
                const chosenNeighbours = neighbours[Math.floor(Math.random() * neighbours.length)]

                currentCell.removeWallBetween(chosenNeighbours)
                chosenNeighbours.visited = true
                stack.push(chosenNeighbours)
            }
            currentCell.active = false
        }
    }

    getNeighbours (cell) {
        const directions = [ [1, 0], [0, 1], [-1, 0], [0, -1] ]
        const neighbours = []

        directions.forEach((direction) => {
            const x = cell.x + direction[0]
            const y = cell.y + direction[1]

            if (this.isInGrid(x, y)) {
                neighbours.push(this.getCell(x, y))
            }
        })
        return neighbours
    }

    createMaze () {
        this.grid = this.createGrid()
        this.createGeneration()
        
        if (!this.animated) {
            while (this.nextStep()) {}
        }
    }

    createGeneration () {
        this.generation = this.generate()
    }

    nextStep () {
        if (this.generation === null) {
            return false
        }
        const result = this.generation.next()
        if (result.done) {
            this.generation = null
            return false
        }
        return true
    }

}