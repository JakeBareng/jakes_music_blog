import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';


export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
        return res.status(405).send('Method Not Allowed');

    try {
        const data = await req.formData();

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('File uploaded');
}