import * as bcrypt from 'bcryptjs';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/usersModel';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UsersService {
  private userModel: IUserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async login(email: IUser['email'], password: IUser['password']):
  Promise<ServiceResponse<IToken>> {
    const validEmail = await this.userModel.findByEmail(email);
    if (!validEmail) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const validPassword = await bcrypt.compare(password, validEmail.password);
    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.create({ id: validEmail.id, email: validEmail.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  async user(email: IUser['email']): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid user' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user?.role } };
  }
}
