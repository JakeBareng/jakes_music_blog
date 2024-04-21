export async function connectToMongodb() {
    await mongoose.connect(process.env.MONGODB_URI);
}