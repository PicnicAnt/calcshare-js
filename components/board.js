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
        /* TODO: create a proper ID */
        const calculation = {
            _id: '12352343',
            equation: {
                raw: ''
            }
        }

        workerRef.current.postMessage('add-calculation', calculation)
        workerRef.current.postMessage('calculate-variables', variables)

        const updatedCalculations = [...calculations, calculation]
        setCalculations(updatedCalculations)
    }

    async function sendMessage() {
        setIsLoading(true)
        workerRef.current.postMessage('init', board)
    }

    useEffect(() => {
        const worker = new Worker(new URL('../workers/calcworker.js', import.meta.url))

        workerRef.current = new WorkerWrapper(worker)
        workerRef.current.on('ready', payload => {
            setIsLoading(false)
            console.log('worker is now ready')
        })

        workerRef.current.on('added-calculation', payload => {
            console.log('added calculation', payload)
        })

        workerRef.current.on('calculating-variable', payload => {
            console.log('calculating variable', payload, '...')
        })

        workerRef.current.on('calculated-variable', payload => {
            console.log('calculated variable', payload)
        })

        workerRef.current.postMessage('init', board)

        return () => workerRef.current.terminate()
    }, [])

    return (
        <div>
            <h1>Variables</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {variables.map((variable) => (<Variable
                    key={variable._id}
                    id={variable._id}
                    name={variable.displayName ?? variable.name}
                    input={variable.input}
                    value={variable.value}
                    isDeterminate={variable.isDeterminate}
                    onChange={(input) => updateVariableInput(variable._id, input)}
                />))}
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
            <button disabled={isLoading} onClick={sendMessage}>Send message to iframe</button>
            {isLoading > 0 && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
        </div>
    )
}