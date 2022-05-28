import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";



export default async function handler(req, res) {
    const { method, body, query: { id } } = req;

    const { db } = await connectToDatabase();

    if(method === 'PUT') {
        try {
            const { likes } = await db.collection('posts').findOne({_id: new ObjectId(id)});

            let likesArr = likes;

            if(likesArr?.length) {
                const index = likesArr.indexOf(body.username);
                console.log(index);

                if(index >= 0) {
                    likesArr.splice(index, 1);
                }
                else {
                    likesArr.push(body.username);
                }
            }
            else {
                likesArr.push(body.username);
            }

            const post = await db.collection('posts').findOneAndUpdate(
                {
                    "_id": new ObjectId(id)
                },
                {
                    $set: { "likes": likesArr }
                }
            );
            res.status(201).json(post);

        }
        catch(err) {
            res.status(400).json('error');
        }
    }

}