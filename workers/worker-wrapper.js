export class WorkerWrapper {
    worker
    callbacks
    log

    constructor(worker) {
        this.worker = worker
        this.callbacks = []
        this.worker.onmessage = event => {
            const { messageType, payload } = event.data
            const callbacks = this.callbacks
                .filter(cb => cb.messageType === messageType)
                .map(cb => cb.callback)

            for (let callback of callbacks) {
                callback(payload)
                this.log && this.log(`${messageType}${payload ? ': ' + JSON.stringify(payload) : ''}`)
            }
        }
    }

    postMessage = (action, payload) => {
        this.worker.postMessage(JSON.stringify({
            action: action,
            payload: payload
        }))
    }

    on = (messageType, callback) => {
        this.callbacks.push({ messageType, callback })
    }

    terminate = () => {
        this.worker.terminate()
    }
}