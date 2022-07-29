import { Pool } from 'mysql2/promise';
import Orders from '../interfaces/orders.interface';

class OrdersModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Orders[]> {
    const sql = 'SELECT * FROM Trybesmith.Orders';
    const [result] = await this.connection.execute(sql);
    return result as Orders[];
  }
}

export default OrdersModel;