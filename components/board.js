'use client'

import { WorkerWrapper } from "@/workers/worker-wrapper";
import { useEffect, useRef, useState } from "react";
import Calculation from "./calculation";
import Variable from "./variable";

export default function Board({ id, boardJSON }) {
    const [board, setBoard] = useState(JSON.parse(boardJSON))
    const [variables, setVariables] = useState(board.variables)
    const [calculations, setCalculations] = useState(board.calculations)
    const [isLoading, setIsLoading] = useState(true)
    const [logMessages, setLogMessages] = useState([])

    const workerRef = useRef(null)

    function updateVariableInput(variableId, input) {
        const updatedVariables = variables.map((variable) => {
            if (variable._id === variableId) {
                variable.input = input
            }

            return variable
        })

        setVariables(updatedVariables)
    }

    function updateCalculationEquation(calculationId, equationInput) {
        const updatedCalculations = calculations.map((calculation) => {
            if (calculation._id === calculationId) {
                calculation.equation.raw = equationInput

                workerRef.current.postMessage('update-calculation', {
                    calculationId,
                    calculation: equationInput
                })
            }

            return calculation
        })

        setCalculations(updatedCalculations)
    }

    function addCalculation() {
        setIsLoading(true)
        const calculation = {
            _id: Math.random().toString(),
            equation: {
                raw: ''
            }
        }

        workerRef.current.postMessage('add-calculation', calculation)
        workerRef.current.postMessage('calculate-variables', variables)

        const updatedCalculations = [...calculations, calculation]
        setCalculations(updatedCalculations)
    }

    function onCalculatingVariable(variableName) {
        const updatedVariables = variables.map((variable) => {
            if (variable.name === variableName) {
                variable.isLoading = true
            }

            return variable
        })
        setVariables(updatedVariables)
    }

    function onCalculatedVariable(variableName) {
        const updatedVariables = variables.map((variable) => {
            if (variable.name === variableName) {
                variable.isLoading = false
            }

            return variable
        })
        setVariables(updatedVariables)
    }

    useEffect(() => {
        const worker = new Worker(new URL('../workers/calc.worker.js', import.meta.url))
        const workerWrapper = new WorkerWrapper(worker)
        workerWrapper.log = (timestamp, messageType, payload) => {
            const message = `${timestamp} - ${messageType}${payload ? ': ' + payload : ''}`

            setLogMessages(messages => [message, ...messages])
        }

        workerWrapper.on('ready', payload => {
            setIsLoading(false)
            console.log('worker is now ready')
        })

        workerWrapper.on('added-calculation', payload => {
            console.log('added calculation', payload)
            setIsLoading(false)
        })

        workerWrapper.on('calculating-variable', onCalculatingVariable)

        workerWrapper.on('calculated-variable', onCalculatedVariable)

        workerWrapper.on('updating-calculation', calculation => {

        })

        workerWrapper.on('updated-calculation', solutions => {
            for (let solution of solutions) {
                const updatedVariables = variables.map((variable) => {
                    if (variable.name === solution.variable) {
                        if (!variable.solutions) {
                            variable.solutions = []
                        }

                        variable.solutions = [
                            ...variable.solutions.filter(s => s.calculationId !== solution.calculationId),
                            ...solution.solutions.map(s => ({ calculationId: solution.calculationId, solution: s }))
                        ]
                    }

                    return variable
                })

                setVariables(updatedVariables)
            }
        })

        workerWrapper.postMessage('init', board)

        workerRef.current = workerWrapper

        return () => workerWrapper.terminate()
    }, [board])

    return (
        <div>
            <h1>Variables</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {variables.map((variable) => (<div key={variable._id}>
                    <Variable
                        id={variable._id}
                        name={variable.displayName ?? variable.name}
                        input={variable.input}
                        value={variable.value}
                        isDeterminate={variable.isDeterminate}
                        isLoading={variable.isLoading}
                        onChange={(input) => updateVariableInput(variable._id, input)}
                    />
                    {variable.solutions && <ul>
                        {variable.solutions.map(solution => <li key={solution.solution}>{solution.solution}</li>)}
                    </ul>}
                </div>))}

            </div>
            <hr />
            <h1>Calculations</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {calculations.map((calculation) => (<Calculation
                    key={calculation._id}
                    equation={calculation.equation.raw}
                    onChange={(equation) => updateCalculationEquation(calculation._id, equation)}
                />))}
                <div><button onClick={addCalculation}>Add Calculation</button></div>
            </div>
            {isLoading > 0 && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
            {logMessages.length > 0 && <ol>
                {logMessages.map(message => <li key={message}>{message}</li>)}
            </ol>}
        </div>
    )
}