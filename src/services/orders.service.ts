import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import Orders from '../interfaces/orders.interface';
import ProductsModel from '../models/products.model';

class OrdersService {
  public ordersModel : OrdersModel;

  public productsModel: ProductsModel;

  constructor(
    model: OrdersModel = new OrdersModel(connection), 
    model2: ProductsModel = new ProductsModel(connection),
  ) {
    this.ordersModel = model;
    this.productsModel = model2;
  }

  async getAll(): Promise<Orders[]> {
    const orders = await this.ordersModel.getAll();
    const products = await this.productsModel.getAll();

    const obj = orders.map(({ id, userId }) => ({
      id,
      userId,
      productsIds: products.filter((product) => id === product.orderId).map((el) => el.id),
    }));
    return obj as Orders[];
  }
}

export default OrdersService;