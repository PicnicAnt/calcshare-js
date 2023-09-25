import clientPromise from "./mongodb-client";

let client;

export async function connectDb() {
    if (!client) {
        client = await clientPromise;
    }

    return client.db('calcshare');
}
