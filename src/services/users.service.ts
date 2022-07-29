import Joi from 'joi';
import connection from '../models/connection';
import UsersModel from '../models/users.model';
import Users from '../interfaces/users.interface';

class UsersService {
  public userModel : UsersModel;

  constructor(model: UsersModel = new UsersModel(connection)) {
    this.userModel = model;
  }

  validationBody = (data: object) => {
    const schema = Joi.object({
      username: Joi.string().required().min(3),
      classe: Joi.string().required().min(3),
      level: Joi.number().required().min(1),
      password: Joi.string().required().min(8),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  };

  async getAll(): Promise<Users[]> {
    const products = await this.userModel.getAll();
    return products;
  }

  create(user: Users): Promise<Users> {
    return this.userModel.create(user);
  }
}

export default UsersService;