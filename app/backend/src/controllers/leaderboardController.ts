import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  async leaderBoard(req: Request, res: Response) {
    const endpoint = req.path.split('/')[1];
    const { status, data } = await this.leaderboardService.leaderBoard(endpoint);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
