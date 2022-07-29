import Joi from 'joi';
import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Products from '../interfaces/products.interface';

class ProductsService {
  public productModel : ProductsModel;

  constructor(model: ProductsModel = new ProductsModel(connection)) {
    this.productModel = model;
  }

  validationBody = (data: object) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
      amount: Joi.string().required().min(3),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  };

  async getAll(): Promise<Products[]> {
    const products = await this.productModel.getAll();
    return products;
  }

  create(product: Products): Promise<Products> {
    return this.productModel.create(product);
  }
}

export default ProductsService;