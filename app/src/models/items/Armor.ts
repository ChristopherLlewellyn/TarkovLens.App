import { BaseItem } from './BaseItem'
import { ArmorProperties } from './_shared'

export class Armor extends BaseItem {
  type: string;
  armor: ArmorProperties;
  blocking: string[];

  constructor(type = '', armor = new ArmorProperties(), blocking: string[] = []) {
    super()
    this.type = type
    this.armor = armor
    this.blocking = blocking
  }
}
