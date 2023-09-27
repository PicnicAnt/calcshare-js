
export default async function Calculation({ calculation }) {
    return (
        <div className="border-solid border-2 border rounded-lg p-4">
            <pre>{JSON.stringify(calculation, null, 2)}</pre>
        </div>
    )
}
