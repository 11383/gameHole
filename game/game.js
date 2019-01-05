import Factory from './factory/factory.js'
import TimeCounter from './timeCounter.js'

class Game {
    constructor({
        renderPlace = document.body,
        width = window.innerWidth,
        height = window.innerHeight,
        time = 60000,
        timePlace = document.body,
        bonusSpawn = 10000,
        onFinish = _ => {}
    } = {}) {
        
        this.options = {
            renderPlace,
            width,
            height,
            bonusSpawn,
            onFinish
        }

        this.timeRenderOptions = {
            time,
            element: timePlace,
            finishTimeCb: _ => this.endGame(false)
        }

        this.initPosition = {
            x: null,
            y: null
        }

        this.gameFactory = new Factory(this.world)

        this.initGame()
    }

    // return physics engine
    get engine() {
        !this._engine && (this._engine = Matter.Engine.create())

        return this._engine;
    }

    // return "World" of physics engine
    get world() {
        return this.engine.world
    }

    //
    get render() {
        if(!this._render) {
            const {renderPlace, ...rendererOptions} = this.options

            this._render = Matter.Render.create({
                element: renderPlace,
                engine: this.engine,
                options: {
                    wireframes: false,
                    ...rendererOptions
                }
            })
        }

        return this._render
    }

    initWorld(objects = []) {
        const factory = this.gameFactory

        const worldWalls = [
            /* top edge */
            factory.Wall({ 
                x: 0, 
                y: -45, 
                width: this.options.width, 
                height: 50 
            }),

            /* right edge */
            factory.Wall({ 
                x: this.options.width - 5, 
                y: 0, width: 50, 
                height: this.options.height 
            }),

            /* bottom edge */
            factory.Wall({ 
                x: 0, 
                y: this.options.height - 5, 
                width: this.options.width, 
                height: 50 
            }),

            /* left edge */
            factory.Wall({ 
                x: -45, 
                y: 0, 
                width: 50, 
                height: 
                this.options.height 
            }),

            factory.Goal({ x: 200, y: 100, deleteAfter: true }, _ => this.endGame()),
            factory.Goal({ x: 100, y: 300, deleteAfter: true }, _ => this.endGame()),

            factory.Ball({ x: 100, y: 100 }),
            factory.Ball({ x: 200, y: 150 }),
        ]

        objects.push(...worldWalls)

        Matter.World.add(this.world, objects)
    }

    initGame() {
        // init world
        this.initWorld()

        // start render game
        Matter.Render.run(this.render);

        const runner = Matter.Runner.create()

        // create runner
        Matter.Runner.run(runner, this.engine);

        // attachHandlers
        this.attachHandlers()

        // create timeCounter
        this.timeCounter = new TimeCounter(this.timeRenderOptions)

        // init bonus
        setTimeout( _ => this.addBonus(), this.options.bonusSpawn)
    }

    endGame(result = true) {
        Matter.Render.stop(this.render)
        this.timeCounter.stop()

        this.options.onFinish
        && this.options.onFinish(result)
    }

    onDeviceOrientation(event) {
        const factor = 20 / 200
        const gravity = this.world.gravity;

        this.initPosition.x == null && (this.initPosition.x = event.gamma)
        this.initPosition.y == null && (this.initPosition.y = event.beta) 

        gravity.x = Matter.Common.clamp(event.gamma - this.initPosition.x, -90, 90) * factor
        gravity.y = Matter.Common.clamp(event.beta - this.initPosition.y, -90, 90) * factor
    }

    //attachCollisionEevent
    onCollision(eventName, callbackName) {
        Matter.Events.on(this.engine, eventName, function(event) {
            var pairs = event.pairs;
    
            for (var i = 0, j = pairs.length; i != j; ++i) {
                var pair = pairs[i]

                if (pair.bodyA[callbackName] != undefined) {
                    const callback = pair.bodyA[callbackName].bind(pair.bodyA.classObject)

                    callback(pair.bodyB)
                }

                if (pair.bodyB[callbackName] != undefined) {
                    const callback = pair.bodyB[callbackName].bind(pair.bodyB.classObject)

                    callback(pair.bodyA)
                }
            }
        })
    }

    addBonus() {
        Matter.World.add(
            this.world, 
            this.gameFactory.Bonus({ 
                x: Math.random() * this.options.width, 
                y: Math.random() * this.options.height
            }, bonus => this.onBonusSuccess(bonus) 
        ))

        setTimeout( _ => this.addBonus(), this.options.bonusSpawn)
    }

    onBonusSuccess(bonus) {
        this.timeCounter.addTime(
            bonus * 1000
        )
    }

    attachHandlers() {
        window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this))

        this.onCollision('collisionActive', 'collisionActive')
        this.onCollision('collisionStart', 'collisionStart')
        this.onCollision('collisionEnd', 'collisionEnd')
    }
}

export default Game;