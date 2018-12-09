import Factory from './factory/factory.js'

class game {
    constructor(options = {}) {
        
        this.options = {
            renderPlace: document.body,
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.gameFactory = new Factory( this.world )

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
            factory.Wall(0, -45, this.options.width, 50),  //top
            factory.Wall(this.options.width - 5, 0, 50, this.options.height),  //right
            factory.Wall(0, this.options.height - 5, this.options.width, 50), // bottom
            factory.Wall(-45, 0, 50, this.options.height), // left

            factory.Goal(200, 100),

            factory.Ball(100, 100),
            factory.Ball(100, 200)
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
    }

    endGame() {
        console.log('end game')
    }

    onDeviceOrientation(e) {
        const factor = 20 / 200
        const gravity = this.world.gravity;

        gravity.x = Matter.Common.clamp(event.gamma, -90, 90) * factor;
        gravity.y = Matter.Common.clamp(event.beta, -90, 90) * factor;
    }

    attachMatterEvent(eventName, callbackName) {
        Matter.Events.on(this.engine, eventName, function(event) {
            var pairs = event.pairs;
    
            for (var i = 0, j = pairs.length; i != j; ++i) {
                var pair = pairs[i]

                if(pair.bodyA[callbackName] != undefined) {
                    const callback = pair.bodyA[callbackName].bind(pair.bodyA.classObject)

                    callback(pair.bodyB)
                }

                if(pair.bodyB[callbackName] != undefined) {
                    const callback = pair.bodyB[callbackName].bind(pair.bodyB.classObject)

                    callback(pair.bodyA)
                }
            }
        })
    }

    attachHandlers() {
        window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this))

        this.attachMatterEvent('collisionActive', 'collisionActive')
        this.attachMatterEvent('collisionStart', 'collisionStart')
        this.attachMatterEvent('collisionEnd', 'collisionEnd')
    }
}

export default game;