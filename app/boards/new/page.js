import Board from '@/components/board';

export default function BoardPage() {
    const board = { _id: '123', currentVersion: { variables: [], calculations: [] } }

    return (
        <div>
            <h1>
                New Board
            </h1>
            <hr />
            <Board id={board._id.toString()} boardJSON={JSON.stringify(board.currentVersion)} />
        </div>
    )
}

export async function generateMetadata({ params }) {
    return {
        title: `CalcShare / Boards / New`
    }
}