import Link from "next/link";

export default async function Board() {
    const boards = await getBoards();

    const boardItems = boards.map((board) =>
        <p key={board._id}>
            <Link href={'/boards/' + board._id}>
                {board.currentVersion?.name ?? board.draft.name}
            </Link>
        </p>
    )

    return (
        <main>
            {boardItems}
        </main>
    )
}

async function getBoards() {
    const res = await fetch(`${process.env.SERVER}/api/boards`);
    const boards = await res.json();

    return boards;
}