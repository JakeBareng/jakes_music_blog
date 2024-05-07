import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../lib/connectDB";
import song from "@/models/song";

export default async function getAllSongs(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }


    try {
        await connectMongo();
        const songs = await song.find({});
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error getting songs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}