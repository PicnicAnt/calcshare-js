'use client'

import { useState } from "react";
import BoardItem from "./board-item";

export default function BoardList({ boardsJSON }) {
    const [boards, setBoards] = useState(JSON.parse(boardsJSON))

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {boards.map((board) => (<BoardItem key={board._id} board={board} />))}
        </div>
    )
}
