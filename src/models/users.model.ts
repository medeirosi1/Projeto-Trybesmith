import { Pool, ResultSetHeader } from 'mysql2/promise';
import Users from '../interfaces/users.interface';

class UsersModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Users[]> {
    const sql = 'SELECT * FROM Trybesmith.Users';
    const [result] = await this.connection.execute(sql);
    return result as Users[];
  }

  async create(user: Users): Promise<Users> {
    const { username, classe, level, password } = user;
    const sql = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)';
    const result = await this.connection.execute<ResultSetHeader>(
      sql, 
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}

export default UsersModel;