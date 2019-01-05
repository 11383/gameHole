import FactoryBaseItem from './base.js'

class Wall extends FactoryBaseItem {
    constructor(factory, x, y, width, height, params) {

        const body = Matter.Bodies.rectangle(
            x + width / 2, 
            y + height / 2, 
            width, 
            height,  
            {
                isStatic: true,
                render: { visible: false }
            }
        )


        return super(
            factory,
            body,
            params
        )
    }
}

export default Wall