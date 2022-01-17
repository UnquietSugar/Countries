import { IFlag } from './IFlag';
import { IName } from './IName';

export interface ICountry {
  area: number;
  flags: IFlag;
  languages: any;
  name: IName;
  population: number;
  region: string;
};

