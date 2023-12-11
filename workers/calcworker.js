console.log('created worker')

addEventListener('message', (event) => {
    const { action, payload } = JSON.parse(event.data)

    switch (action) {
        case 'add-calculation':
            addCalculation(payload);
            break;
        case 'update-calculation':
            updateCalculation(payload.calculationId, payload.calculation)
            break;
        case 'remove-calculation':
            removeCalculation(payload.calculationId)
            break;
        case 'calculate-variables':
            calculateVariables(payload)
            break;
        default:
            console.log('unknown action', action)
            postMessage('unknown action')
    }
})

function addCalculation(calculation) {
    postMessage(`added calculation with value ${calculation}`)
}

function updateCalculation(calculationId, calculation) {
    postMessage(`updated calculation ${calculationId} with value ${calculation}`)
}

function removeCalculation(calculationId) {
    postMessage(`removed calculation ${calculationId}`)
}

function calculateVariables(variables) {
    for (let variable of variables) {
        delay(1000)
        postMessage(`calculated variable ${JSON.stringify(variable)}`)
    }
}

// Simulates heavy load
function delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-waiting to consume CPU time
    }
}