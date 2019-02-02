/**
 * TimeCounter
 */
class timeCounter {
    /**
     * Construc
     * @param {Object} params {
     *  element: HTMLDomObject - render
     *  time: time of TimeCounter
     *  refresh: refresh time
     *  finishTimeCb: CallableFunction - after counter reached 00:00
     * } 
     */
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

    /**
     * Add ms to timer
     * @param {Number} ms to add 
     */
    addTime(ms) {
        this.time += ms
        
        this.update()
    }

    /**
     * Stop timer
     */
    stop() {
        clearInterval(this.interval)
    }

    /**
     * Refresh timer
     */
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

    /**
     * Render timer
     */
    render() {
        this.element.innerText = this.formatTime(this.time)

        if (this.time < 10000) {
            this.element.style.color = `hsl(340, ${ 100 - this.time / 100 }%, 52%)`
        }
    }

    /**
     * Format time to human readable format
     * @param {Number} time timestamp 
     */
    formatTime(time) {
        const mm = Math.floor(time / 60000).toString()
        const ss = Math.floor((time - mm * 60000) / 1000).toString()

        return `${mm.padStart(2,0)}:${ss.padStart(2,0)}`
    }
}

export default timeCounter