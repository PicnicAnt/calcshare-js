
'use client'

export default async function Variable({ variable }) {
    return (
        <div className="group border-solid border-2 rounded-lg p-4">
            <span>{variable.displayName ?? variable.name} = {getVariableElement(variable)}</span>
            <pre className="hidden group-hover:block">{JSON.stringify(variable, null, 2)}</pre>
        </div>
    )
}

function getVariableElement(variable) {
    if (variable.isDeterminate && !variable.input) {
        return <span>{variable.value}</span>
    }

    return <input value={variable.input} placeholder={variable.value} />
}
