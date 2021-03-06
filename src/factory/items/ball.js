import BaseFactoryItem from './base.js'

class Ball extends BaseFactoryItem {
    constructor(factory, x, y, radius, params) {

        const body = Matter.Bodies.circle(
            x, 
            y, 
            radius, 
            {
                label: 'ball',
                restitution: 0.6,
                friction: 0.1,
                // frictionAir: 0.1
                //   destiny: 0.3
            }
        )

        return super(
            factory,
            body,
            params
        )
    }

}

export default Ball