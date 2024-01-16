import config, { ServerConfig } from '../config/server'

export interface ParaTeam {
  id: string;
  name: string;
  email?: string;
  division: keyof ServerConfig['divisions'];
  // eslint-disable-next-line camelcase
  ctftime_id?: string;
  ip: string;
}
