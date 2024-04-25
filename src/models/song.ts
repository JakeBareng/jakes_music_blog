import mongoose, { Schema } from "mongoose";
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
    songUploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
});

const Song = mongoose.model('Song', songSchema);
export default Song;









