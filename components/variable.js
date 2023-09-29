
'use client'

import { useMemo } from "react"
import VariableDisplay from "./variable-display"
import VariableInput from "./variable-input"

export default function Variable({ name, input, value, isDeterminate, onChange }) {
    const variableElement = useMemo(() => {
        if (isDeterminate && !input) {
            return <VariableDisplay name={name} value={value} />
        }

        return <VariableInput
            name={name}
            input={input}
            value={value}
            onChange={onChange} />
    }, [input, value, name, isDeterminate])

    return (
        <div className="group border-solid border-2 rounded-lg">
            {variableElement}
        </div>
    )
}
