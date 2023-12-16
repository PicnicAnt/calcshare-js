
'use client'

import { useMemo } from "react"
import VariableDisplay from "./variable-display"
import VariableInput from "./variable-input"

export default function Variable({ name, input, value, isDeterminate, onChange, isLoading }) {
    const variableElement = useMemo(() => {
        if (isLoading) {
            return <span>Calculating...</span>
        }

        if (isDeterminate && !input) {
            return <VariableDisplay name={name} value={value} />
        }

        return <VariableInput
            name={name}
            input={input}
            value={value}
            onChange={onChange} />
    }, [input, value, name, isDeterminate, onChange])

    const className = `group border-solid rounded-lg border-black dark:border-white ${isDeterminate && !input ? '' : 'border-2'}`

    return (
        <div className={className}>
            {variableElement}
        </div >
    )
}
