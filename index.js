import express from 'express';
import bodyParser from "body-parser";
import connectDB from './db/connection.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import 'dotenv/config.js';

const app = express();
// const port = process.env.PORT || 3000;
const port = process.env.PORT || 4000;

// Enable CORS for GET route
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(bodyParser.json());

connectDB();

app.use('/', reviewsRoutes);

app.listen(port, () => {
    console.log(`Starting... server is running on port ${port}`);
});