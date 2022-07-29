import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import createToken from '../services/jwt.service';

class AuthController {
  constructor(private authService = new AuthService()) {}

  login = async (req: Request, res: Response) => {
    const validatelogin = await this.authService.validateLogin(req.body);

    const login = await this.authService.login(validatelogin);

    const token = createToken(login);

    res.status(200).json({ token });
  };
}

export default AuthController;