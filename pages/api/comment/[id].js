import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const { method, body, query: { id } } = req;

    const { db } = await connectToDatabase();

    if(method === 'PUT') {
        try {
            const { comments } = await db.collection('posts').findOne({_id: new ObjectId(id)});

            let commentArr = comments;

            commentArr.push({...body, commentCreated: new Date()});

            const post = await db.collection('posts').findOneAndUpdate(
                {
                    "_id": new ObjectId(id)
                },
                {
                    $set: { "comments": commentArr }
                }
            );
            res.status(201).json(post);

        }
        catch(err) {
            res.status(400).json('error');
        }
    }

}