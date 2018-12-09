import Wall from './items/wall.js'
import Goal from './items/goal.js'
import Ball from './items/ball.js'

class Factory {
    constructor(world) {
        this.world = world
        this.ballCounter = 0
    }

    //@todo add items to world
    // Matter.World.add(this.world, objects)

    Wall(x, y, width, height) {
        return new Wall(this, x, y, width, height)
    }

    Ball(x, y, radius = 4) {
        this.ballCounter++
        
        return new Ball(this, x, y, radius)
    }

    Goal(x, y, radius = 20) {
        return new Goal(this, x, y, radius)
    }

}

export default Factory