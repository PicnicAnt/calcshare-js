import { connectDb } from '@/db/calcshare-db';
import { ObjectId } from 'mongodb';

export default async function Board({ params }) {
    const board = await getBoard(params.id);

    return (
        <main>
            {board?.currentVersion?.name ?? board?.draft?.name}
            <pre>
                {JSON.stringify(board, null, 2)}
            </pre>
        </main>
    )
}

export async function generateStaticParams() {
    const db = await connectDb();
    const boards = await db.collection('boards').find({}).limit(100).toArray();
    const boardIds = boards.map(board => ({ id: board._id.toString() }));

    return boardIds;
}

async function getBoard(id) {
    const db = await connectDb();
    const board = await db.collection('boards').findOne({ _id: new ObjectId(id) });

    return board;
}