import { mathService } from '@/services/math-service.js'
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
    message('updating-calculation', calculation)
    const result = mathService.parse(calculation)

    const solutions = result.equation.isParseSuccess ? result.solutions.map(solution => ({
        calculationId,
        variable: solution.variable,
        solutions: [...new Set(solution.solutions.map ? solution.solutions.map(s => s.symbol.value) : solution.solutions.symbol.value)]
    })) : []

    message('updated-calculation', solutions)
}

function removeCalculation(calculationId) {
    message('removed-calculation', calculationId)
}

function calculateVariables(variables) {
    for (let variable of variables) {
        message('calculating-variable', variable.name)
        delay(200)
        message('calculated-variable', variable.name)
    }
}