import express from 'express';
import * as reviewsController from '../controllers/reviewsController.js';

const router = express.Router();

router.get('/', reviewsController.root);
router.get('/reviews', reviewsController.listReviews);
router.post('/review', reviewsController.addReview);
router.get('/fetch_yelp_reviews', reviewsController.fetchYelpReviews);
router.get('/fetch_google_reviews', reviewsController.fetchGoogleReviews);

export default router;
