addEventListener('message', (event) => {
    const { action, payload } = JSON.parse(event.data)

    switch (action) {
        case 'init':
            init(payload)
            break
        case 'add-calculation':
            addCalculation(payload)
            break
        case 'update-calculation':
            updateCalculation(payload.calculationId, payload.calculation)
            break
        case 'remove-calculation':
            removeCalculation(payload.calculationId)
            break
        case 'calculate-variables':
            calculateVariables(payload)
            break
        default:
            postMessage('unknown action')
    }
})

function init() {
    postMessage({ messageType: 'ready' })
}

function addCalculation(calculation) {
    postMessage({ messageType: 'added-calculation', payload: JSON.stringify(calculation) })
}

function updateCalculation(calculationId, calculation) {
    postMessage({ messageType: 'updated-calculation', payload: JSON.stringify(calculation) })
}

function removeCalculation(calculationId) {
    postMessage({ messageType: 'removed-calculation', payload: calculationId })
}

function calculateVariables(variables) {
    for (let variable of variables) {
        postMessage({ messageType: 'calculating-variable', payload: variable.name })
        delay(1000)
        postMessage({ messageType: 'calculated-variable', payload: variable.name })
    }
}

// Simulates heavy load
function delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-waiting to consume CPU time
    }
}