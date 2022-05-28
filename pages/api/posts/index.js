import { connectToDatabase } from "../../../util/mongodb";
import cloudinary from "../../../util/cloudinary";


export default async function handler(req, res) {
    const { method, body } = req;

    const { db } = await connectToDatabase();


    if(method === 'GET') {
        try {
            const posts = await db.collection('posts').find().toArray();
            res.status(201).json(posts);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }

    if(method === 'POST') {
        try {
            const fileStr = req.body.postPhoto;
            const { secure_url } = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups',
            });

            const post = await db.collection('posts').insertOne({ ...body, postPhoto: secure_url, likes: [], comments: [], date: new Date()});
            res.status(201).json(post);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }

}

