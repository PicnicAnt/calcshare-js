import { delay, message } from './worker.js'

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
    message('ready')
}

function addCalculation(calculation) {
    message('added-calculation', JSON.stringify(calculation))
}

function updateCalculation(calculationId, calculation) {
    message('updated-calculation', JSON.stringify(calculation))
}

function removeCalculation(calculationId) {
    message('removed-calculation', calculationId)
}

function calculateVariables(variables) {
    for (let variable of variables) {
        message('calculating-variable', variable.name)
        delay(1000)
        message('calculated-variable', variable.name)
    }
}

// // Simulates heavy load
// function delay(ms) {
//     const start = Date.now();
//     while (Date.now() - start < ms) {
//         // Busy-waiting to consume CPU time
//     }
// }

// function message(messageType, payload) {
//     postMessage({ messageType, payload })
// }