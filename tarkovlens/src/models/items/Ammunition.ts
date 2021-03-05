import { Item } from './Item'
import { Fragmentation, WeaponModifier } from './_shared'

export interface Ammunition extends Item {
  caliber: string;
  type: string;
  tracer: boolean;
  tracerColor: string;
  subsonic: boolean;
  velocity: number;
  ballisticCoef: number;
  damage: number;
  penetration: number;
  armorDamage: number;
  fragmentation: Fragmentation;
  projectiles: number;
  weaponModifier: WeaponModifier;
}
