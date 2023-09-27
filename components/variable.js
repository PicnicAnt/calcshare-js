
export default async function Variable({ variable }) {
    return (
        <div className="border-solid border-2 border rounded-lg p-4">
            <pre>{JSON.stringify(variable, null, 2)}</pre>
        </div>
    )
}
