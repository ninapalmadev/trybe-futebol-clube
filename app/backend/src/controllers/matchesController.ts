import { Request, Response } from 'express';
import MatchesService from '../services/matchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    let boolean;
    if (inProgress === undefined) {
      const result = await this.matchesService.findAll();
      return res.status(mapStatusHTTP(result.status)).json(result.data);
    }

    if (inProgress === 'true') {
      boolean = true;
    } else {
      boolean = false;
    }

    const matches = await this.matchesService.findInProgress(boolean);
    return res.status(mapStatusHTTP(matches.status)).json(matches.data);
  }

  async finishedMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishedMatches(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
