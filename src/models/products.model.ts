import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  async create(product: Products): Promise<Products> {
    const { name, amount } = product;
    const sql = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';
    const result = await this.connection.execute<ResultSetHeader>(sql, [name, amount]);
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}

export default ProductsModel;