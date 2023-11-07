import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]> | null;
  findInProgress(inProgress: boolean): Promise<IMatch[] | null>;
}
