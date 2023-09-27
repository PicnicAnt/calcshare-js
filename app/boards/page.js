import BoardList from "@/components/board-list";
import { getBoards } from "@/db/repositories/board";

export const metadata = {
    title: 'CalcShare / Boards'
}

export default async function Board() {
    const boards = await getBoards();
    const publishedBoards = boards
        .filter(board => !!board.currentVersion)
        .map(board => ({ ...board.currentVersion, _id: board._id }));

    return (
        <BoardList boards={publishedBoards} />
    )
}
