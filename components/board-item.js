'use client'

import Link from "next/link";

export default function BoardItem({ board }) {
    return (
        <div className="border-solid border-2 border rounded-lg p-4">
            <Link href={'/boards/' + board._id}>
                {board.name}
            </Link>
        </div>
    )
}
