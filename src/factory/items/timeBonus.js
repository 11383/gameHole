import FactoryBaseItem from './base.js'

/* create texture for render */
const createSprite = (text) => {
        let drawing = document.createElement("canvas");
        drawing.width = text.length * 20
        drawing.height = 40
    
        let ctx = drawing.getContext("2d");

        ctx.fillStyle = "#fff";
        ctx.font = "20pt sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text, text.length * 20 / 2, 30);
    
        return drawing.toDataURL("image/png");    
}

class TimeBonus extends FactoryBaseItem {

    constructor(factory, x, y, minBonus, maxBonus, timeout, params) {

        const bonus = Math.floor( Math.random() * maxBonus - minBonus ) + minBonus

        const text = `+${bonus}`
        const width = 20 * text.length
        const height = 40

        params.bonus = bonus

        setTimeout( _ => {
            factory.remove(this)
        }, timeout)

        const body = Matter.Bodies.rectangle(
            x + width / 2, 
            y + height / 2, 
            20 * text.length, 
            height,  
            {
                isStatic: true,
                isSensor: true,
                render: {
                    sprite: {
                        texture: createSprite(text),
                        xScale: 1,
                        yScale: 1
                    }
                }
            }
        )

        return super(
            factory,
            body,
            params
        )
    }

    onCollisionActive() {
        if (this.params.onSuccess) {
            
            this.factory.remove(
                this.body
            )
            
            this.params.onSuccess(
                this.params.bonus
            )
        }
    }
}

export default TimeBonus