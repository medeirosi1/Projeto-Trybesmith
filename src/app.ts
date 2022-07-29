import express from 'express';
import 'express-async-errors';
import errorHandlerMiddleware from './middlewares/error.midleware';
import productsRouter from './routes/products.route';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use(errorHandlerMiddleware);
  
export default app;
