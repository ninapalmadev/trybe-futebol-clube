import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const response = await this.usersService.login(email, password);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  async user(_req: Request, res: Response): Promise<Response> {
    const { email } = res.locals.user;
    const response = await this.usersService.user(email);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
