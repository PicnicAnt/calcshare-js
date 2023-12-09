
'use client'

import { useEffect } from "react";

export default function BoardPage({ params }) {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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
        const handler = async event => {
            if (typeof event.data === 'object') return

            const data = JSON.parse(event.data)
            console.log("xxx - Iframe just got a message: ", data.message)
            await respond(10000);
        }

        window.addEventListener("message", handler)

        return () => window.removeEventListener("message", handler)
    }, [])

    return (
        <div><button onClick={sayHello}>hello</button></div>
    )
}

function sayHello() {
    window.parent.postMessage(
        JSON.stringify({
            type: 'success',
            message: "Message from iframe"
        })
    );
}

async function respond(ms) {
    await delay(ms)
    window.parent.postMessage(
        JSON.stringify({
            type: 'success',
            message: "Sure, here's a response for ya, sorry for the delay!"
        })
    );
}

// Simulates heavy load
async function delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-waiting to consume CPU time
    }
}