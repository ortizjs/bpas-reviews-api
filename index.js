import express from 'express';
import bodyParser from "body-parser";
import connectDB from './db/connection.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import 'dotenv/config.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();

app.use('/', reviewsRoutes);

app.listen(port, () => {
    console.log(`Starting... server is running on port ${port}`);
});