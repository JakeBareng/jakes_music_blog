import mongoose from "mongoose";

export type Song = {
    title: string;
    producers: string[];
    songwriters: string[];
    bpm: number;
    tags: string[];
    key: string;
    URL: string;
    createdAt: Date;
}

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    producers: {
        type: [String],
        required: true,
    },
    songwriters: {
        type: [String],
        required: true,
    },
    bpm: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Song || mongoose.model('Song', songSchema);









