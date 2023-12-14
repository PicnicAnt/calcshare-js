
'use client'

import { useMemo } from "react"
import VariableDisplay from "./variable-display"
import VariableInput from "./variable-input"

export default function Variable({ name, input, value, isDeterminate, onChange, isLoading }) {
    const variableElement = useMemo(() => {
        if (isDeterminate && !input) {
            return <VariableDisplay name={name} value={value} />
        }

        return <VariableInput
            name={name}
            input={input}
            value={value}
            onChange={onChange} />
    }, [input, value, name, isDeterminate, onChange])

    return (
        <div className="group border-solid border-2 rounded-lg">
            {variableElement}
            {isLoading ? <span>...</span> : <span></span>}
        </div>
    )
}
