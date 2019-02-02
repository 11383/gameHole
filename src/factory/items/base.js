class FactoryBaseItem {
    constructor(factory, body, params) {
        this.factory = factory
        this.body = body
        this.params = params

        body.collisionStart = this.onCollisionStart
        body.collisionEnd = this.onCollisionEnd
        body.collisionActive = this.onCollisionActive
        body.classObject = this

        return this.body
    }

    onCollisionActive(object) {}
    onCollisionStart(object) {}
    onCollisionEnd(object) {}
}

export default FactoryBaseItem