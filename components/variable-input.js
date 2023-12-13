'use client'

import { useMemo } from "react"

export default function VariableInput({ name, input, value, onChange }) {
    /* focus doesn't work well here, we need to find a better way */
    const valueDisplay = useMemo(() => {
        return input ? `${name} = ${input}` : ''
    }, [name, input])

    const placeholderDisplay = useMemo(() => {
        return `${name} = ${value}`
    }, [name, value])

    return (
        <span>
            <input
                className="w-full p-4 rounded-lg"
                autoFocus
                value={valueDisplay}
                onChange={(event) => onChange(event.target.value.substring(name.length + 3))}
                placeholder={placeholderDisplay} />
        </span>
    )
}
