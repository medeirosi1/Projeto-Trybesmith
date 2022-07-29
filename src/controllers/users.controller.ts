import { Request, Response } from 'express';
import createToken from '../services/jwt.service';
import UsersService from '../services/users.service';

class UsersController {
  constructor(private userService = new UsersService()) {}

  getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  create = async (req: Request, res: Response) => {
    const user = await this.userService.validationBody(req.body);

    await this.userService.create(user);
    const token = createToken(user);
    res.status(201).json({ token });
  };
}

export default UsersController;