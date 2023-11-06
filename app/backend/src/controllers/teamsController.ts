import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const { status, data } = await this.teamsService.findAll();
    return response.status(mapStatusHTTP(status)).json(data);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status, data } = await this.teamsService.findById(Number(id));
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
