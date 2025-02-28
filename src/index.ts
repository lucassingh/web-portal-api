import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mailRoute from './routes/mailRoute';
import { swaggerOptions } from './utils/swaggerOptions';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(cors({
    origin: process.env.LOCAL_URL_CLIENT,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (_, res) => {
    res.send('Welcome API mail Manager');
});

app.use(express.json());
app.use('/api', mailRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});