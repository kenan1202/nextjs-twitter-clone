import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const { method, query: { id } } = req;

    const { db } = await connectToDatabase();

    if(method === 'GET') {
        try {
            const post = await db.collection('posts').findOne({_id: new ObjectId(id)});
            
            res.status(201).json(post);
        }
        catch(err) {
            res.status(400).json(err);
        }
    }

    if(method === 'DELETE') {
        try {
            await db.collection('posts').deleteOne({ "_id": new ObjectId(id) });

            res.status(201).json('Deleted');

        } catch(err) {
            res.status(400).json(err);
        }
    }

}