export class WorkerWrapper {
    /**
    * @public
    * @type {function}
    * Function to call when WorkerWrapper logs information. Don't set if you don't wish to log.
    */
    log

    /**
     * @private
     * @type {Worker}
     */
    worker

    /**
     * @private
     * @type {[]}
     */
    callbacks

    /**
     * Wraps a web worker for ease of use
     * @constructor
     * @param {Worker} worker - The worker to wrap
     */
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
                if (this.log) {
                    const now = new Date()
                    const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
                    this.log(timestamp, messageType, payload)
                }
            }
        }
    }

    /**
     * Posts a structured message to the worker
     * @param {string} action - The ID of the action the worker should perform
     * @param {function(object)} payload - Additional data available for the worker
     */
    postMessage = (action, payload) => {
        this.worker.postMessage(JSON.stringify({
            action: action,
            payload: payload
        }))
    }

    /**
     * Registers a callback to a messageType
     * @param {string} messageType - The message type to listen for
     * @param {function(object)} callback - The function to call when message is received
     */
    on = (messageType, callback) => {
        this.callbacks.push({ messageType, callback })
    }

    /**
     * Terminates the worker
     */
    terminate = () => {
        this.worker.terminate()
    }
}