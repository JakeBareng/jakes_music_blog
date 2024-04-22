import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI || "";

if (!DATABASE_URL) {
  throw new Error("Please provide a MongoDB URI");
}

let cached = global.mongoose;

declare const global: {
    mongoose: {
        conn: any;
        promise: any;
    };
};

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    
    if (!cached.promise) {
        const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        };
    
        cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        return mongoose;
        });
    }
    
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;