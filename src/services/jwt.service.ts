import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (data: object) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET || 'senha');

  return token;
};

export default createToken;
