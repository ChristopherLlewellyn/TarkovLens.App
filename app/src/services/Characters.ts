import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import ServiceHelpers from 'src/services/_serviceHelpers'
import { Character } from 'src/models/characters/Character'
import { Combatant } from 'src/models/characters/Combatant'
import { CharacterType } from 'src/models/characters/_shared'

const baseConfig: AxiosRequestConfig = {
  baseURL: ServiceHelpers.getAPIBaseUrl()
}

class Characters {
  private api: AxiosInstance

  constructor ({ httpClient = axios.create(baseConfig) }) {
    this.api = httpClient
  }

  // Gets all characters
  public async getAll<T extends Character> (): Promise<T[]> {
    const { data } = await this.api.get<T[]>('character')
    return data
  }

  // Gets the exact character matching the Id
  public async getById<T extends Character> (id: string): Promise<T> {
    const { data } = await this.api.get<T>(`character/${id}`)
    return data
  }

  // Gets a list of characters that match the provided type
  public async getByCharacterType<T extends Character> (type: CharacterType): Promise<T[]> {
    const { data } = await this.api.get<T[]>(`character/type/${type}`)
    return data
  }

  // Gets a list of characters that are combatants
  public async getCombatants (): Promise<Combatant[]> {
    const { data } = await this.api.get<Combatant[]>('character/type/combatant')
    return data
  }
}

export default Characters
