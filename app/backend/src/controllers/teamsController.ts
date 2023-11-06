import { Request, Response } from 'express';
import TeamService from '../services/teamService';
import mapStatusHTTP from '../util/mapStatusHTTP';

export default class TeamsController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getIdTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.teamService.findById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
