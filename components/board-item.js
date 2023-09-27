import Link from "next/link";

export default async function BoardItem({ board }) {
    return (
        <div className="border-solid border-2 border rounded-lg p-4">
            <Link href={'/boards/' + board._id}>
                {board.name}
            </Link>
        </div>
    )
}
