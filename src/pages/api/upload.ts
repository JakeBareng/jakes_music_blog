import * as AWS from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        const file = req.body.file;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.name,
            Body: file,
        };


    } else {
        res.status(405).send('Method Not Allowed');
    }
}