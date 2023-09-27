import { connectDb } from '@/db/calcshare-db';
import { ObjectId } from 'mongodb';

export async function getBoards() {
    const db = await connectDb();
    const boards = await db.collection('boards').find({}).limit(100).toArray();

    return boards;
}

export async function getBoard(id) {
    const db = await connectDb();
    const board = await db.collection('boards').findOne({ _id: new ObjectId(id) });

    return board;
}