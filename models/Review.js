import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    source: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    time_created: {
        type: Date,
        required: true,
    },
    user: {
        id: {
            type: String,
            required: true,
        },
        profile_url: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
    },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;