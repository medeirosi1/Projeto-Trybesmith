import express from 'express';
import 'express-async-errors';
import errorHandlerMiddleware from './middlewares/error.midleware';
import ordersRouter from './routes/orders.route';
import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.use(errorHandlerMiddleware);
  
export default app;
