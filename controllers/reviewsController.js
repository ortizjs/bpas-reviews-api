import fetch from 'node-fetch';
import Review from '../models/Review.js';

export const root = async (request, response) => {
    try {
        response.status(200).send("Welcome to the Reviews API!");
    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }
};

export const listReviews = async (request, response) => {
    if (checkBearer(request.headers.authorization)) {
        try {
            const reviews = await Review.find();
            response.status(200).json(reviews);
        } catch (error) {
            response.status(500).json({error: "Internal Server Error"});
        }
    } else {
        response.status(401).json({error: "Invalid authorization"})
    }
};

export const addReview = async (request, response) => {
    try {
        
        const review = new Review(googleReview);
        await review.save();
        response.status(200).json(review);
    } catch(error) {
        response.status(405).json({error: "Invalid input" + " " + error.message});
    }
};

export const fetchYelpReviews = async (request, response) => {
    if (checkBearer(request.headers.authorization)) {
        const API_KEY = process.env.REACT_APP_YELP_DEV_API_KEY
        const BusinessID = process.env.BPAS_YELP_BUSINESS_ID
        const options = {
            method: 'get',
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const externalResponse = await fetch(`https://api.yelp.com/v3/businesses/${BusinessID}/reviews?limit=50&sort_by=yelp_sort`, options);
            if (!externalResponse.ok) {
                throw new Error('Failed to fetch Yelp data');
            }
            const data = await externalResponse.json();
            response.status(200).json(data.reviews)
        } catch (error) {
            console.error('Error fetching Yelp data', error);
            response.status(500).json({error: error});
        }
    } else {
        response.status(401).json({error: "Invalid authorization"})
    }
}

export const fetchGoogleReviews = async (request, response) => {
    if (checkBearer(request.headers.authorization)) {
        const API_KEY = process.env.GOOGLE_PLACES_API_KEY
        const BPAS_GOOGLE_IDP = process.env.BPAS_GOOGLE_IDP
        console.log("request: ", request);
        try {
            const externalResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${BPAS_GOOGLE_IDP}&fields=name,rating,reviews&key=${API_KEY}`);
            if (!externalResponse.ok) {
                throw new Error('Failed to fetch Google Reviews data');
            }
            const data = await externalResponse.json();
            console.log("data: ", data);
            response.status(200).json(data.result)
        } catch (error) {
            console.error('Error fetching Yelp data', error);
            response.status(500).json({error: error});
        }
    }
    else {
        response.status(401).json({error: "Invalid authorization"})
    }
}

function checkBearer(bearer) {
    return bearer === `Bearer ${process.env.REACT_APP_YELP_DEV_API_KEY}+${process.env.BPAS_GOOGLE_IDP}`;
}