// Simulates heavy load
export function delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-waiting to consume CPU time
    }
}

export function message(messageType, payload) {
    postMessage({ messageType, payload })
}