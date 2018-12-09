class FactoryBaseItem {
    constructor(factory, body) {
        console.log('base')
        this.factory = factory
        this.body = body

        console.log(this)

        body.collisionStart = this.onCollisionStart
        body.collisionEnd = this.onCollisionEnd
        body.collisionActive = this.onCollisionActive
        body.classObject = this

        return this.body
    }

    // setFactory(factory) {
    //     this.factory = factory
    // }

    // getFactory(factory) {
    //     return this.factory 
    // }

    body() { return this.body }

    onCollisionActive(object) {}
    onCollisionStart(object) {}
    onCollisionEnd(object) {}
}

export default FactoryBaseItem