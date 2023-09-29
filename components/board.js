'use client'

import Link from "next/link";
import { useState } from "react";
import Calculation from "./calculation";
import Variable from "./variable";

export default function Board({ id, board }) {
    const [variables, setVariables] = useState(board.variables)
    const [calculations, setCalculations] = useState(board.calculations)

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

        const updatedCalculations = [...calculations, calculation]
        setCalculations(updatedCalculations)
    }

    return (
        <div>
            <h1>
                {board.name} -
                <Link href={`/boards/${id}/draft`}>
                    <button>Open draft</button>
                </Link>
            </h1>

            <hr />
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

        </div>
    )
}