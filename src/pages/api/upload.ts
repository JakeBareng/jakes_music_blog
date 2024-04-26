import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Song from '@/models/song';
import connectMongo from '../lib/connectDB';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
        return res.status(405).send('Method Not Allowed');

    //check if user is authenticated
    // const session = await getSession({ req });
    // if (!session) {
    //     return res.status(401).send('Unauthorized');
    // }
    //check if user is admin

    try {
        //connect to db
        await connectMongo();

        //upload file to database
        const song = new Song({
            title: req.body.title,
            producers: req.body.producers,
            songwriters: req.body.songwriters,
            bpm: req.body.bpm,
            tags: req.body.tags,
            key: req.body.key,
            URL: `${process.env.AWS_BASE_URL}${req.body.filename}`,
        });
        song.save();

    } catch (error) {
        console.error('Error uploading file to database', error);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('File uploaded');
}