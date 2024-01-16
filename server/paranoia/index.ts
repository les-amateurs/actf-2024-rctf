import type { ParaTeam } from './types'
import config from '../config/server'
import type { User } from 'server/database/users'

const PURL = config.paranoia?.apiUrl

const convertUserToParaTeam = (team: User, ip: string): ParaTeam => {
  return {
    id: team.id,
    name: team.id,
    email: team.email,
    division: team.division,
    ctftime_id: team.ctftimeId,
    ip
  }
}

export const register = async (team: User, ip: string): Promise<void> => {
  if (!PURL) return
  await fetch(`${PURL}/teams`, {
    method: 'POST',
    body: JSON.stringify(convertUserToParaTeam(team, ip))
  })
}

export const visit = async (
  team: User,
  ip: string,
  ua: string
): Promise<void> => {
  if (!PURL) return
  await fetch(`${PURL}/users/visit`, {
    method: 'POST',
    body: JSON.stringify({
      ip,
      ua,
      team_id: team.id
    })
  })
}

export const submit = async (
  team: User,
  ip: string,
  chall: string,
  flag: string,
  accepted: boolean
): Promise<void> => {
  if (!PURL) return
  await fetch(`${PURL}/submissions`, {
    method: 'POST',
    body: JSON.stringify({ team_id: team.id, ip, chall, flag, accepted })
  })
}
