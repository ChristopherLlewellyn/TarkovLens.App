import { Item } from './Item'
import { ArmorProperties } from './_shared'

export interface Armor extends Item {
  type: string;
  armor: ArmorProperties;
  blocking: string[];
}
