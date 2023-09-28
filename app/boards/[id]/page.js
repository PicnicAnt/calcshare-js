import Board from '@/components/board';
import { getBoard, getBoards } from '@/db/repositories/board';

export default async function BoardPage({ params }) {
    const board = await getBoard(params.id);

    return (
        <Board id={board._id} board={board.currentVersion} />
    )
}

export async function generateStaticParams() {
    const boards = await getBoards();
    const publishedBoards = boards.filter(board => !!board.currentVersion)
    const boardIds = publishedBoards.map(board => ({ id: board._id.toString() }));

    return boardIds;
}

export async function generateMetadata({ params }) {
    const board = await getBoard(params.id);

    return {
        title: `CalcShare / Boards / ${board.currentVersion.name}`
    }
}