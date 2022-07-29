import Joi from 'joi';
import UsersModel from '../models/users.model';
import Login from '../interfaces/auth.interface';
import connection from '../models/connection';
import Users from '../interfaces/users.interface';

class AuthService {
  userModel: UsersModel;

  constructor(model: UsersModel = new UsersModel(connection)) {
    this.userModel = model;
  }

  validateLogin = (data: object) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    
    const { error, value } = schema.validate(data);
    
    if (error) throw error;
    
    return value;
  };

  async login(login: Login): Promise<Login> {
    const { username, password } = login;
    const users = await this.userModel.getAll();
    const usernameValido = users.some((el) => el.username === username);
    const passwordValido = users.some((el) => el.password === password);
    if (!usernameValido || !passwordValido) {
      const err = new Error('Username or password invalid');
      err.name = 'UnauthorizedError';
      throw err;
    }
    const findUser = users.find((el) => el.username === username);
    return findUser as Users;
  }
}

export default AuthService;