
export default async function Calculation({ calculation }) {
    return (
        <div className="group border-solid border-2 border rounded-lg p-4">
            <span>{calculation.equation.raw}</span>
            <pre className="hidden group-hover:block">{JSON.stringify(calculation, null, 2)}</pre>
        </div>
    )
}
