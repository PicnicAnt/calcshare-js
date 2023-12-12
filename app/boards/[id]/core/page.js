import { useEffect, useRef } from "react";

// This page is used for iframe integrations, passing messages to the calcworker
// TODO: generateStatic
export default function BoardPage({ params }) {
    const workerRef = useRef(null)
    // This will be posted twice in dev mode, since React.StrictMode is on (see next.config.js)
    useEffect(() => {
        window.parent.postMessage(
            JSON.stringify({
                type: 'success',
                message: "Iframe loaded"
            })
        )
    }, [])

    useEffect(() => {
        workerRef.current = new Worker(new URL('../../../../workers/calcworker.js', import.meta.url))

        workerRef.current.onmessage = event => {
            if (typeof event.data === 'object') return
            console.log('iframe received message from worker', event.data)
            window.parent.postMessage(
                JSON.stringify({
                    type: 'success',
                    message: event.data
                })
            );
        }

        return () => workerRef.current.terminate()
    }, [])

    useEffect(() => {
        const handler = async event => {
            if (typeof event.data === 'object') return

            const data = JSON.parse(event.data)
            console.log("xxx - Iframe just got a message: ", data.message)
            workerRef.current.postMessage(
                JSON.stringify({
                    type: 'success',
                    message: "Here's a response from the iframe"
                })
            );
        }

        window.addEventListener("message", handler)

        return () => window.removeEventListener("message", handler)
    }, [])

    return (
        <div>This is just an iframe. You can send messages to it, and it will use a worker to generate a response.</div>
    )
}
