import BoardList from "@/components/board-list";
import { getBoards } from "@/db/repositories/board";
import Link from "next/link";

export const metadata = {
    title: 'CalcShare / Boards'
}

export default async function Board() {
    const boards = await getBoards();
    const publishedBoards = boards
        .filter(board => !!board.currentVersion)
        .map(board => ({ ...board.currentVersion, _id: board._id }))

    return (
        <div>
            <BoardList boardsJSON={JSON.stringify(publishedBoards)} />
            <hr />
            <Link href={`/boards/new`}>
                <button>New Board</button>
            </Link>
        </div>
    )
}
