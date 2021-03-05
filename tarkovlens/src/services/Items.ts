import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Item } from 'src/models/items/Item'
import { Kind } from 'src/models/items/_shared'

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.DEV ? 'https://localhost:44350/' : 'https://api.tarkovlens.com/'
}

class Items {
  private api: AxiosInstance

  constructor ({ httpClient = axios.create(baseConfig) }) {
    this.api = httpClient
  }

  // Gets the exact item matching the Id
  public async getById<T> (id: string): Promise<T> {
    const { data } = await this.api.get<T>(`item/${id}`)
    return data
  }

  // Gets a list of items that match the provided kind
  public async getByKind<T> (kind: Kind): Promise<T[]> {
    const { data } = await this.api.get<T[]>(`item/kind/${kind}`)
    return data
  }

  // Gets a list of items that match the provided name
  public async getByName (name: string): Promise<Item[]> {
    const { data } = await this.api.get<Item[]>(`item/search?name=${name}`)
    return data
  }

  // Gets a list of items that match the provided kind and name
  public async getByKindAndName<T> (kind: Kind, name: string): Promise<T[]> {
    const { data } = await this.api.get<T[]>(`item/kind/${kind}?name=${name}`)
    return data
  }
}

export default Items
