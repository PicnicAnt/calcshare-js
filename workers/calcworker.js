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
    postMessage(`ready`)
}

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
        postMessage(`calculating variable ${variable.name}...`)
        delay(1000)
        postMessage(`calculated variable ${variable.name}`)
    }
}

// Simulates heavy load
function delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-waiting to consume CPU time
    }
}