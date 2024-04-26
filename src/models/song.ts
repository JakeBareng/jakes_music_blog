import mongoose from "mongoose";
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









