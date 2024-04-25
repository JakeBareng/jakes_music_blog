import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
        return res.status(405).send('Method Not Allowed');
    const sessions = await getServerSession(req, res, authOptions);
    if (!sessions) {
        return res.status(401).send('Unauthorized');
    }
    console.log('sessions', sessions.user?.email !== process.env.ADMIN_EMAIL);
    const clientConfig: S3ClientConfig = {
        region: process.env.AWS_REGION || '',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY || '',
            secretAccessKey: process.env.AWS_SECRET_KEY || ''
        }
    };
    const client = new S3Client(clientConfig);

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: req.body.filename,
    });

    const signedURL = await getSignedUrl(client, putObjectCommand, {
        expiresIn: 60, // 60 seconds
    });
    res.status(200).json({ url: signedURL });
}
