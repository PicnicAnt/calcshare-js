export class WorkerWrapper {
    worker

    constructor(worker) {
        this.worker = worker
    }

    postMessage = (action, payload) => {
        this.worker.postMessage(JSON.stringify({
            action: action,
            payload: payload
        }))
    }

    terminate = () => {
        this.worker.terminate()
    }
}