import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  ValidationError: 400,
  UnauthorizedError: 401,
};

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];
  if (!status) return res.sendStatus(500);
  if (err.message.includes('must be')) {
    res.status(422).json({ message: err.message });
  }
  res.status(status).json({ message: err.message });
};

export default errorHandlerMiddleware;