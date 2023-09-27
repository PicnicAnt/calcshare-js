import BoardItem from "./board-item";

export default async function BoardList({ boards }) {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {boards.map((board) => (<BoardItem key={board._id} board={board} />))}
        </div>
    )
}
