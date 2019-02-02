import Wall from './items/wall.js'
import Goal from './items/goal.js'
import Ball from './items/ball.js'
import TimeBonus from './items/timeBonus.js'

/**
 * Game factory
 */
class Factory {
    constructor(world) {
        this.world = world
        this.ballCounter = 0
    }

    /* addItem(s) to world */
    add(...items) {
        items.forEach( item => Matter.World.add(this.world, item) )
    }

    /* remove item(s) from world */
    remove(...items) {
        items.forEach( item => Matter.Composite.remove(this.world, item) )
    }

    /**
     * Create Wall
     * @param {Object} params {
     *  x, y - cooridnates of wall
     * width, height - size of wall
     * } 
     */
    Wall({ 
        x = 0, 
        y = 0, 
        width = 40, 
        height = 40 
    } = {}) {
        return new Wall(this, x, y, width, height)
    }

    /**
     * Create Ball
     * @param {Object} params {
     *  x, y - coordinates of ball
     * radius - radius of ball
     * }
     */
    Ball({ 
        x = 0, 
        y = 0, 
        radius = 4 
    }) {
        this.ballCounter++

        return new Ball(this, x, y, radius)
    }

    /**
     * Create Goal
     * @param {Object} params {
     *  x, y - coordinates of Goal
     *  radius - radius of Goal,
     *  deleteAfter - should be delated after success
     * }
     * @param {CallableFunction} onSuccess callback after success
     */
    Goal({ 
        x = 0, 
        y = 0, 
        radius = 10, 
        deleteAfter = false 
    } = {}, onSuccess) {
        return new Goal(this, x, y, radius, { onSuccess, deleteAfter })
    }

    /**
     * Create Bonus
     * @param {Object} params {
     *  x, y - coordinates of Bonus
     *  minBonus, maxBonus - range of random bonus vaules
     *  timeout - timeout of next bonus
     * }
     * @param {*} onSuccess 
     */
    Bonus({
        x = 0,
        y = 0,
        minBonus = 10,
        maxBonus = 30,
        timeout = 5000
    } = {}, onSuccess) {
        return new TimeBonus(this, x, y, minBonus, maxBonus, timeout, { onSuccess })
    }
}

export default Factory