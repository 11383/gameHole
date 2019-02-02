import BaseFactoryItem from './base.js'

class Goal extends BaseFactoryItem {

    constructor(factory, x, y, radius, params) {

        const body = Matter.Bodies.circle(
            x,
            y,
            radius,
            {
                isSensor: true,
                isStatic: true,
                render: {
                    strokeStyle: "#3498db",
                    fillStyle: 'transparent',
                    lineWidth: 2
                },
                label: 'goal'
            }
        )

        return super(
            factory,
            body,
            params
        )
    }

    onCollisionStart(object) {

        if (object.label == 'ball') {
            this.collisionStart = (new Date()).getTime()
        }
    }

    onCollisionEnd(object) {
        this.body.render.lineWidth = 2

        if (object.label == 'ball') {
            this.collisionStart = 0
            this.inActive()
        }
    }

    onCollisionActive(object) {

        if (object.label == 'ball') {

            this.body.render.strokeStyle = "#1abc9c"

            const time = (new Date()).getTime() 

            if(time - this.collisionStart < 1000) {
                this.body.render.lineWidth = Math.floor( (time - this.collisionStart) / 300) + 2
            } 
            
            else if (time - this.collisionStart > 1000) {
                this.active()

                // remove item from world
                this.factory.remove(object)
                this.factory.ballCounter--

                /* if no ball in world, simple fire 'end' callback */
                this.factory.ballCounter == 0 
                && this.params.onSuccess
                && this.params.onSuccess()

                /* if we want delete goal after success */
                this.params.deleteAfter
                && this.factory.remove(this.body)
            }
        }
    }

    active() {
        this.body.render.fillStyle = '#1abc9c'
    }

    inActive() {
        this.body.render.fillStyle = 'transparent'
        this.body.render.strokeStyle = '#3498db'
    }
}

export default Goal