import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '../lib/connectDB';
import Song from '@/models/song';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
        return res.status(405).send('Method Not Allowed');
    //check if user is authenticated
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Unauthorized');
    }
    //check if user is admin



    let connection;
    try {
        //connect to db
        connection = await connectDB();

        //upload file to database
        const song = new Song({
            title: req.body.title,
            bpm: req.body.bpm,
            key: req.body.key,
            tags: req.body.tags,
            producers: req.body.producers,
            songwriters: req.body.songwriters,
            file: req.body.file,
        });
        song.save();

    } catch (error) {
        //discconnect from db
        connection?.close();
        console.error('Error uploading file to database', error);
        res.status(500).send('Internal Server Error');
    }


    //disconnect from db
    connection?.close();
    res.status(200).send('File uploaded');
}