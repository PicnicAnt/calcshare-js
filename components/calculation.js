
export default function Calculation({ equation, onChange }) {
    return (
        <div className="group border-solid border-2 border rounded-lg">
            <input autoFocus className="w-full p-4 rounded-lg" value={equation} onChange={(event) => onChange(event.target.value)} />
        </div>
    )
}
