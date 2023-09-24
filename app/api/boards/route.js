import { connectDb } from '@/db/calcshare-db';
import { NextResponse } from 'next/server';

export async function GET() {
    const db = await connectDb();
    const data = await db.collection('boards').find({}).limit(100).toArray();

    return NextResponse.json(data);
}