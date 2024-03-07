import mongoose from 'mongoose';
import 'dotenv/config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Success: MongoDB connected!');

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB has disconnected!');
        });

        mongoose.connection.on('error', (error) => {
            console.log(`There was an error connecting to MongoDB: ${error.message}`);
        });
    } catch (error) {
        console.log(`Failed: MongoDB connection error: ${error}`)
        process.exit(1);
    }
}
export default connectDB;
