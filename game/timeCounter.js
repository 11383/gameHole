class timeCounter {
    constructor({
        element = document.body, 
        time = 60000,
        refresh = 1000,
        finishTimeCb = _ => {}
    } = {}) {
        this.element = element
        this.time = time
        this.callback = finishTimeCb
        this.refresh = refresh

        this.interval = setInterval( 
            _ => this.update(), this.refresh
        )

        this.render()
    }

    addTime(ms) {
        this.time += ms
        
        this.update()
    }

    stop() {
        clearInterval(this.interval)
    }

    update() {
        this.time -= this.refresh

        if (this.time >= 0) {
            this.render()
        } 
        
        if(this.time == 0) {
            this.stop()
            this.callback()
        }
    }

    render() {
        this.element.innerText = this.formatTime(this.time)

        if (this.time < 10000) {
            this.element.style.color = `hsl(340, ${ 100 - this.time / 100 }%, 52%)`
        }
    }

    formatTime(time) {
        const mm = Math.floor(time / 60000).toString()
        const ss = Math.floor((time - mm * 60000) / 1000).toString()

        return `${mm.padStart(2,0)}:${ss.padStart(2,0)}`
    }
}

export default timeCounter