import { BaseItem } from './BaseItem'
import { ArmorProperties, Penalties, StorageGrid } from './_shared'

export class Tacticalrig extends BaseItem {
  armor = new ArmorProperties();
  grids: StorageGrid[] = [];
  penalties = new Penalties();
}
