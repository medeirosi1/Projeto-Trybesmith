import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Products from '../interfaces/products.interface';

class ProductsService {
  public productModel : ProductsModel;

  constructor(model: ProductsModel = new ProductsModel(connection)) {
    this.productModel = model;
  }

  async getAll(): Promise<Products[]> {
    const products = await this.productModel.getAll();
    return products;
  }

  create(product: Products): Promise<Products> {
    return this.productModel.create(product);
  }
}

export default ProductsService;