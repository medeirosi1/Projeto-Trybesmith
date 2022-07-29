import { Pool } from 'mysql2/promise';
import Products from '../interfaces/products.interface';

class ProductsModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Products[]> {
    const sql = 'SELECT * FROM Trybesmith.Products';
    const [result] = await this.connection.execute(sql);
    return result as Products[];
  }

  // async create(product:)
}

export default ProductsModel;