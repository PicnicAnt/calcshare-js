import Link from "next/link";
import Calculation from "./calculation";
import Variable from "./variable";

export default async function Board({ board }) {
    return (
        <div>
            <h1>
                {board.name} -
                <Link href={`/boards/${board._id}/draft`}>
                    <button>Open draft</button>
                </Link>
            </h1>

            <hr />
            <h1>Variables</h1>
            <div className="grid grid-cols-4 gap-4 p-4">
                {board.variables.map((variable) => (<Variable key={board._id} variable={variable} />))}
            </div>
            <hr />
            <h1>Calculations</h1>
            <div className="grid grid-cols-4 gap-4 p-4">
                {board.calculations.map((calculation) => (<Calculation key={board._id} calculation={calculation} />))}
            </div>
        </div>
    )
}
