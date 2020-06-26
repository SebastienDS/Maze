export default class Cell {

    constructor (x, y) {
        this.x = x
        this.y = y
        this.walls = {
            up: true,
            down: true,
            left: true,
            right: true
        }
        this.visited = false
        this.active = false
    }

    removeWallBetween (cell) {
        if (this.x < cell.x) {
            this.walls.right = false
            cell.walls.left = false
        }
        else if (this.x > cell.x) {
            this.walls.left = false
            cell.walls.right = false
        }
        else if (this.y < cell.y) {
            this.walls.down = false
            cell.walls.up = false
        }
        else if (this.y > cell.y) {
            this.walls.up = false
            cell.walls.down = false
        }
    }

    draw (p5, cellSize) {
        if (this.visited) {
            if (this.active) {
                p5.fill(255, 0, 0)
            } else {
                p5.fill(255)
            }
            p5.noStroke()
            p5.rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
        }

        p5.stroke(0)
        if (this.walls.up) {
            p5.line(this.x * cellSize, this.y * cellSize, (this.x + 1) * cellSize, this.y * cellSize)
        }
        if (this.walls.down) {
            p5.line(this.x * cellSize, (this.y + 1) * cellSize, (this.x + 1) * cellSize, (this.y + 1) * cellSize)
        }
        if (this.walls.left) {
            p5.line(this.x * cellSize, this.y * cellSize, this.x * cellSize, (this.y + 1) * cellSize)
        }
        if (this.walls.right) {
            p5.line((this.x + 1) * cellSize, this.y * cellSize, (this.x + 1) * cellSize, (this.y + 1) * cellSize)
        }
    }
}