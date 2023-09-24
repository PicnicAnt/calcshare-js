
export default async function Board({ params }) {
    const board = await getBoard(params.id);

    return (
        <main>
            {board.currentVersion?.name ?? board.draft?.name}
        </main>
    )
}

export async function generateStaticParams() {
    const res = await fetch(`${process.env.SERVER}/api/boards`);
    const boards = await res.json();
    const boardIds = boards.map(board => ({ id: board._id }));

    return boardIds;
}

async function getBoard(id) {
    const res = await fetch(`${process.env.SERVER}/api/boards/${id}`);
    const board = await res.json();

    return board;
}