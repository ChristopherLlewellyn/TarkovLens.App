import { BaseItem } from './BaseItem'
import { ArmorProperties } from './_shared'

export class Armor extends BaseItem {
  type!: string;
  armor!: ArmorProperties;
  blocking!: string[];
}
