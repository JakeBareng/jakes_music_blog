import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { connectToMongodb } from "@/util/mongodb";
import { User } from "@/models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Email and password are required." });
  }

  await connectToMongodb();

  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).json({ error: "User already exists." });
  }

  const newUser = new User({ email, password });
  newUser.save(); 
  
  return res.status(201).json({ message: "User created successfully." });
};
