import BaseFactoryItem from './base.js'

class Goal extends BaseFactoryItem {

    constructor(factory, x, y, radius) {
        return super(
            factory,
            Matter.Bodies.circle(x, y, radius, {
                isSensor: true,
                isStatic: true,
                render: {
                    strokeStyle: "#3498db",
                    fillStyle: 'transparent',
                    lineWidth: 2
                },
                label: 'goal'
            })
        )
    }

    onCollisionStart(object) {
        
        if( object.label == 'ball' ) {
            this.collisionStart = (new Date()).getTime()
        }
    }

    onCollisionEnd(object) {
        
        if( object.label == 'ball' ) {

            this.collisionStart = 0
            this.inActive()
        }
    }

    onCollisionActive(object) {

        if( object.label == 'ball' ) {

            this.body.render.strokeStyle = "#1abc9c"

            if((new Date()).getTime() - this.collisionStart > 1000) {
                this.active()

                // remove item from world
                Matter.Composite.remove(this.factory.world, object)
                this.factory.ballCounter--

                !this.factory.ballCounter <= 0 && this.endOfGameCallback()
            }
        }

    }

    endOfGameCallback() {
        console.log('end of game callback')
    }

    // onEndOfGame(callback) {}

    active() {
        this.body.render.fillStyle = '#1abc9c'
    }

    inActive() {
        this.body.render.fillStyle = 'transparent'
        this.body.render.strokeStyle = '#3498db'
    }
}

export default Goal