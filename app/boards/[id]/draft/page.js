import Board from '@/components/board';
import { getBoard, getBoards } from '@/db/repositories/board';

export default async function DraftPage({ params }) {
    const board = await getBoard(params.id);

    return (
        <Board board={{ ...board.draft, _id: board._id }} />
    )
}

export async function generateStaticParams() {
    const boards = await getBoards();
    const drafts = boards.filter(board => !!board.draft)
    const boardIds = drafts.map(board => ({ id: board._id.toString() }));

    return boardIds;
}

export async function generateMetadata({ params }) {
    const board = await getBoard(params.id);

    return {
        title: `CalcShare / Boards / ${board.draft.name} / Draft`
    }
}