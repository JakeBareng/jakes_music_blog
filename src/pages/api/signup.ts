import User from "@/models/user";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import connectDB from "../lib/connectDB";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed." });

    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({ error: "User already exists." });
    }

    const newUser = new User({ email, password });
    newUser.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
