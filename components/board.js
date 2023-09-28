import Link from "next/link";
import Calculation from "./calculation";
import Variable from "./variable";

export default async function Board({ id, board }) {
    return (
        <div>
            <h1>
                {board.name} -
                <Link href={`/boards/${id}/draft`}>
                    <button>Open draft</button>
                </Link>
            </h1>

            <hr />
            <h1>Variables</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {board.variables.map((variable) => (<Variable key={variable._id} variable={variable} />))}
            </div>
            <hr />
            <h1>Calculations</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {board.calculations.map((calculation) => (<Calculation key={calculation._id} calculation={calculation} />))}
            </div>
        </div>
    )
}
