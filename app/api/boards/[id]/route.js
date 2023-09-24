import { connectDb } from "@/db/calcshare-db";
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(_, context) {
    const db = await connectDb();
    const data = await db.collection('boards').findOne({ _id: new ObjectId(context.params.id) });

    return NextResponse.json(data);
}