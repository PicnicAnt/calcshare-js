import Board from '@/components/board';
import { getBoard, getBoards } from '@/db/repositories/board';
import Link from 'next/link';

export default async function BoardPage({ params }) {
    const board = await getBoard(params.id);

    return (
        <div>
            <h1>
                {board.name} -
                <Link href={`/boards/${params.id}/draft`}>
                    <button>Open draft</button>
                </Link>
            </h1>
            <hr />
            <Board id={board._id.toString()} boardJSON={JSON.stringify(board.currentVersion)} />
        </div>
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