export default function VariableDisplay({ name, value }) {
    return (
        <div className="p-4">
            {name} = {value}
        </div>
    )
}
