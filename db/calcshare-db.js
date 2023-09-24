import clientPromise from "./mongodb-client";

export async function connectDb() {
    const client = await clientPromise;

    return client.db('calcshare');
}
