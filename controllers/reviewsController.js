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
    try {
        const reviews = await Review.find();
        response.status(200).json(reviews);
    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }
};

export const fetchYelpReviews = async (request, response) => {
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
}

export const fetchGoogleReviews = async (request, response) => {
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY
    const BPAS_GOOGLE_IDP = process.env.BPAS_GOOGLE_IDP
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